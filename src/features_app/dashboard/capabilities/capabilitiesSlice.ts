import { createSlice } from '@reduxjs/toolkit';
import swal from 'sweetalert';
import {
    IStateCapability
} from './capabilitiesTypes'

import { 
    fetchCapability,  
    postCapability,
    updateCapability,
    removeCapability 
} from './reducers/capabilityReducers'

/* istanbul ignore file */

const initialState: IStateCapability = {
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

export const capabilitySlice = createSlice({
  name: 'capabilities',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchCapability.pending.type] : (state) => {
        state.loading = true
        state.create = false
        state.update = false
        state.remove = false
    },
    [fetchCapability.fulfilled.type] : (state, action) => {
        state.loading = false
        state.data = action.payload
    },
    [fetchCapability.rejected.type] : (state, action) => {
        state.loading = false
        state.error = action.payload
        swal('Error',`${action.payload}`, 'error')

    },
    [postCapability.pending.type] : (state) => {
        state.loading_create = true
    },
    [postCapability.fulfilled.type] : (state) => {
        state.loading_create = false
        state.create = true
        swal('Success', "Success created Capability menu", 'success')
    },
    [postCapability.rejected.type] : (state, action) => {
        state.loading_create = false
        state.error_create = action.payload
        swal('Error',`${action.payload}`, 'error')
    },
    [updateCapability.pending.type] : (state) => {
        state.loading_update = true
    },
    [updateCapability.fulfilled.type] : (state, action) => {
        state.loading_update = false
        state.update = true
        swal('Success', "Success updated Capability", 'success')
    },
    [updateCapability.rejected.type] : (state, action) => {
        state.loading_update = false
        state.error_update = action.payload 
        swal('Error', `${action.payload}`, 'error')
    },
    [removeCapability.pending.type] : (state) => {
        state.loading_remove = true
    },
    [removeCapability.fulfilled.type] : (state) => {
        state.loading_remove = false
        state.remove = true
        swal('Success', "Success removed Capability", 'success')
    },
    [removeCapability.rejected.type] : (state, action) => {
        state.loading_remove = false
        state.error_remove = action.payload
        swal('Error', `${action.payload}`, 'error')
    }
  }
});

export default capabilitySlice.reducer;