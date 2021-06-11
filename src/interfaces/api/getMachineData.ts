import { call } from "util/common";

/**
 * 执行函数
 */
export const handler = async (params:any)=>{
    const result = await call("list_1",[1]);
    return result;
}
