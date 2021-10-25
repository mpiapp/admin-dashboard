import { createAsyncThunk } from '@reduxjs/toolkit';
import Axios from 'axios'
import { CompanyTypeInput } from '../companyTypeTypes'

export const fetchCompanyType = createAsyncThunk(
    'company-type/fetch', 
    async (_, { rejectWithValue }) => {
        try {
            const response = await Axios.get(`${process.env.REACT_APP_API_URL}company-type`)
            return response.data
        } catch (error) {
            return rejectWithValue(error)
        }
})

export const postCompanyType = createAsyncThunk(
    'company-type/post', 
    async (value : CompanyTypeInput, { rejectWithValue }) => {
        try {
            let body = {
                name : value.name,
                legal_doc: value.legal_doc,
            }
            const response = await Axios.post(`${process.env.REACT_APP_API_URL}company-type`, body)
            return response.data
        } catch (error) {
            return rejectWithValue(error)
        }
})

export const updateCompanyType = createAsyncThunk(
  'company-type/update', 
  async (value : CompanyTypeInput, { rejectWithValue }) => {
      try {
          let body = {
                name : value.name,
                legal_doc: value.legal_doc,
          }
          const response = await Axios.put(`${process.env.REACT_APP_API_URL}company-type/${value.id}`, body)
          return response.data
      } catch (error) {
          return rejectWithValue(error)
      }
})

export const removeCompanyType = createAsyncThunk(
  'company-type/delete', 
  async (value : CompanyTypeInput, { rejectWithValue }) => {
      try {
          const response = await Axios.delete(`${process.env.REACT_APP_API_URL}company-type/${value.id}`)
          return response.data
      } catch (error) {
          return rejectWithValue(error)
      }
})


/* istanbul ignore file */
