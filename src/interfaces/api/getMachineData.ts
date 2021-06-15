import { call,formatExchange } from "util/common";

/**
 * 执行函数
 */
export const handler = async (params:any)=>{
    const {page_no,type} = params
    //the two params must be array
    const data:any = {}
    const result:any = await call(`$list_${page_no}`)//获取列表
    const result2:any = await call(`page_1`) //获取首页头部已批正在p的数量
    data['list'] = formatExchange(result[0],['k_value','file_name','status'])//数据转换
    data['working_tasks'] = eval("("+result2+")")['p_ing']
    data['end_tasks'] = eval("("+result2+")")['p_complete']
    if(type == 1 ){
        // 1为已完成P盘总数除每页数量
        data['total_page'] =Math.ceil(data['end_tasks']/10)
    }else{
        data['total_page'] =Math.ceil(data['p_complete']/10)

    }
    console.log(data)
    return data;
}
