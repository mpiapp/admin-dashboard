/* istanbul ignore file */

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import swal from 'sweetalert';
import Axios from 'axios'
import { IStateRoles, RolesInput } from './rolesTypes'

export const fetchRoles = createAsyncThunk(
    'roles/fetch', 
    async (_, { rejectWithValue }) => {
        try {
            const response = await Axios.get(`${process.env.REACT_APP_API_URL}roles`)
            return response.data
        } catch (error) {
            return rejectWithValue(error)
        }
})

export const postRoles = createAsyncThunk(
    'roles/post', 
    async (value : RolesInput, { rejectWithValue }) => {
        try {
            let body = {
                name : value.name,
                flag : value.flag,
                module_ids : value.module_ids
            }
            const response = await Axios.post(`${process.env.REACT_APP_API_URL}roles`, body)
            return response.data
        } catch (error) {
            return rejectWithValue(error)
        }
})

export const updateRoles = createAsyncThunk(
  'roles/update', 
  async (value : RolesInput, { rejectWithValue }) => {
      try {
          let body = {
              name : value.name,
              flag : value.flag,
              module_ids : value.module_ids
          }
          const response = await Axios.put(`${process.env.REACT_APP_API_URL}roles/${value.id}`, body)
          return response.data
      } catch (error) {
          return rejectWithValue(error)
      }
})

export const removeRoles = createAsyncThunk(
  'roles/delete', 
  async (value : RolesInput, { rejectWithValue }) => {
      try {
          const response = await Axios.delete(`${process.env.REACT_APP_API_URL}roles/${value.id}`)
          return response.data
      } catch (error) {
          return rejectWithValue(error)
      }
})

const initialState: IStateRoles = {
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

export const rolesSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchRoles.pending.type] : (state) => {
        state.loading = true
        state.create = false
        state.update = false
        state.remove = false
    },
    [fetchRoles.fulfilled.type] : (state, action) => {
        state.loading = false
        state.data = action.payload
    },
    [fetchRoles.rejected.type] : (state, action) => {
        state.loading = false
        state.error = action.payload
    },
    [postRoles.pending.type] : (state) => {
        state.loading_create = true
    },
    [postRoles.fulfilled.type] : (state) => {
        state.loading_create = false
        state.create = true
        swal('Success', "Success created Roles menu", 'success')
    },
    [postRoles.rejected.type] : (state, action) => {
        state.loading_create = false
        state.error_create = action.payload
        swal('Error', `${action.payload}`, 'error')
    },
    [updateRoles.pending.type] : (state) => {
        state.loading_update = true
    },
    [updateRoles.fulfilled.type] : (state, action) => {
        state.loading_update = false
        state.update = true
        swal('Success', "Success updated Role", 'success')
        window.location.reload()
    },
    [updateRoles.rejected.type] : (state, action) => {
        state.loading_update = false
        state.error_update = action.payload
        swal('Error', `${action.payload}`, 'error')
    },
    [postRoles.rejected.type] : (state, action) => {
        state.loading_create = false
        state.error_create = action.payload
        swal('Error', `${action.payload}`, 'error')
    },
    [removeRoles.pending.type] : (state) => {
        state.loading_remove = true
    },
    [removeRoles.fulfilled.type] : (state) => {
        state.loading_remove = false
        state.remove = true
        swal('Success', "Success removed Role", 'success')
    },
    [removeRoles.rejected.type] : (state, action) => {
        state.loading_remove = false
        state.error_remove = action.payload
        swal('Error', `${action.payload}`, 'error')
    }
  }
});

export default rolesSlice.reducer;
