import { createSlice } from '@reduxjs/toolkit';
import swal from 'sweetalert';
import { 
    IStateConfigStatus 
} from './configStatusTypes'

import {
    fetchConfigStatus,
    postConfigStatus,
    updateConfigStatus,
    removeConfigStatus
} from './reducers/configStatusReducers'

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
         /* istanbul ignore next */
        state.loading_create = false
         /* istanbul ignore next */
        state.error_create = action.payload
         /* istanbul ignore next */
        swal('Error', `${action.payload}`, 'error')
    },
    [updateConfigStatus.pending.type] : (state) => {
        state.loading_update = true
    },
    [updateConfigStatus.fulfilled.type] : (state, action) => {
        state.loading_update = false
        state.update = true
        swal('Success', "Success updated ConfigStatus", 'success')
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
