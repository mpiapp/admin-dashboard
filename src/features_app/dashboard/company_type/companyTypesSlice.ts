import { createSlice } from '@reduxjs/toolkit';
import swal from 'sweetalert';
import { 
    IStateCompanyType 
} from './companyTypeTypes'

import { 
    fetchCompanyType,  
    postCompanyType,
    updateCompanyType,
    removeCompanyType 
} from './reducers/companyTypeReducers'


const initialState: IStateCompanyType = {
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

export const companyTypeSlice = createSlice({
  name: 'companytype',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchCompanyType.pending.type] : (state) => {
        state.loading = true
        state.create = false
        state.update = false
        state.remove = false
    },
    [fetchCompanyType.fulfilled.type] : (state, action) => {
        state.loading = false
        state.data = action.payload
    },
    [fetchCompanyType.rejected.type] : (state, action) => {
        state.loading = false
        state.error = action.payload
    },
    [postCompanyType.pending.type] : (state) => {
        state.loading_create = true
    },
    [postCompanyType.fulfilled.type] : (state) => {
        state.loading_create = false
        state.create = true
        swal('Success', "Success created CompanyType menu", 'success')
    },
    [postCompanyType.rejected.type] : (state, action) => {
        state.loading_create = false
        state.error_create = action.payload
        swal('Error', `${action.payload}`, 'error')
    },
    [updateCompanyType.pending.type] : (state) => {
        state.loading_update = true
    },
    [updateCompanyType.fulfilled.type] : (state, action) => {
        state.loading_update = false
        state.update = true
        swal('Success', "Success updated CompanyType", 'success')
    },
    [updateCompanyType.rejected.type] : (state, action) => {
        state.loading_update = false
        state.error_update = action.payload
        swal('Error', `${action.payload}`, 'error')
    },
    [removeCompanyType.pending.type] : (state) => {
        state.loading_remove = true
    },
    [removeCompanyType.fulfilled.type] : (state) => {
        state.loading_remove = false
        state.remove = true
        swal('Success', "Success removed CompanyType", 'success')
    },
    [removeCompanyType.rejected.type] : (state, action) => {
        state.loading_remove = false
        state.error_remove = action.payload
        swal('Error', `${action.payload}`, 'error')
    }
  }
});

export default companyTypeSlice.reducer;
