import {createSlice } from '@reduxjs/toolkit';
import swal from 'sweetalert';
import { 
    IStateModules
} from './modulesType'

import {
    fetchModules,
    postModules,
    updateModules,
    removeModules
 } from './reducers/modulesReducers'

const initialState: IStateModules = {
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

export const modulesSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchModules.pending.type] : (state) => {
        state.loading = true
        state.create = false
        state.update = false
    },
    [fetchModules.fulfilled.type] : (state, action) => {
        state.loading = false
        state.data = action.payload
    },
    [fetchModules.rejected.type] : (state, action) => {
        state.loading = false
        state.error = action.payload
    },
    [postModules.pending.type] : (state) => {
        state.loading_create = true
    },
    [postModules.fulfilled.type] : (state) => {
        state.loading_create = false
        state.create = true
        swal('Success', "Success created modules ", 'success')
    },
    [postModules.rejected.type] : (state, action) => {
         /* istanbul ignore next */
        state.loading_create = false
         /* istanbul ignore next */
        state.error_create = action.payload
         /* istanbul ignore next */
        swal('Error', `${action.payload}`, 'error')
    },
    [updateModules.pending.type] : (state) => {
        state.loading_update = true
    },
    [updateModules.fulfilled.type] : (state, action) => {
        state.loading_update = false
        state.update = true
        swal('Success', "Success updated modules", 'success')
    },
    [updateModules.rejected.type] : (state, action) => {
        state.loading_update = false
        state.error_update = action.payload
        swal('Error', `${action.payload}`, 'error')
    },
    [removeModules.pending.type] : (state) => {
        state.loading_remove = true
    },
    [removeModules.fulfilled.type] : (state) => {
        state.loading_remove = false
        state.remove = true
        swal('Success', "Success removed modules", 'success')
    },
    [removeModules.rejected.type] : (state, action) => {
        state.loading_remove = false
        state.error_remove = action.payload
        swal('Error', `${action.payload}`, 'error')
    }
  }
});

export default modulesSlice.reducer;
