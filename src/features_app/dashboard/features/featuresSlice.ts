import { createSlice } from '@reduxjs/toolkit';
import swal from 'sweetalert';
import { 
    IStateFeatures 
} from './featuresTypes'

import { 
    fetchFeatures,  
    postFeatures,
    updateFeatures,
    removeFeatures 
} from './reducers/featuresReducers'


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
        /* istanbul ignore next */
        state.loading_create = false
        /* istanbul ignore next */
        state.error_create = action.payload
        /* istanbul ignore next */
        swal('Error', `${action.payload}`, 'error')
    },
    [updateFeatures.pending.type] : (state) => {
        state.loading_update = true
    },
    [updateFeatures.fulfilled.type] : (state, action) => {
        state.loading_update = false
        state.update = true
        swal('Success', "Success updated features", 'success')
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
