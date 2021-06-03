import { createSlice } from '@reduxjs/toolkit';
import { fetch } from 'util/common';

enum stautsTyep {
  initial = 1,
  working = 2,
  stop = 3,
  completed = 4
} 


type defaultType = {
  status:stautsTyep
}


export const counterSlice = createSlice({
  name: 'HdList',
  initialState: {
     status:1
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
