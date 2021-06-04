import { createSlice } from '@reduxjs/toolkit';
import { fetch } from 'util/common';

interface tableItemType {
    hard_disk:string,
    draw_num:string,
    draw_capacity:string
} 
interface tableDataType {
    cpu_rate:string,
    memory_rate:string,
    page_no:number,
    total_page: number,
    list:tableItemType
} 
export interface dataType {
    table_data: tableDataType;
}


export const counterSlice = createSlice({
  name: 'HdList',
  initialState: {
    table_data:{
        cpu_rate:'0',
        memory_rate:'0',
        page_no:1,
        total_page: 1,
        list:[]
    }
  },
  reducers: {
    updatePage(state, action) {
        const { cpu_rate, memory_rate, page_no, list,total_page } = action.payload;
        state.table_data.cpu_rate = cpu_rate;
        state.table_data.memory_rate = memory_rate;
        state.table_data.page_no = page_no;
        state.table_data.total_page = total_page;
        state.table_data.list = list;
      },
  },
});

export const {
  updatePage
} = counterSlice.actions;
export const getter = (state: any): dataType => {
  return state.HdList;
};
export const queryAsync = (
    page_no?: string|number
  ) => async (dispatch: Function, getState: Function) => {
    const { table_data } = getter(getState()) as dataType;

    const response: any = await fetch({
      url: '/getStatus',
      data: {
        page_no: page_no == null ? table_data.page_no : page_no,
      },
    });
    response.list.forEach((item: any, index: number) => {
      let code: string | number = index + 1;
      code = page_no?(Number(page_no)-1)*20 + code:code
      if (code < 10) {
        code = '00' + code;
      } else if (code < 100) {
        code = '0' + code;
      } else if (code > 999) {
        return code;
      }
      item.code = code;
    });
      dispatch(updatePage(response));
  };
// Action creators are generated for each case reducer function



export default counterSlice.reducer;
