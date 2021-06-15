import { call,formatExchange } from "util/common";

/**
 * 执行函数
 */
export const handler = async (params:any)=>{
    //the two params must be array
    const result:any = await call("list_2");
    const result2:any = await call("page_1")
    console.log(result2)
    console.log(formatExchange(result[0],['k_value','file_name','status','code']))
    return result;
}
