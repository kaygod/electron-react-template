import {tmpdir} from 'os';
import {watchFile, unwatchFile, unlinkSync, createReadStream, createWriteStream},fs from 'fs';
import {normalize, join, dirname} from 'path';
import {createHash} from 'crypto';
import child from 'child_process';


function promisify(fn) {
    return function() {
        return new Promise((resolve, reject) => {
            fn(...arguments, function () {
                if (arguments[0] instanceof Error) {
                    reject(arguments[0]);
                } else {
                    resolve(...Array.prototype.slice.call(arguments, 1));
                }
            });
        });
    };
}

async function exec(cmd, options={}) {
    return new Promise((resolve, reject) => {
        child.exec(cmd, options, (err, stdout, stderr) => {
            if (err) { return reject(err); }
            return resolve({stdout, stderr});
        });
    });
}

function spawn(cmd, args, options={}) {
    let cp = child.spawn(cmd, args, {...options, shell: true});
    cp.output = { stdout: new Buffer(0), stderr: new Buffer(0) };
    cp.stdout.on('data', (data) => {
        cp.output.stdout = concat(data, cp.output.stdout);
    });
    cp.stderr.on('data', (data) => {
        cp.output.stderr = concat(data, cp.output.stderr);
    });
    return cp;
}

function concat(source, target) {
    if (!(source instanceof Buffer)) {
        source = new Buffer(source, 'utf8');
    }
    if (!target instanceof Buffer) {
        target = new Buffer(0);
    }
    return Buffer.concat([target, source]);
}

async function stat(target) {
    let _stat = promisify(fs.stat);
    try {
        let fileStat = await _stat(target);
        return fileStat;
    } catch (err) {
        return null;
    }
}

let open = promisify(fs.open),
    mkdir = promisify(fs.mkdir),
    readFile = promisify(fs.readFile),
    writeFile = promisify(fs.writeFile);


let {platform, env} = process;

class Sudoer {

    constructor(options) {
        this.platform = platform;
        this.options = options;
        this.cp = null;
        this.tmpdir = tmpdir();
    }

    hash(buffer) {
        let hash = createHash('sha256');
        hash.update('electron-sudo');
        hash.update(this.options.name || '');
        hash.update(buffer || new Buffer(0));
        return hash.digest('hex').
            slice(-32);
    }

    joinEnv(options) {
        let {env} = options,
            spreaded = [];
        if (env && typeof env == 'object') {
            for (let key in env) {
                spreaded.push(key.concat('=', env[key]));
            }
        }
        return spreaded;
    }

    escapeDoubleQuotes(string) {
        return string.replace(/"/g, '\\"');
    }

    encloseDoubleQuotes(string) {
        return string.replace(/(.+)/g, '"$1"');
    }

    kill(pid) {
        if (!pid) {
            return;
        } else {
            return;
        }
    }
}


class SudoerUnix extends Sudoer {

  constructor(options = {}) {
      super(options);
      if (!this.options.name) {
          this.options.name = 'Electron';
      }
  }

  async copy(source, target) {
      return new Promise(async (resolve, reject) => {
          source = this.escapeDoubleQuotes(normalize(source));
          target = this.escapeDoubleQuotes(normalize(target));
          try {
              let result = await exec(
                  `/bin/cp -R -p "${source}" "${target}"`);
              resolve(result);
          } catch (err) {
              reject(err);
          }
      });
  }

  async remove(target) {
      let self = this;
      return new Promise(async (resolve, reject) => {
          if (!target.startsWith(self.tmpdir)) {
              throw new Error(`Try to remove suspicious target: ${target}.`);
          }
          target = this.escapeDoubleQuotes(normalize(target));
          try {
              let result = await exec(`rm -rf "${target}"`);
              resolve(result);
          } catch (err) {
              reject(err);
          }
      });
  }

  async reset() {
      await exec('/usr/bin/sudo -k');
  }
}



class SudoerLinux extends SudoerUnix {

  constructor(options = {}) {
      super(options);
      this.binary = null;
      // We prefer gksudo over pkexec since it gives a nicer prompt:
      this.paths = [
          '/usr/bin/gksudo',
          '/usr/bin/pkexec',
          './bin/gksudo',
      ];
  }

  async getBinary() {
      return (await Promise.all(
          this.paths.map(async (path) => {
              try {
                  let result = await stat(path);
                  if (result) {
                      return path;
                  } else {
                      return null;
                  }
              } catch (err) {
                  return null;
              }
          }),
      )).filter((v) => v)[0];
  }

  async exec(command, options = {}) {
      return new Promise(async (resolve, reject) => {
          let self = this,
              result;
          /* Detect utility for sudo mode */
          if (!self.binary) {
              self.binary = await self.getBinary();
          }
          if (!options.env) {
              options.env = process.env;
          }
          if (options.env instanceof Object && !options.env.DISPLAY) {
              // Force DISPLAY variable with default value which is required for UI dialog
              options.env = Object.assign(options.env, {DISPLAY: ':0'});
          }
          let flags;
          if (/gksudo/i.test(self.binary)) {
              flags = '--preserve-env --sudo-mode ' +
                  `--description="${self.escapeDoubleQuotes(
                      self.options.name)}"`;
          } else if (/pkexec/i.test(self.binary)) {
              flags = '--disable-internal-agent';
          }
          command = `${this.binary} ${flags} ${command}`;
          try {
              result = await exec(command, options);
              return resolve(result);
          } catch (err) {
              return reject(err);
          }
      });
  }

  async spawn(command, args, options = {}) {
      let self = this;
      return new Promise(async (resolve, reject) => {
          /* Detect utility for sudo mode */
          if (!self.binary) {
              self.binary = await self.getBinary();
          }
          if (!options.env) {
              options.env = process.env;
          }
          if (options.env instanceof Object && !options.env.DISPLAY) {
              // Force DISPLAY variable with default value which is required for UI dialog
              options.env = Object.assign(options.env, {DISPLAY: ':0'});
          }
          // In order to guarantee succees execution we'll use execFile
          // due to fallback binary bundled in package
          let sudoArgs = [];
          if (/gksudo/i.test(self.binary)) {
              sudoArgs.push('--preserve-env');
              sudoArgs.push('--sudo-mode');
              sudoArgs.push(`--description="${self.escapeDoubleQuotes(
                  self.options.name)}"`);
              sudoArgs.push('--sudo-mode');
          } else if (/pkexec/i.test(self.binary)) {
              sudoArgs.push('--disable-internal-agent');
          }
          sudoArgs.push(command);
          sudoArgs.push(args);
          try {
              let cp = spawn(self.binary, sudoArgs, options);
              return resolve(cp);
          } catch (err) {
              return reject(err);
          }
      });
  }
}


export {
  Sudoer:SudoerLinux
}
