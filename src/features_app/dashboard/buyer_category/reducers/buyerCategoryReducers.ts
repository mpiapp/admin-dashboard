import { createAsyncThunk } from '@reduxjs/toolkit';
import Axios from 'axios'
import { BuyerCategoryInput } from '../buyerCategoryTypes'

export const fetchBuyerCategory = createAsyncThunk(
    'buyer-category/fetch', 
    async (_, { rejectWithValue }) => {
        try {
            const response = await Axios.get(`${process.env.REACT_APP_API_URL}buyer-category`)
            return response.data
        } catch (error) {
            return rejectWithValue(error)
        }
})

export const postBuyerCategory = createAsyncThunk(
    'buyer-category/post', 
    async (value : BuyerCategoryInput, { rejectWithValue }) => {
        try {
            let body = {
                name : value.name,
            }
            const response = await Axios.post(`${process.env.REACT_APP_API_URL}buyer-category`, body)
            return response.data
        } catch (error) {
            return rejectWithValue(error)
        }
})

export const updateBuyerCategory = createAsyncThunk(
  'buyer-category/update', 
  async (value : BuyerCategoryInput, { rejectWithValue }) => {
      try {
          let body = {
              name : value.name,
          }
          const response = await Axios.put(`${process.env.REACT_APP_API_URL}buyer-category/${value.id}`, body)
          return response.data
      } catch (error) {
          return rejectWithValue(error)
      }
})

export const removeBuyerCategory = createAsyncThunk(
  'buyer-category/delete', 
  async (value : BuyerCategoryInput, { rejectWithValue }) => {
      try {
          const response = await Axios.delete(`${process.env.REACT_APP_API_URL}buyer-category/${value.id}`)
          return response.data
      } catch (error) {
          return rejectWithValue(error)
      }
})

/* istanbul ignore file */
