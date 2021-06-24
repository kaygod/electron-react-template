import { call,formatExchange } from "util/common";

/**
 * 执行函数
 */
export const handler = async (params:any)=>{
    const {page_no,type} = params
    //the two params must be array
    const data:any = {}
    const result:any = await call(`list_${type}`, [page_no])//获取列表
    const result2:any = await call(`page_1`) //获取首页头部已批正在p的数量
    const evalRes = eval("("+result2+")")
    data['list'] = formatExchange(result[0],['k_value','file_name','status','id'])//数据转换
    data['working_tasks'] = evalRes['p_ing']
    data['end_tasks'] = evalRes['p_complete']
    data['page_no'] = page_no
    /**
     * 根据list_1，正在P的列表获取P盘状态以及在这P什么类型的盘
     */
    if(type ==  1){
        // 1为正在P盘总数除每页数量
        data['total_page'] =Math.ceil(data['working_tasks']/10)
        if(!data['list'].length){
            data['is_complete'] = true
        }else{
            data['is_complete'] = false
        }
        // 调用的脚本是正在P的脚本不用再次调用根据正在P的数量判断是否有在这P盘
        if(data['list'].length>0){
            data['status'] = 2
            data['k_type'] = data['list'][0]['k_value'].substring(1)
        }else{
            data['status'] = 1
            data['k_type'] = null
        }
        localStorage.setItem('Ping_key', data['k_type'])
    }else{
        data['total_page'] =Math.ceil(data['end_tasks']/10)
        // 如果是完成页再调用正在P的列表
        const Ping_result:any = await call(`list_1`)//获取列表
        const Ping_list = formatExchange(Ping_result[0],['k_value','file_name','status'])//数据转换
    if(Ping_list.length>0){
            data['status'] = 2
            data['k_type'] = Ping_list[0]['k_value'].substring(1)
        }else{
            data['status'] = 1
            data['k_type'] = null
        }
        localStorage.setItem('Ping_key', data['k_type'])
    }
    return data;
}
