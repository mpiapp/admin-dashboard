import { createAsyncThunk } from '@reduxjs/toolkit';
import Axios from 'axios'
import { 
    LegalDocumentInput,
} from '../legalDocumentTypes'

export const fetchLegalDocument = createAsyncThunk(
    'legaldocument/fetch', 
    async (_, { rejectWithValue }) => {
        try {
            const response = await Axios.get(`${process.env.REACT_APP_API_URL}legal-document`)
            return response.data
        } catch (error) {
            return rejectWithValue(error)
        }
})

export const postLegalDocument = createAsyncThunk(
    'legaldocument/post', 
    async (value : LegalDocumentInput, { rejectWithValue }) => {
        try {
            let body = {
                title : value.title,
                short_title : value.short_title,
            }
            const response = await Axios.post(`${process.env.REACT_APP_API_URL}legal-document`, body)
            return response.data
        } catch (error) {
            return rejectWithValue(error)
        }
})

export const updateLegalDocument = createAsyncThunk(
  'legaldocument/update', 
  async (value : LegalDocumentInput, { rejectWithValue }) => {
      try {
          let body = {
                title : value.title,
                short_title : value.short_title,
          }
          const response = await Axios.put(`${process.env.REACT_APP_API_URL}legal-document/${value.id}`, body)
          return response.data
      } catch (error) {
          return rejectWithValue(error)
      }
})

export const removeLegalDocument = createAsyncThunk(
  'legaldocument/delete', 
  async (value : LegalDocumentInput, { rejectWithValue }) => {
      try {
          const response = await Axios.delete(`${process.env.REACT_APP_API_URL}legal-document/${value.id}`)
          return response.data
      } catch (error) {
          return rejectWithValue(error)
      }
})
/* istanbul ignore file */
