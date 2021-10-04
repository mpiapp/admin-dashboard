import { createSlice } from '@reduxjs/toolkit';

export interface RegisterState {
  register: boolean;
}

const initialState: RegisterState = {
  register: false,
};

export const registerSlice = createSlice({
  name: 'register',
  initialState,
  reducers: {
  },
});

export default registerSlice.reducer;
