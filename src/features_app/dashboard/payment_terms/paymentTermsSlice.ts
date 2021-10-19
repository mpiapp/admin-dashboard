import { createSlice } from '@reduxjs/toolkit';
import swal from 'sweetalert';
import {
    IStatePaymentTerms
} from './paymentTermsTypes'
import {
    fetchPaymentTerms,
    postPaymentTerms,
    updatePaymentTerms,
    removePaymentTerms
} from './reducers/paymentTermsReducers'


const initialState: IStatePaymentTerms = {
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
    [fetchPaymentTerms.pending.type] : (state) => {
        state.loading = true
        state.create = false
        state.update = false
        state.remove = false
    },
    [fetchPaymentTerms.fulfilled.type] : (state, action) => {
        state.loading = false
        state.data = action.payload
    },
    [fetchPaymentTerms.rejected.type] : (state, action) => {
        state.loading = false
        state.error = action.payload
    },
    [postPaymentTerms.pending.type] : (state) => {
        state.loading_create = true
    },
    [postPaymentTerms.fulfilled.type] : (state) => {
        state.loading_create = false
        state.create = true
        swal('Success', "Success created Payment Terms ", 'success')
    },
    [postPaymentTerms.rejected.type] : (state, action) => {
        state.loading_create = false
        state.error_create = action.payload
        swal('Error', `${action.payload}`, 'error')
    },
    [updatePaymentTerms.pending.type] : (state) => {
        state.loading_update = true
    },
    [updatePaymentTerms.fulfilled.type] : (state, action) => {
        state.loading_update = false
        state.update = true
        swal('Success', "Success updated Payment Terms", 'success')
    },
    [updatePaymentTerms.rejected.type] : (state, action) => {
        state.loading_update = false
        state.error_update = action.payload
        swal('Error', `${action.payload}`, 'error')
    },
    [removePaymentTerms.pending.type] : (state) => {
        state.loading_remove = true
    },
    [removePaymentTerms.fulfilled.type] : (state) => {
        state.loading_remove = false
        state.remove = true
        swal('Success', "Success removed Payment Terms", 'success')
    },
    [removePaymentTerms.rejected.type] : (state, action) => {
        state.loading_remove = false
        state.error_remove = action.payload
        swal('Error', `${action.payload}`, 'error')
    }
  }
});

export default statusSlice.reducer;
