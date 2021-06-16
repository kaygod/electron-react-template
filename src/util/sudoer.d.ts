declare class Sudoer
{
  constructor(params:{name:string})
  exec: (payload:string)=> {stdout:string,stderr:string}
}


export = Sudoer;
