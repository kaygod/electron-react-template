import { createSlice } from '@reduxjs/toolkit';
import { fetch } from 'util/common';
import { DRAW_IS_REQUIRE } from "util/constants";

export enum statusType {
  initial = 1,  // 输了公钥但还没开始p
  working = 2, // 正在p盘过程中
  stop = 3,    // 点击全部停止后的状态
  completed = 4 // p盘完成了
} 

interface listItem {
  k_value:string; // k的大小
  file_name:string; // 文件名
  status:string;   // 状态
}


interface defaultType {
  status:statusType,
  k_type:number | null, // 绘图大小对应的类型
  list:listItem[], // 表格数据
  page_no:number, 
  total_page:number,
  end_tasks:string, // 已完成p盘数
  working_tasks:string // 正在进行p盘数
}


export const counterSlice = createSlice({
  name: 'Home',
  initialState: {
     status:statusType.initial,
     k_type:null,
     list:[],
     page_no:1,
     total_page:1,
     end_tasks:"0",
     working_tasks:"0"
  } as defaultType,
  reducers: {
    // 更新k值
    updateKType(state,action){
        const k_type= action.payload;
        state.k_type = k_type;
    },
    // 更新状态
    updateStatus(state,action){
      const status= action.payload;
      state.status = status;
    },
    noOperate(state) {
      return state;
    },
    // 更新状态
    updateState(state,action){
        const { end_tasks,working_tasks,total_page,list } = action.payload;
        if(state.page_no == 1){
           state.total_page = total_page;
        }
        state.end_tasks = end_tasks;
        state.working_tasks= working_tasks;
        state.list = list;
    }
  },
});

export const getter = (state: any) => {
  return state.Home;
};

// Action creators are generated for each case reducer function
export const {  noOperate,updateStatus,updateState,updateKType } = counterSlice.actions;


/**
 * 获取p盘状态
 */
export const getStatusAsync = () => async (dispatch: Function, getState: Function) => {
   const response = await fetch({
     url:"/getStatus",
     data:{}
   })
   dispatch(updateStatus(response.status));
};


/**
 *  开始p盘
 */
 export const startWorkAsync = () => async (dispatch: Function, getState: Function) => {
  const { k_type } = getter(getState());
  if(k_type == null){
    alert(DRAW_IS_REQUIRE);
    return;
  }
  try {
    await fetch({
      url:"/startWork",
      data:{
        k_type
      }
    })
    dispatch(updateStatus(statusType.working)); 
  } catch (error) {
     console.log(error);
  }
};


/**
 *  获取P盘数据
 */
 export const getMachineDataAsync = () => async (dispatch: Function, getState: Function) => {
  const { page_no } = getter(getState());
  const response = await fetch({
    url:"/getMachineData",
    data:{
      page_no
    }
  })
  const { is_complete } = response;
  //说明已经p完了
  if(is_complete){
    dispatch(updateStatus(statusType.completed));
  }
  //更新后端数据
  dispatch(updateState(response));
};

/**
 *  切换p盘
 */
 export const switchMachineAsync = () => async (dispatch: Function, getState: Function) => {
  const { k_type } = getter(getState());
  if(k_type == null){
    alert(DRAW_IS_REQUIRE);
    return;
  }
  try {
    await fetch({
      url:"/switchMachine",
      data:{
        k_type
      }
    })
    dispatch(noOperate());
  } catch (error) {
     console.log(error);
  }
};

/**
 *  全部停止
 */
 export const stopAsync = () => async (dispatch: Function, getState: Function) => {
  try {
    await fetch({
      url:"/stop",
      data:{}
    })
    dispatch(updateStatus(statusType.stop));
  } catch (error) {
     console.log(error);
  }
};


export default counterSlice.reducer;
