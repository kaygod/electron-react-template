import { call,formatExchange } from "util/common";

/**
 * 执行函数 
 * 
 * 
 * 200 P盘已满
 * 102 参数缺失
 * 101 参数错误
 */

export const handler = async (params:any)=>{
    console.log(123)
    const data:any = {}
    const k_type = params.k_type
    try{
        const chia_key = JSON.parse(localStorage.getItem('chia_key')||'{"farmer_keys":"","pool_keys":""}')
        console.log([`k${k_type}`,chia_key.farmer_keys,chia_key.pool_keys])
        const result:any = await call(`start`,[`k${k_type}`,chia_key.farmer_keys,chia_key.pool_keys])
        console.log(result)
        const result_obj = eval("("+result+")")
        console.log(result_obj)
        if(result.length>0){
            console.log('报错')
            data['result'] = result_obj.error_no
        }else{
            console.log('正常')
            data['result'] = 1
        }
    }catch{
        console.log('错了')
        data['result'] = 101
    }
    console.log(data)
    return data;
}
