import { call,formatExchange } from "util/common";

/**
 * 执行函数
 */
export const handler = async (params:any)=>{
    // const data:any = {}
    // const result:any = await call(`list_1`)
    // const list = formatExchange(result[0],['k_value','file_name','status'])
    // const result:any = await call(`stop`)
    // const evalRes = eval("("+result+")")
    const evalRes:any = {}
    evalRes['result'] = 1
    return evalRes;
}
