import { createSlice } from '@reduxjs/toolkit';
import { Alert, fetch } from 'util/common';
import { DRAW_IS_REQUIRE } from "util/constants";

export enum statusType {
  initial = 1,  // 没开始p 停止状态
  working = 2, // 正在p盘过程中
}

interface listItem {
  k_value:string; // k的大小
  file_name:string; // 文件名
  status:string;   // 状态
}


interface defaultType {
  status:statusType,
  k_type:string|number | null, // 绘图大小对应的类型
  list:listItem[], // 表格数据
  page_no:number,
  total_page:number,
  end_tasks:string, // 已完成p盘数
  working_tasks:string, // 正在进行p盘数
  type:string,
  firstIn:boolean
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
     working_tasks:"0",
     type:'1',
     firstIn:false
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
    },
    updatePage(state,action){
      state.page_no = action.payload;
    },
    updateType(state,action){
      state.page_no = 1
      state.type = action.payload
    },
    updateFirstin(state,actions){
      state.firstIn = actions.payload
    }
  },
});

export const getter = (state: any) => {
  return state.Home;
};

// Action creators are generated for each case reducer function
export const {  noOperate,updateStatus,updateState,updateKType,updatePage,updateType,updateFirstin } = counterSlice.actions;


/**
 * 获取p盘状态
 */
// export const getStatusAsync = () => async (dispatch: Function, getState: Function) => {
//    const response = await fetch({
//      url:"/getStatus",
//      data:{}
//    })
//    dispatch(updateStatus(response.status));
//    dispatch(updateKType(response.k_type));
// };


/**
 *  开始p盘
 */
 export const startWorkAsync = () => (dispatch: Function, getState: Function) => {
  const { k_type,type } = getter(getState());
  if(k_type == null){
    alert(DRAW_IS_REQUIRE);
    return Promise.reject(null);
  }
  return fetch({
      url:"/startWork",
      data:{
        k_type,
      }
    }).then((res)=>{
      // * 200 P盘已满
      // * 102 参数缺失
      // * 101 参数错误
      if(res.result==200){
        Alert('没有足够的空间P盘')
        return
      }else if(res.result==102||res.result==101){
        Alert('参数错误，请与管理员联系')
        return
      }else{
        Alert('已开始P盘')
      }
      localStorage.setItem('Ping_key',k_type)
      dispatch(updateStatus(statusType.working));
      dispatch(updateType('1'))
      dispatch(getMachineDataAsync(1))
    })
};


/**
 *  获取P盘数据
 */
 export const getMachineDataAsync = (page:number | undefined = undefined) => async (dispatch: Function, getState: Function) => {
  const { page_no,type,firstIn } = getter(getState());
  const response = await fetch({
    url:"/getMachineData",
    data:{
      page_no:page != null ? page:page_no,
      type
    }
  })

  const { is_complete } = response;
  //说明已经p完了
  if(is_complete){
    dispatch(stopAsync())
  }
  const now_page = page?page:page_no
  response.list.map((item: any, index: number) => {
    const new_item = Object.assign(item,{code:''})
    let code: string | number = index + 1;
    code = now_page ? (now_page - 1) * 10 + Number(code) : code
    if (code < 10) {
      code = '0' + code;
    }
    new_item['code'] = code;
    return new_item
  });
  //更新后端数据
  dispatch(updateState(response));
  dispatch(updateStatus(response.status));
  if(!firstIn){
  dispatch(updateKType(response.k_type));
    dispatch(updateFirstin(true))
  }
  if(page != null){
   dispatch(updatePage(page));
  }
};

/**
 *  切换p盘
 */
 export const switchMachineAsync = () => (dispatch: Function, getState: Function) => {
  const { k_type } = getter(getState());
  if(k_type == null){
    alert(DRAW_IS_REQUIRE);
    return;
  }
  return fetch({
      url:"/switchMachine",
      data:{
        k_type
      }
    }).then(()=>{
      localStorage.setItem('Ping_key',k_type)
      dispatch(noOperate());
  })
};

/**
 *  全部停止
 */
 export const stopAsync = () => (dispatch: Function, getState: Function) => {
   return fetch({
      url:"/stop",
      data:{}
    }).then(()=>{
      dispatch(updateStatus(statusType.initial));
      dispatch(updateKType(null))
      localStorage.removeItem('Ping_key')
    })
};
/**
 * 删除数据
 */
 export const deleteAsync = (id:string|number) => (dispatch: Function, getState: Function) => {
  return fetch({
     url:"/delete",
     data:{
       id
     }
   }).then(()=>{
     Alert('删除成功')
     dispatch(getMachineDataAsync());
   })
};
export const deletebatchAsync = (ArrIds:any) => async(dispatch: Function, getState: Function) => {
  const response = await fetch({
     url:"/deleteArr",
     data:{
      ArrIds
     }
   })
   console.log(response)
   if(response.result==1){
     Alert('删除成功')
   }
};

export default counterSlice.reducer;
