import { call,formatExchange } from "util/common";

/**
 * 执行函数
 */
export const handler = async (params:any)=>{
    const data:any = {}
    //the two params must be array
    const result:any = await call(`list_1`)
    const list = formatExchange(result[0],['k_value','file_name','status'])
    if(list.length>0){
        data['status'] = 2
        data['k_type'] = list['k_value'].substring(1)
    }else{
        data['status'] = 1
        data['k_type'] = null
    }
        localStorage.setItem('Ping_key', data['k_type'])
    return data;
}
