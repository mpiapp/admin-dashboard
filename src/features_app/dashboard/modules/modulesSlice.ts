/* istanbul ignore file */

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import swal from 'sweetalert';
import Axios from 'axios'
import { 
    ModulesInput,
    IStateModules
} from './modulesType'


export const fetchModules = createAsyncThunk(
    'modules/fetch', 
    async (_, { rejectWithValue }) => {
        try {
            const response = await Axios.get(`${process.env.REACT_APP_API_URL}modules`)
            return response.data
        } catch (error) {
            return rejectWithValue(error)
        }
})

export const postModules = createAsyncThunk(
    'modules/post', 
    async (value : ModulesInput, { rejectWithValue }) => {
        try {
            let body = {
                name : value.name,
                link : value.link,
                flag : value.flag,
                feature_ids : value.feature_ids,
            }
            const response = await Axios.post(`${process.env.REACT_APP_API_URL}modules`, body)
            return response.data
        } catch (error) {
            return rejectWithValue(error)
        }
})

export const updateModules = createAsyncThunk(
  'modules/update', 
  async (value : ModulesInput, { rejectWithValue }) => {
      try {
          let body = {
                name : value.name,
                link : value.link,
                flag : value.flag,
                feature_ids : value.feature_ids,
          }
          const response = await Axios.put(`${process.env.REACT_APP_API_URL}modules/${value.id}`, body)
          return response.data
      } catch (error) {
          return rejectWithValue(error)
      }
})

export const removeModules = createAsyncThunk(
  'modules/delete', 
  async (value : ModulesInput, { rejectWithValue }) => {
      try {
          const response = await Axios.delete(`${process.env.REACT_APP_API_URL}modules/${value.id}`)
          return response.data
      } catch (error) {
          return rejectWithValue(error)
      }
})

const initialState: IStateModules = {
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

export const modulesSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchModules.pending.type] : (state) => {
        state.loading = true
        state.create = false
        state.update = false
    },
    [fetchModules.fulfilled.type] : (state, action) => {
        state.loading = false
        state.data = action.payload
    },
    [fetchModules.rejected.type] : (state, action) => {
        state.loading = false
        state.error = action.payload
    },
    [postModules.pending.type] : (state) => {
        state.loading_create = true
    },
    [postModules.fulfilled.type] : (state) => {
        state.loading_create = false
        state.create = true
        swal('Success', "Success created modules ", 'success')
    },
    [postModules.rejected.type] : (state, action) => {
        state.loading_create = false
        state.error_create = action.payload
        swal('Error', `${action.payload}`, 'error')
    },
    [updateModules.pending.type] : (state) => {
        state.loading_update = true
    },
    [updateModules.fulfilled.type] : (state, action) => {
        state.loading_update = false
        state.update = true
        swal('Success', "Success updated modules", 'success')
        window.location.reload()
    },
    [updateModules.rejected.type] : (state, action) => {
        state.loading_update = false
        state.error_update = action.payload
        swal('Error', `${action.payload}`, 'error')
    },
    [postModules.rejected.type] : (state, action) => {
        state.loading_create = false
        state.error_create = action.payload
        swal('Error', `${action.payload}`, 'error')
    },
    [removeModules.pending.type] : (state) => {
        state.loading_remove = true
    },
    [removeModules.fulfilled.type] : (state) => {
        state.loading_remove = false
        state.remove = true
        swal('Success', "Success removed modules", 'success')
    },
    [removeModules.rejected.type] : (state, action) => {
        state.loading_remove = false
        state.error_remove = action.payload
        swal('Error', `${action.payload}`, 'error')
    }
  }
});

export default modulesSlice.reducer;
