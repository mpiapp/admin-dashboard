import { createSlice } from '@reduxjs/toolkit';

export interface ForgotState {
  forgot: boolean;
}

const initialState: ForgotState = {
  forgot: false,
};

export const forgotSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
  },
});

export default forgotSlice.reducer;
