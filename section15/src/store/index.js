import { configureStore } from '@reduxjs/toolkit';
import counterSlice from './counterState';
import authSlice from './authState';

const store = configureStore({
  reducer: {
    counter: counterSlice.reducer,
    auth: authSlice.reducer
  }
});

export const counterActions = counterSlice.actions;

export const authActions = authSlice.actions;

export default store;