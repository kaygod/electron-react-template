import { call,formatExchange } from "util/common";

/**
 * 执行函数
 */
export const handler = async (params:any)=>{
    const ArrIds = params.ArrIds
    const data:any = {}
    const resultArr:any = [] 
    const callArr:any = []
    const callBack = (async (ele:string,index:string)=>{
        const result:any = await call(`list_2`,[index])
        const evalRes = eval("("+result+")")
        resultArr.push(evalRes)
    })
    ArrIds.forEach((ele:string,index:string) => {
        callArr.push(callBack(ele,index))
    });
    console.log(callArr)
    const suc = resultArr.some((val:any)=>{
        console.log(2)
        return val.result==1
    })
    if(suc){
        console.log(3)
        data['result'] = 1
    }
    console.log(resultArr)
    // const list = formatExchange(result[0],['k_value','file_name','status'])
    return data;
}
