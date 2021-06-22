import { call } from "util/common";

/**
 * 执行函数
 */
 const getData = async()=>{
    const result:any = await call(`keys`)//获取密钥列表
    const evalRes = eval("("+result+")")
    return evalRes
}
let num = 0
export const handler = async (params:any)=>{
    //the two params must be array
    const data:any = []
    let evalRes:any = await getData()
    if(evalRes.farmer_keys==''&&num==0){
        num++
        evalRes = handler({})
        return
    }else{
        data.push(evalRes)
    }   
    return data;
}

