import {useEffect,useState,useRef} from "react";

/**
 * 启用延时调用函数
 */
export const useLoop = (fn:Function)=>{

  const [enable,setEnable] = useState(false); // 当前正在进行定时访问吗 

  const delay = 5000;

  const timer = useRef<NodeJS.Timeout | null>(null); //全局存储一个定时器

  const toggle = (flag:boolean)=>{
    if(flag === true && !enable){ // 开启
      fn();
      timer.current = setInterval(()=>{
        fn();
      },delay)
      setEnable(true);
    }else if(flag === false){ // 关闭定时器
      timer.current && clearTimeout(timer.current);
      timer.current = null;
      setEnable(false);
    }
  }

  useEffect(()=>{
    toggle(true); // 开启定时器
    return ()=>{
      toggle(false);
    }
  },[])

  return toggle;

}