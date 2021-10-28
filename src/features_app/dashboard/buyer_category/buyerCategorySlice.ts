import { createSlice } from '@reduxjs/toolkit';
import swal from 'sweetalert';
import {
    IStateBuyerCategory
} from './buyerCategoryTypes'

import { 
    fetchBuyerCategory,  
    postBuyerCategory,
    updateBuyerCategory,
    removeBuyerCategory 
} from './reducers/buyerCategoryReducers'

/* istanbul ignore file */

const initialState: IStateBuyerCategory = {
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

export const buyerCategorySlice = createSlice({
  name: 'buyercategory',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchBuyerCategory.pending.type] : (state) => {
        state.loading = true
        state.create = false
        state.update = false
        state.remove = false
    },
    [fetchBuyerCategory.fulfilled.type] : (state, action) => {
        state.loading = false
        state.data = action.payload
    },
    [fetchBuyerCategory.rejected.type] : (state, action) => {
        state.loading = false
        state.error = action.payload
    },
    [postBuyerCategory.pending.type] : (state) => {
        state.loading_create = true
    },
    [postBuyerCategory.fulfilled.type] : (state) => {
        state.loading_create = false
        state.create = true
        swal('Success', "Success created Buyer Category menu", 'success')
    },
    [postBuyerCategory.rejected.type] : (state, action) => {
        state.loading_create = false
        state.error_create = action.payload
        swal('Error',"Error created", 'error')
    },
    [updateBuyerCategory.pending.type] : (state) => {
        state.loading_update = true
    },
    [updateBuyerCategory.fulfilled.type] : (state, action) => {
        state.loading_update = false
        state.update = true
        swal('Success', "Success updated Buyer Category", 'success')
    },
    [updateBuyerCategory.rejected.type] : (state, action) => {
        state.loading_update = false
        state.error_update = action.payload 
        swal('Error', `${action.payload}`, 'error')
    },
    [removeBuyerCategory.pending.type] : (state) => {
        state.loading_remove = true
    },
    [removeBuyerCategory.fulfilled.type] : (state) => {
        state.loading_remove = false
        state.remove = true
        swal('Success', "Success removed Buyer Category", 'success')
    },
    [removeBuyerCategory.rejected.type] : (state, action) => {
        state.loading_remove = false
        state.error_remove = action.payload
        swal('Error', `${action.payload}`, 'error')
    }
  }
});

export default buyerCategorySlice.reducer;