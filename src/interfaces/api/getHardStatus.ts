import { call,formatExchange } from "util/common";

/**
 * 执行函数
 */
export const handler = async (params:any)=>{
    const {page_no} = params
    //the two params must be array
    const data:any = {}
    const result:any = await call(`list_3`, [page_no])//获取列表
    const result2:any = await call(`page_2`) // 硬件使用率
    const evalRes = eval("("+result2+")")
    data['list'] = formatExchange(result[0],['hard_disk','draw_num','draw_capacity'])//数据转换
    data['list'] =  data['list'].map((val:any)=>{
        if(val.hard_disk[0]=='/'){
            val.hard_disk = val.hard_disk.substring(1)
            return val
        }
    })
    data['cpu_rate'] = evalRes.cpu_use
    data['memory_rate'] = evalRes.mem_use
    data['page_no'] = page_no
    data['total_page'] = Math.ceil(evalRes['dir_total']/15)
    return data;
}
