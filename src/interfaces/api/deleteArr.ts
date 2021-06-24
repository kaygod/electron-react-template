import { call,formatExchange } from "util/common";

/**
 * 执行函数
 */
export const handler = async (params:any)=>{
    const ArrIds = params.ArrIds
    const data:any = {}
    const resultArr:any = [] 
    const callArr:any= ArrIds.map(async (ele:string,index:string) => {
        // 根据传的id数量生产数组[Promise,promise]
        const result:any = await call(`kill_1`,[ele])
        const evalRes = eval("("+result+")") 
        return evalRes
    });
    // 等所有的promise执行完后才判断是否有成功删除的，有则成功result = 1，所以不成功result = 0
    return Promise.all(callArr).then(res=>{
        const suc = res.some((val:any)=>{
            return val.result==1
        })
        if(suc){
            data['result'] = 1
        }else{
            data['result'] = 0
        }
    return data;
    })  
    // const list = formatExchange(result[0],['k_value','file_name','status'])
}
