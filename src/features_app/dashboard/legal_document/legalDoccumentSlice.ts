import { createSlice } from '@reduxjs/toolkit';
import swal from 'sweetalert';
import { 
    IStateLegalDocument 
} from './legalDocumentTypes'

import {
    fetchLegalDocument,
    postLegalDocument,
    updateLegalDocument,
    removeLegalDocument
} from './reducers/legalDocumentReducers'

const initialState: IStateLegalDocument = {
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

export const legalDocumentSlice = createSlice({
  name: 'Legaldocument',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchLegalDocument.pending.type] : (state) => {
        state.loading = true
        state.create = false
        state.update = false
        state.remove = false
    },
    [fetchLegalDocument.fulfilled.type] : (state, action) => {
        state.loading = false
        state.data = action.payload
    },
    [fetchLegalDocument.rejected.type] : (state, action) => {
        state.loading = false
        state.error = action.payload
    },
    [postLegalDocument.pending.type] : (state) => {
        state.loading_create = true
    },
    [postLegalDocument.fulfilled.type] : (state) => {
        state.loading_create = false
        state.create = true
        swal('Success', "Success created Legal Document", 'success')
    },
    [postLegalDocument.rejected.type] : (state, action) => {
        state.loading_create = false
        state.error_create = action.payload
        swal('Error', `${action.payload}`, 'error')
    },
    [updateLegalDocument.pending.type] : (state) => {
        state.loading_update = true
    },
    [updateLegalDocument.fulfilled.type] : (state, action) => {
        state.loading_update = false
        state.update = true
        swal('Success', "Success updated Legal Document", 'success')
    },
    [updateLegalDocument.rejected.type] : (state, action) => {
        state.loading_update = false
        state.error_update = action.payload
        swal('Error', `${action.payload}`, 'error')
    },
    [removeLegalDocument.pending.type] : (state) => {
        state.loading_remove = true
    },
    [removeLegalDocument.fulfilled.type] : (state) => {
        state.loading_remove = false
        state.remove = true
        swal('Success', "Success removed Legal Document", 'success')
    },
    [removeLegalDocument.rejected.type] : (state, action) => {
        state.loading_remove = false
        state.error_remove = action.payload
        swal('Error', `${action.payload}`, 'error')
    }
  }
});

export default legalDocumentSlice.reducer;
