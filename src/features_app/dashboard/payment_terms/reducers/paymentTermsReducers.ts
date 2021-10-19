import { createAsyncThunk } from '@reduxjs/toolkit';
import Axios from 'axios'
import {
    PaymentTermsInput,
} from '../paymentTermsTypes'

export const fetchPaymentTerms = createAsyncThunk(
    'payment-terms/fetch', 
    async (_, { rejectWithValue }) => {
        try {
            const response = await Axios.get(`${process.env.REACT_APP_API_URL}payment-terms`)
            return response.data
        } catch (error) {
            return rejectWithValue(error)
        }
})

export const postPaymentTerms = createAsyncThunk(
    'payment-terms/post', 
    async (value : PaymentTermsInput, { rejectWithValue }) => {
        try {
            let body = {
                name : value.name,
            }
            const response = await Axios.post(`${process.env.REACT_APP_API_URL}payment-terms`, body)
            return response.data
        } catch (error) {
            return rejectWithValue(error)
        }
})

export const updatePaymentTerms = createAsyncThunk(
  'payment-terms/update', 
  async (value : PaymentTermsInput, { rejectWithValue }) => {
      try {
          let body = {
              name : value.name,
          }
          const response = await Axios.put(`${process.env.REACT_APP_API_URL}payment-terms/${value.id}`, body)
          return response.data
      } catch (error) {
          return rejectWithValue(error)
      }
})

export const removePaymentTerms = createAsyncThunk(
  'payment-terms/delete', 
  async (value : PaymentTermsInput, { rejectWithValue }) => {
      try {
          const response = await Axios.delete(`${process.env.REACT_APP_API_URL}payment-terms/${value.id}`)
          return response.data
      } catch (error) {
          return rejectWithValue(error)
      }
})

/* istanbul ignore file */
