import { createSlice,PayloadAction } from '@reduxjs/toolkit';
import { fetch } from 'util/common';

interface keyItemType {
    farm_key:string,
    pool_key:string,
} 
export const counterSlice = createSlice({
  name: 'SwitchKey',
  initialState: {
    key:{
        farm_key:'',
        pool_key:''
    },
    list:[]
  },
  reducers: {
    updateKey(
        state, 
        action:PayloadAction<{ key_name: keyof keyItemType; value: string }>
        ) {
            const { key_name, value } = action.payload;
        state.key[key_name] = value
      },
    updateKeyList(state,action){
        state.list = action.payload
    }
  },
});

export const {
    updateKeyList,
    updateKey,
} = counterSlice.actions;
export const getter = (state: any) => {
  return state.SwitchKey;
};
export const queryAsync = (
  ) => async (dispatch: Function, getState: Function) => {
    const response: any = await fetch({
      url: '/getKey',
    });
        dispatch(updateKeyList(response))
  };
// Action creators are generated for each case reducer function



export default counterSlice.reducer;
