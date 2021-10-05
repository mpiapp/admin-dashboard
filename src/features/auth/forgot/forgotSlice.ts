import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import swal from 'sweetalert';

export interface ForgotState {
  forgot: boolean;
  loading: boolean;
  error? : any
}


export interface ValueEmail {
  email: string;
}

export function postEmail(value : ValueEmail) {
  return new Promise<{ data: ValueEmail }>((resolve) =>
    setTimeout(() => resolve({ data : value }), 2000)
  );
}

export const sendEmail = createAsyncThunk(
  "forgot/password",
  async(value : ValueEmail, {rejectWithValue }) => {
    const response = await postEmail(value)
    if(response) {
      return response
    } else {
      rejectWithValue("Error Server")
    }
  }
)

const initialState: ForgotState = {
  forgot: false,
  loading : false,
  error : null
};

export const forgotSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: {
    [sendEmail.pending.type] : (state) => {
      state.loading = true
    },
    [sendEmail.fulfilled.type] : (state, action) => {
      state.loading = false
      state.forgot = true
      swal("Success", `If the email ${action.payload.data.email} are registered in our system, we will send a link to reset your password`, "success")
    },
    [sendEmail.rejected.type] : (state, action) => {
      state.loading = false
      state.error = action.payload
    }
  }
});

export default forgotSlice.reducer;
