import { call } from "util/common";

/**
 * 执行函数
 */
export const handler = async (params:any)=>{
    //the two params must be array
    const data:any = []
    const result:any = await call(`keys`)//获取密钥列表
    const evalRes = eval("("+result+")")
    console.log(result)
    data.push(evalRes)
    console.log(data)
    return data;
}
