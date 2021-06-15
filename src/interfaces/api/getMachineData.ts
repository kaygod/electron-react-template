import { call,formatExchange } from "util/common";

/**
 * 执行函数
 */
export const handler = async (params:any)=>{
    console.log('params',params)
    //the two params must be array
    const data:any = {}
    const result:any = await call("list_2")
    const result2:any = await call("page_1")
    // "{'p_complete':'173','p_ing':'0'}"
    data['list'] = formatExchange(result[0],['k_value','file_name','status','code'])
    data['working_tasks'] = eval("("+result2+")")['p_ing']
    data['end_tasks'] = eval("("+result2+")")['p_complete']
    console.log(data)
    return data;
}
