/* istanbul ignore file */

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import swal from 'sweetalert';
import Axios from 'axios'
import { 
    ConfigStatusInput,
    IStateConfigStatus 
} from './configStatusTypes'


export const fetchConfigStatus = createAsyncThunk(
    'configStatus/fetch', 
    async (_, { rejectWithValue }) => {
        try {
            const response = await Axios.get(`${process.env.REACT_APP_API_URL}configStatus`)
            return response.data
        } catch (error) {
            return rejectWithValue(error)
        }
})

export const postConfigStatus = createAsyncThunk(
    'configStatus/post', 
    async (value : ConfigStatusInput, { rejectWithValue }) => {
        try {
            let body = {
                name : value.name,
                current : value.current,
                next : value.next,
            }
            const response = await Axios.post(`${process.env.REACT_APP_API_URL}configStatus`, body)
            return response.data
        } catch (error) {
            return rejectWithValue(error)
        }
})

export const updateConfigStatus = createAsyncThunk(
  'configStatus/update', 
  async (value : ConfigStatusInput, { rejectWithValue }) => {
      try {
          let body = {
                name : value.name,
                current : value.current,
                next : value.next,
          }
          const response = await Axios.put(`${process.env.REACT_APP_API_URL}configStatus/${value.id}`, body)
          return response.data
      } catch (error) {
          return rejectWithValue(error)
      }
})

export const removeConfigStatus = createAsyncThunk(
  'configStatus/delete', 
  async (value : ConfigStatusInput, { rejectWithValue }) => {
      try {
          const response = await Axios.delete(`${process.env.REACT_APP_API_URL}configStatus/${value.id}`)
          return response.data
      } catch (error) {
          return rejectWithValue(error)
      }
})

const initialState: IStateConfigStatus = {
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

export const configStatusSlice = createSlice({
  name: 'configStatus',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchConfigStatus.pending.type] : (state) => {
        state.loading = true
        state.create = false
        state.update = false
        state.remove = false
    },
    [fetchConfigStatus.fulfilled.type] : (state, action) => {
        state.loading = false
        state.data = action.payload
    },
    [fetchConfigStatus.rejected.type] : (state, action) => {
        state.loading = false
        state.error = action.payload
    },
    [postConfigStatus.pending.type] : (state) => {
        state.loading_create = true
    },
    [postConfigStatus.fulfilled.type] : (state) => {
        state.loading_create = false
        state.create = true
        swal('Success', "Success created ConfigStatus", 'success')
    },
    [postConfigStatus.rejected.type] : (state, action) => {
        state.loading_create = false
        state.error_create = action.payload
        swal('Error', `${action.payload}`, 'error')
    },
    [updateConfigStatus.pending.type] : (state) => {
        state.loading_update = true
    },
    [updateConfigStatus.fulfilled.type] : (state, action) => {
        state.loading_update = false
        state.update = true
        swal('Success', "Success updated ConfigStatus", 'success')
        window.location.reload()
    },
    [updateConfigStatus.rejected.type] : (state, action) => {
        state.loading_update = false
        state.error_update = action.payload
        swal('Error', `${action.payload}`, 'error')
    },
    [postConfigStatus.rejected.type] : (state, action) => {
        state.loading_create = false
        state.error_create = action.payload
        swal('Error', `${action.payload}`, 'error')
    },
    [removeConfigStatus.pending.type] : (state) => {
        state.loading_remove = true
    },
    [removeConfigStatus.fulfilled.type] : (state) => {
        state.loading_remove = false
        state.remove = true
        swal('Success', "Success removed ConfigStatus", 'success')
    },
    [removeConfigStatus.rejected.type] : (state, action) => {
        state.loading_remove = false
        state.error_remove = action.payload
        swal('Error', `${action.payload}`, 'error')
    }
  }
});

export default configStatusSlice.reducer;
