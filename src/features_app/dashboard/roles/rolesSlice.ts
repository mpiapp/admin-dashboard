import { createSlice } from '@reduxjs/toolkit';
import swal from 'sweetalert';
import { IStateRoles } from './rolesTypes'

import { 
    fetchRoles,
    postRoles,
    updateRoles,
    removeRoles
} from './reducers/rolesReducers'


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
         /* istanbul ignore next */
        state.loading_create = false
         /* istanbul ignore next */
        state.error_create = action.payload
         /* istanbul ignore next */
        swal('Error', `${action.payload}`, 'error')
    },
    [updateRoles.pending.type] : (state) => {
        state.loading_update = true
    },
    [updateRoles.fulfilled.type] : (state, action) => {
        state.loading_update = false
        state.update = true
        swal('Success', "Success updated Role", 'success')
    },
    [updateRoles.rejected.type] : (state, action) => {
        state.loading_update = false
        state.error_update = action.payload
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
