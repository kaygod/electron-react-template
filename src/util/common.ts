const path = require("path");
const exec = require("child_process").exec;

export const call = (name:string)=>{

    const script_path = path.join(__dirname, "scripts", `${name}.sh`); 
    
    return new Promise((resolve,reject)=>{
        exec(`/bin/bash ${script_path}`, (error:any, stdout:any) => {
            if(error){
              console.log(error);
              reject(error);
            }else{
                const array:[string,string][] = [];
                stdout.split("\r\n").forEach((item:string)=>{
                    const [key,value] =  item.split(":");
                    array.push([key,value])

                })
                resolve(array);
            }
         });
    })
}