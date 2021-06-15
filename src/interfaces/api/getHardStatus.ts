import { call,formatExchange } from "util/common";

/**
 * 执行函数
 */
export const handler = async (params:any)=>{
    const {page_no} = params
    //the two params must be array
    const data:any = {}
    const result:any = await call(`list_3`, [page_no])//获取列表
    const result2:any = await call(`page_2`) //获取首页头部已批正在p的数量
    const evalRes = eval("("+result2+")")
    console.log(result)
    console.log(evalRes)
    data['list'] = formatExchange(result[0],['hard_disk','draw_num','draw_capacity'])//数据转换
    // data['cpu_rate'] = 
    // data['memory_rate'] = 
    // data['page_no'] = page_no
    // data['total_page']
    return data;
}
