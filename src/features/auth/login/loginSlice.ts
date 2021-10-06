import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import swal from 'sweetalert'
import crypto from 'crypto-js'; 
import { userCredentials } from './../../../utilities/config'

export interface DataUser {
  access_token : string;
  id_token : string;
  expires_in : number;
  email : string;
  fullname : string;
  avatar : string;
  auth_id : string;
  login : boolean;
}

export interface LoginState {
  login: boolean;
  loading : boolean;
  error? : any;
  data : DataUser;
}

export interface InputState {
  email: string;
  password : string;
}

export interface ResponseBackend {
  access_token: string;
  id_token : string
}


export const getData = (value : InputState ) => {
  let data = {
    access_token : 'accesstoken',
    id_token : 'idtoken', 
    expires_in : 9000,
    email : "johndoe@gmail.com",
    fullname : "John Doe",
    avatar : "https://image.com",
    auth_id : "authid",
    login: true
  }
  if(value.email === "demo@admin.com" && value.password === process.env.REACT_APP_PASSWORD_TEST) {
    return data;
  } else {
    return null
  }
};

export const loginAction = createAsyncThunk(
  'auth/login',
  async (value : InputState , { rejectWithValue }) => {
    const response = await getData(value)
    if(response) {
      const saveToLocalStorage = crypto.AES.encrypt(JSON.stringify(response), `${process.env.REACT_APP_CRYPTO_SECRET}`).toString();
      localStorage.setItem('_?credentials', saveToLocalStorage)
      return response;
    } else {
      return rejectWithValue("Wrong email or password!")
    }
  }
);

export const checkInitalLogin = (user : any) => {
  let login = false
  if(user !== null) {
    login = user.login
  } 
  return login;
}

const initialState: LoginState = {
  login: checkInitalLogin(userCredentials), 
  data : {} as DataUser,
  loading : false,
  error : null
};

export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginAction.fulfilled, (state, action) => {
        state.loading = false;
        state.login = true;
        state.data = action.payload;
        swal("Succesfully Login", "Now redirecting to dashboard...", 'success')
      })
      .addCase(loginAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; 
        swal("Error", `${action.payload}`, 'error')
      })
  },
});

export default loginSlice.reducer;
