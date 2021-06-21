import { call,formatExchange } from "util/common";

/**
 * 执行函数
 */
export const handler = async (params:any)=>{
    const data:any = {}
    console.log(params.k_type)
    console.log(localStorage.getItem('chia_key'))
    // const result:any = await call(`start ${}`)
    // const list = formatExchange(result[0],['k_value','file_name','status'])
    data['result'] = 1
    return data;
}
