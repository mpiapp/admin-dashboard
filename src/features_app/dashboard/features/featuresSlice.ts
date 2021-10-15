/* istanbul ignore file */

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import swal from 'sweetalert';
import Axios from 'axios'
import { 
    FeaturesInput,
    IStateFeatures 
} from './featuresTypes'


export const fetchFeatures = createAsyncThunk(
    'features/fetch', 
    async (_, { rejectWithValue }) => {
        try {
            const response = await Axios.get(`${process.env.REACT_APP_API_URL}features`)
            return response.data
        } catch (error) {
            return rejectWithValue(error)
        }
})

export const postFeatures = createAsyncThunk(
    'features/post', 
    async (value : FeaturesInput, { rejectWithValue }) => {
        try {
            let body = {
                name : value.name,
                flag : value.flag,
                capabilities: value.capabilities,
            }
            const response = await Axios.post(`${process.env.REACT_APP_API_URL}features`, body)
            return response.data
        } catch (error) {
            return rejectWithValue(error)
        }
})

export const updateFeatures = createAsyncThunk(
  'features/update', 
  async (value : FeaturesInput, { rejectWithValue }) => {
      try {
          let body = {
                name : value.name,
                flag : value.flag,
                capabilities: value.capabilities,
          }
          const response = await Axios.put(`${process.env.REACT_APP_API_URL}features/${value.id}`, body)
          return response.data
      } catch (error) {
          return rejectWithValue(error)
      }
})

export const removeFeatures = createAsyncThunk(
  'features/delete', 
  async (value : FeaturesInput, { rejectWithValue }) => {
      try {
          const response = await Axios.delete(`${process.env.REACT_APP_API_URL}features/${value.id}`)
          return response.data
      } catch (error) {
          return rejectWithValue(error)
      }
})

const initialState: IStateFeatures = {
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

export const featuresSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchFeatures.pending.type] : (state) => {
        state.loading = true
        state.create = false
        state.update = false
        state.remove = false
    },
    [fetchFeatures.fulfilled.type] : (state, action) => {
        state.loading = false
        state.data = action.payload
    },
    [fetchFeatures.rejected.type] : (state, action) => {
        state.loading = false
        state.error = action.payload
    },
    [postFeatures.pending.type] : (state) => {
        state.loading_create = true
    },
    [postFeatures.fulfilled.type] : (state) => {
        state.loading_create = false
        state.create = true
        swal('Success', "Success created features menu", 'success')
    },
    [postFeatures.rejected.type] : (state, action) => {
        state.loading_create = false
        state.error_create = action.payload
        swal('Error', `${action.payload}`, 'error')
    },
    [updateFeatures.pending.type] : (state) => {
        state.loading_update = true
    },
    [updateFeatures.fulfilled.type] : (state, action) => {
        state.loading_update = false
        state.update = true
        swal('Success', "Success updated features", 'success')
        window.location.reload()
    },
    [updateFeatures.rejected.type] : (state, action) => {
        state.loading_update = false
        state.error_update = action.payload
        swal('Error', `${action.payload}`, 'error')
    },
    [postFeatures.rejected.type] : (state, action) => {
        state.loading_create = false
        state.error_create = action.payload
        swal('Error', `${action.payload}`, 'error')
    },
    [removeFeatures.pending.type] : (state) => {
        state.loading_remove = true
    },
    [removeFeatures.fulfilled.type] : (state) => {
        state.loading_remove = false
        state.remove = true
        swal('Success', "Success removed features", 'success')
    },
    [removeFeatures.rejected.type] : (state, action) => {
        state.loading_remove = false
        state.error_remove = action.payload
        swal('Error', `${action.payload}`, 'error')
    }
  }
});

export default featuresSlice.reducer;
