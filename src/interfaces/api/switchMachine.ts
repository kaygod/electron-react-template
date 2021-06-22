import { call,formatExchange } from "util/common";

/**
 * 执行函数
 */
export const handler = async (params:any)=>{
    const k_type = params.k_type
    const data:any = {}
    const result_stop:any = await call(`stop`)
    // const list = formatExchange(result[0],['k_value','file_name','status'])
    try{
        const chia_key = JSON.parse(localStorage.getItem('chia_key')||'{"farmer_keys":"","pool_keys":""}')
        const result:any = await call(`start`,[`k${k_type}`,chia_key.farmer_keys,chia_key.pool_keys])
        console.log(result)
        const result_obj = eval("("+result+")")
        console.log(result_obj)
        if(result_obj){
            data['result'] = result_obj.error_no
        }else{
            data['result'] = 1
        }
    }catch{
        data['result'] = 101
    }
    return data;
}