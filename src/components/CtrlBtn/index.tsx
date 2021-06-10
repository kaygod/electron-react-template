import React from 'react';
import style from './index.scss';
import { useSelector, useDispatch } from 'react-redux'
import { getter,statusType,startWorkAsync,getMachineDataAsync,switchMachineAsync,stopAsync,updateStatus } from "store/reducers/Home";
import  { getter as globalGetter } from "store/reducers/Global";
import { KEY_IS_REQUIRED } from "util/constants";
import { Alert } from "util/common";
import { useLoop } from "HOC/Loop";

type defaultProps = {
  bgStart?: string
  bgEnd?: string;
};


const ctrlBtn = (props: defaultProps) => {

  const { status } = useSelector(getter);

  const {
    bgStart ='#02d7db',
    bgEnd = '#ff614a'
  } = props;

  const bgStartStyle = {
    backgroundColor:bgStart,
    borderWidth:'1px',
    borderColor:bgStart,
    borderStyle:'solid'
  };

  const bgStartEnd = {
    backgroundColor:bgEnd,
    borderWidth:'1px',
    borderColor:bgEnd,
    borderStyle:'solid'
  };

  const { startWork,switchMachine,stop } = useMethods();


  return (
    <div className={style.flexLeft}>

        {
          status == statusType.completed || status === statusType.initial || status === statusType.stop?
          <div className={style.btn+' '+style.flexCenter} onClick={startWork} style={bgStartStyle}>开始P盘</div>
          :null
        }
        {
          status === statusType.working?(
            <>
            <div className={style.btn+' '+style.flexCenter} onClick={switchMachine} style={bgStartStyle}>切换P盘</div>
            <div className={style.btn+' '+style.flexCenter} style={bgStartEnd}  onClick={stop}>全部停止</div>
            </>   
          ):null
        }
    </div>
  );
};

const useMethods = ()=>{

  const dispatch = useDispatch();

  const state = useSelector(getter);

  const global_state = useSelector(globalGetter);

  const toggleLoop = useLoop(()=>{
      dispatch(getMachineDataAsync());
  },state.status === statusType.working);


     /**
   * 开始P盘.对应几种情况
   *
   * 1.程序初始启动调用
   * 2.全部停止后的调用
   * 3.全部完成后的调用.p盘完成后有两种情况,第一种是当前规格已经没有空间再p了,后端返回错误码725.当前 规格还有空间可以p,那就继续p.
   */
  const startWork = async ()=>{
  
    const status =  state.status;

    const is_login = global_state.chia_key == null ?false:true; // 是否登录

    // 对应情况1 和 情况 2 还有 情况 3
    if(status === statusType.initial || status === statusType.stop || status === statusType.completed){ 
         if(!is_login){ // 没有登录
           Alert(KEY_IS_REQUIRED);
           return;
         }
         //dispatch(updateStatus(statusType.working))
         // 开始P盘
         try {  
          await dispatch(startWorkAsync());
          if(status === statusType.stop || status === statusType.initial){
            toggleLoop(true);//开启定时器
          }else{

          }
          // dispatch(getMachineDataAsync()); // 获取P盘数据
         } catch (error) {
            console.log(error);
         }     
    }
  }

  /**
  * 切换P盘
  */
  const switchMachine = async ()=>{
    try {
      await dispatch(switchMachineAsync()); // 切换P盘
      dispatch(getMachineDataAsync()); // 获取P盘数据   
    } catch (error) {
      console.log(error);
    }
  }

  /**
  * 全部停止
  */
  const stop = async ()=>{
    try {
      await dispatch(stopAsync()); // 全部停止
      console.log(state.status)     
      toggleLoop(false);//关掉定时器
      dispatch(getMachineDataAsync()); // 获取P盘数据    
      console.log(state.status)     
    } catch (error) {
      console.log(error);
    }
  }


  return {
    startWork,
    switchMachine,
    stop
  }

}




export default ctrlBtn;
