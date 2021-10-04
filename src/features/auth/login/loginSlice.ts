import { createSlice } from '@reduxjs/toolkit';

export interface LoginState {
  login: boolean;
}

const initialState: LoginState = {
  login: false,
};

export const loginSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
  },
});

export default loginSlice.reducer;
