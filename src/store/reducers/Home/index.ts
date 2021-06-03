import { createSlice } from '@reduxjs/toolkit';
import { fetch } from 'util/common';

export const counterSlice = createSlice({
  name: 'HdList',
  initialState: {
    
  },
  reducers: {
    noOperate(state) {
      return state;
    },
  },
});

export const getter = (state: any) => {
  return state.HdList;
};

// Action creators are generated for each case reducer function
export const {  noOperate } = counterSlice.actions;



export default counterSlice.reducer;
