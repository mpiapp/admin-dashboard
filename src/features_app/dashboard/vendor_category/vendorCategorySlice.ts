import { createSlice } from '@reduxjs/toolkit';
import swal from 'sweetalert';
import {
    IStateVendorCategory
} from './vendorCategoryTypes'

import { 
    fetchVendorCategory,  
    postVendorCategory,
    updateVendorCategory,
    removeVendorCategory 
} from './reducers/vendorCategoryReducers'

/* istanbul ignore file */

const initialState: IStateVendorCategory = {
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

export const vendorCategorySlice = createSlice({
  name: 'vendorcategory',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchVendorCategory.pending.type] : (state) => {
        state.loading = true
        state.create = false
        state.update = false
        state.remove = false
    },
    [fetchVendorCategory.fulfilled.type] : (state, action) => {
        state.loading = false
        state.data = action.payload
    },
    [fetchVendorCategory.rejected.type] : (state, action) => {
        state.loading = false
        state.error = action.payload
    },
    [postVendorCategory.pending.type] : (state) => {
        state.loading_create = true
    },
    [postVendorCategory.fulfilled.type] : (state) => {
        state.loading_create = false
        state.create = true
        swal('Success', "Success created Vendor Category menu", 'success')
    },
    [postVendorCategory.rejected.type] : (state, action) => {
        state.loading_create = false
        state.error_create = action.payload
        swal('Error',"Error created", 'error')
    },
    [updateVendorCategory.pending.type] : (state) => {
        state.loading_update = true
    },
    [updateVendorCategory.fulfilled.type] : (state, action) => {
        state.loading_update = false
        state.update = true
        swal('Success', "Success updated Vendor Category", 'success')
    },
    [updateVendorCategory.rejected.type] : (state, action) => {
        state.loading_update = false
        state.error_update = action.payload 
        swal('Error', `${action.payload}`, 'error')
    },
    [removeVendorCategory.pending.type] : (state) => {
        state.loading_remove = true
    },
    [removeVendorCategory.fulfilled.type] : (state) => {
        state.loading_remove = false
        state.remove = true
        swal('Success', "Success removed Vendor Category", 'success')
    },
    [removeVendorCategory.rejected.type] : (state, action) => {
        state.loading_remove = false
        state.error_remove = action.payload
        swal('Error', `${action.payload}`, 'error')
    }
  }
});

export default vendorCategorySlice.reducer;