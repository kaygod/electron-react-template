import { call,formatExchange } from "util/common";

/**
 * 执行函数
 */
export const handler = async (params:any)=>{
    const data:any = {}
    //the two params must be array
    const result:any = await call(`page_1`)
    const result1:any = await call(`list_1`)
    const evalRes = eval("("+result+")")
    const list = formatExchange(result1[0],['k_value','file_name','status'])
    if(evalRes.p_ing>0){
        data['status'] = 2
    }
    if(list.length>0){
        data['k_type'] = list['k_value'].substring(1)
    }else{
        data['k_type'] = ''
    }
        localStorage.setItem('Ping_key', data['k_type'])
    return data;
}
