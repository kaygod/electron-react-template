import { call,formatExchange } from "util/common";

/**
 * 执行函数
 */
export const handler = async (params:any)=>{
    const id = params.id
    const data:any = {}
    const result:any = await call(`kill_1`,[id])
    // const list = formatExchange(result[0],['k_value','file_name','status'])
    // const evalRes = eval("("+result+")")
    data['result'] = 1
    return data;
}
