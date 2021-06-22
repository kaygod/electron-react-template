import { createSlice,PayloadAction } from '@reduxjs/toolkit';
import { fetch } from 'util/common';

interface keyItemType {
    farmer_keys:string,
    pool_keys:string,
} 
export const counterSlice = createSlice({
  name: 'SwitchKey',
  initialState: {
    key:{
        farmer_keys:'',
        pool_keys:''
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
    console.log(response)
    dispatch(updateKeyList(response))
  };
// Action creators are generated for each case reducer function



export default counterSlice.reducer;
