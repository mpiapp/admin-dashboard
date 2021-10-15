/* istanbul ignore file */

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import swal from 'sweetalert';
import Axios from 'axios'
import {
    StatusInput,
    IStateStatus
} from './statusTypes'

export const fetchStatus = createAsyncThunk(
    'status/fetch', 
    async (_, { rejectWithValue }) => {
        try {
            const response = await Axios.get(`${process.env.REACT_APP_API_URL}status`)
            return response.data
        } catch (error) {
            return rejectWithValue(error)
        }
})

export const postStatus = createAsyncThunk(
    'status/post', 
    async (value : StatusInput, { rejectWithValue }) => {
        try {
            let body = {
                name : value.name,
            }
            const response = await Axios.post(`${process.env.REACT_APP_API_URL}status`, body)
            return response.data
        } catch (error) {
            return rejectWithValue(error)
        }
})

export const updateStatus = createAsyncThunk(
  'status/update', 
  async (value : StatusInput, { rejectWithValue }) => {
      try {
          let body = {
              name : value.name,
          }
          const response = await Axios.put(`${process.env.REACT_APP_API_URL}status/${value.id}`, body)
          return response.data
      } catch (error) {
          return rejectWithValue(error)
      }
})

export const removeStatus = createAsyncThunk(
  'status/delete', 
  async (value : StatusInput, { rejectWithValue }) => {
      try {
          const response = await Axios.delete(`${process.env.REACT_APP_API_URL}status/${value.id}`)
          return response.data
      } catch (error) {
          return rejectWithValue(error)
      }
})

const initialState: IStateStatus = {
  data: [],
  loading : false,
  error : null,
  loading_create : false,
  error_create: null,
  create : false,
  loading_update : false,
  error_update: null,
  update : false,
  loading_remove : false,
  error_remove: null,
  remove : false
};

export const statusSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchStatus.pending.type] : (state) => {
        state.loading = true
        state.create = false
        state.update = false
        state.remove = false
    },
    [fetchStatus.fulfilled.type] : (state, action) => {
        state.loading = false
        state.data = action.payload
    },
    [fetchStatus.rejected.type] : (state, action) => {
        state.loading = false
        state.error = action.payload
    },
    [postStatus.pending.type] : (state) => {
        state.loading_create = true
    },
    [postStatus.fulfilled.type] : (state) => {
        state.loading_create = false
        state.create = true
        swal('Success', "Success created Status menu", 'success')
    },
    [postStatus.rejected.type] : (state, action) => {
        state.loading_create = false
        state.error_create = action.payload
        swal('Error', `${action.payload}`, 'error')
    },
    [updateStatus.pending.type] : (state) => {
        state.loading_update = true
    },
    [updateStatus.fulfilled.type] : (state, action) => {
        state.loading_update = false
        state.update = true
        swal('Success', "Success updated Status", 'success')
        window.location.reload()
    },
    [updateStatus.rejected.type] : (state, action) => {
        state.loading_update = false
        state.error_update = action.payload
        swal('Error', `${action.payload}`, 'error')
    },
    [postStatus.rejected.type] : (state, action) => {
        state.loading_create = false
        state.error_create = action.payload
        swal('Error', `${action.payload}`, 'error')
    },
    [removeStatus.pending.type] : (state) => {
        state.loading_remove = true
    },
    [removeStatus.fulfilled.type] : (state) => {
        state.loading_remove = false
        state.remove = true
        swal('Success', "Success removed Status", 'success')
    },
    [removeStatus.rejected.type] : (state, action) => {
        state.loading_remove = false
        state.error_remove = action.payload
        swal('Error', `${action.payload}`, 'error')
    }
  }
});

export default statusSlice.reducer;
