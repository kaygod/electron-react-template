import map from "./import";

// 调用接口函数
export const callScript = (params:any)=>{
  const { url,data } = params;
  return new Promise(async (resolve,reject)=>{
    if(map[url]){
      const callback = map[url].handler;
      try {
        const result = await callback(data);
        resolve(result);
      } catch (error) {
        reject(error);
      }
    }else{
      reject(null);
    }
  })
}
