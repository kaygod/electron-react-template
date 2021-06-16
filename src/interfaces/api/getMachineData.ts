import { call,formatExchange } from "util/common";

/**
 * 执行函数
 */
export const handler = async (params:any)=>{
    const {page_no,type} = params
    console.log(page_no,type)
    //the two params must be array
    const data:any = {}
    const result:any = await call(`list_${type}`, [page_no])//获取列表
    const result2:any = await call(`page_1`) //获取首页头部已批正在p的数量
    const evalRes = eval("("+result2+")")
    data['list'] = formatExchange(result[0],['k_value','file_name','status'])//数据转换
    data['working_tasks'] = evalRes['p_ing']
    data['end_tasks'] = evalRes['p_complete']
    data['page_no'] = page_no
    if(type ==  1){
        // 1为正在P盘总数除每页数量
        data['total_page'] =Math.ceil(data['working_tasks']/10)
        if(!data['list'].length){
            data['is_complete'] = true
        }else{
            data['is_complete'] = false
        }
    }else{
        data['total_page'] =Math.ceil(data['end_tasks']/10)
    }
    console.log(data)
    return data;
}
