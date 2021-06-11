
// @ts-nocheck
const load = require.context("./api/",false,/\.ts$/);
const map:any = {}
const ob = load.keys().filter((item)=>{
  return item.startsWith(".");
});
for (const key of ob) {
  map[keyResolve(key)] = load(key);
}

// key的格式为 ./sasa.dsds.ts
function keyResolve(key){
  //如果路径以.开头删掉
  if(key.startsWith(".")){
     key = key.slice(1);
  }
  const index = key.indexOf(".ts");
  if(index != -1){
    key = key.slice(0,index)
  }
  return key.replace(".","/");
}

export default map;
