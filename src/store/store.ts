import { configureStore } from '@reduxjs/toolkit';
import Global from 'store/reducers/Global';
import Home from "store/reducers/Home";
import HdList from "store/reducers/HdList";
import SwitchKey from "store/reducers/SwitchKey";

const store = configureStore({
  reducer: {
    Global,
    Home,
    HdList,
    SwitchKey
  },
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
