import { configureStore } from '@reduxjs/toolkit';
import Global from 'store/reducers/Global';
import SwitchKey from 'store/reducers/SwitchKey';

const store = configureStore({
  reducer: {
    Global,
    SwitchKey,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
