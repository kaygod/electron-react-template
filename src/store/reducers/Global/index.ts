import { createSlice } from '@reduxjs/toolkit';
import { fetch,Alert } from 'util/common';

const getKey = ()=>{
  let chia_key;
  try {
     chia_key = localStorage.getItem("chia_key") 
      alert(chia_key)
  } catch (error) {
    chia_key = null;
  }
  if(chia_key){
    return JSON.parse(chia_key)
  }else{
    return chia_key
  }
}

export const counterSlice = createSlice({
  name: 'Global',
  initialState: {
    chia_key:getKey(),
    has_switch:false // 切换过吗
  },
  reducers: {
    updateSwitchFlag(state,action){
       state.has_switch = action.payload;
    },
    updateKey(state,action){
      state.chia_key = action.payload
    },
    noOperate(state) {
      return state;
    },
  },
});
export const {
  updateKey,
} = counterSlice.actions;
export const getter = (state: any) => {
  return state.Global;
};
export const queryUpdateKey = (
  key:any
  ) => async (dispatch: Function, getState: Function) => {
    const response: any = await fetch({
      url: '/switchKey',
      data:{
        ...key
      }
    });
    if(response.result===1){
      dispatch(updateKey(key))
      Alert('切换成功')
      try {
        localStorage.setItem('chia_key',JSON.stringify(key))
      } catch (error) {
        return
      }
    }

  };
// Action creators are generated for each case reducer function
export const { noOperate,updateSwitchFlag } = counterSlice.actions;



export default counterSlice.reducer;
