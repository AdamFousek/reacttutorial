import { createSlice } from '@reduxjs/toolkit';

const initState = { isAuthenticated: false };

const authSlice = createSlice({
  name: 'auth',
  initialState: initState,
  reducers: {
    login(state) {
      state.isAuthenticated = true;
    },
    logout(state) {
      state.isAuthenticated = false;
    }
  }
});

export default authSlice;