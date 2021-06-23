import { call,formatExchange } from "util/common";

/**
 * 执行函数
 */
export const handler = async (params:any)=>{
    const ArrIds = params.ArrIds
    const data:any = {}
    const resultArr:any = []
    ArrIds.forEach(async (ele:string) => {
        const result:any = await call(`kill_1`,[ele])
        const evalRes = eval("("+result+")")
        resultArr.push(evalRes)
    });
    const suc = resultArr.some((val:any)=>{
        return val.result==1
    })
    if(suc){
        data['result'] = 1
    }
    // const list = formatExchange(result[0],['k_value','file_name','status'])
    return data;
}
