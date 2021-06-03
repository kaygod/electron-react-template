import { configureStore } from '@reduxjs/toolkit';
import Global from 'store/reducers/Global';
import Home from "store/reducers/Home";

const store = configureStore({
  reducer: {
    Global,
    Home
  },
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
