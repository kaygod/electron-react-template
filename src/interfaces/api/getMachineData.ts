import { call } from "util/common";

/**
 * 执行函数
 */
export const handler = async (params:any)=>{
    //the two params must be array
    const result = await call("list_1");
    return result;
}
