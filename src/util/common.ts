const path = require("path");
const exec = require("child_process").exec;

export const call = (name:string)=>{

    const script_path = path.join(__dirname, "scripts", `${name}.sh`); 
    
    exec(`/bin/bash ${script_path}`, (error:any, stdout:any) => {
       if(error){
         console.log(error);
       }else{
         console.log(`stdout: ${stdout}`);
       }
    });

}