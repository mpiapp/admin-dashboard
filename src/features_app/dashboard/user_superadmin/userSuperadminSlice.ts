import { createSlice } from '@reduxjs/toolkit';
import swal from 'sweetalert';
import {
    IStateUserSuperadmin
} from './userSuperadminTypes'

import { 
    fetchUserSuperadmin,  
    postUserSuperadmin,
    updateUserSuperadmin,
    removeUserSuperadmin 
} from './reducers/userSuperadminReducers'

const initialState: IStateUserSuperadmin = {
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

export const userSuperadminSlice = createSlice({
  name: 'user-superadmin',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchUserSuperadmin.pending.type] : (state) => {
        state.loading = true
        state.create = false
        state.update = false
        state.remove = false
    },
    [fetchUserSuperadmin.fulfilled.type] : (state, action) => {
        state.loading = false
        state.data = action.payload
    },
    [fetchUserSuperadmin.rejected.type] : (state, action) => {
        state.loading = false
        state.error = action.payload
    },
    [postUserSuperadmin.pending.type] : (state) => {
        state.loading_create = true
    },
    [postUserSuperadmin.fulfilled.type] : (state) => {
        state.loading_create = false
        state.create = true
        swal('Success', "Success created User Superadmin menu", 'success')
    },
    [postUserSuperadmin.rejected.type] : (state, action) => {
        state.loading_create = false
        state.error_create = action.payload
        swal('Error',"Error created", 'error')
    },
    [updateUserSuperadmin.pending.type] : (state) => {
        state.loading_update = true
    },
    [updateUserSuperadmin.fulfilled.type] : (state, action) => {
        state.loading_update = false
        state.update = true
        swal('Success', "Success updated User Superadmin", 'success')
    },
    [updateUserSuperadmin.rejected.type] : (state, action) => {
        state.loading_update = false
        state.error_update = action.payload 
        swal('Error', `${action.payload}`, 'error')
    },
    [removeUserSuperadmin.pending.type] : (state) => {
        state.loading_remove = true
    },
    [removeUserSuperadmin.fulfilled.type] : (state) => {
        state.loading_remove = false
        state.remove = true
        swal('Success', "Success removed User Superadmin", 'success')
    },
    [removeUserSuperadmin.rejected.type] : (state, action) => {
        state.loading_remove = false
        state.error_remove = action.payload
        swal('Error', `${action.payload}`, 'error')
    }
  }
});

export default userSuperadminSlice.reducer;