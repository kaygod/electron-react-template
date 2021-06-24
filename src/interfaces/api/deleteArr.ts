import { call,formatExchange } from "util/common";

/**
 * 执行函数
 */
export const handler = async (params:any)=>{
    const ArrIds = params.ArrIds
    const data:any = {}
    const resultArr:any = [] 
    const callArr:any= ArrIds.map(async (ele:string,index:string) => {
        const result:any = await call(`kill_1`,[ele])
        const evalRes = eval("("+result+")") 
        return evalRes
    });
    return Promise.all(callArr).then(res=>{
        const suc = res.some((val:any)=>{
            return val.result==1
        })
        if(suc){
            data['result'] = 1
        }
    return data;
    })  
    // const list = formatExchange(result[0],['k_value','file_name','status'])
}
