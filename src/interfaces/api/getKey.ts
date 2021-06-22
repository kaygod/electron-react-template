import { call } from "util/common";

/**
 * 执行函数
 */
export const handler = async (params:any)=>{
    //the two params must be array
    const data:any = []
    let result:any = await call(`keys`)//获取密钥列表
    let evalRes = eval("("+result+")")
    if(evalRes.farmer_keys==''){
        result = await call(`keys`)
        evalRes = eval("("+result+")")
    }
    if(evalRes.farmer_keys!=''){
        data.push(evalRes)
    }
    return data;
}
