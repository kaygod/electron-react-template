import { createSlice } from '@reduxjs/toolkit';
import { fetch } from 'util/common';

export const counterSlice = createSlice({
  name: 'Global',
  initialState: {
    navigation: {},
    admin:123
  },
  reducers: {
    //更该标签
    getNav(state, action) {
      state.navigation = action.payload;
    },
    noOperate(state) {
      return state;
    },
  },
});

export const getter = (state: any) => {
  return state.Global;
};

// Action creators are generated for each case reducer function
export const { getNav, noOperate } = counterSlice.actions;



export default counterSlice.reducer;
