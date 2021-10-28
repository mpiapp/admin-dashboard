import { createAsyncThunk } from '@reduxjs/toolkit';
import Axios from 'axios'
import { VendorCategoryInput } from '../vendorCategoryTypes'

export const fetchVendorCategory = createAsyncThunk(
    'vendor-category/fetch', 
    async (_, { rejectWithValue }) => {
        try {
            const response = await Axios.get(`${process.env.REACT_APP_API_URL}vendor-category`)
            return response.data
        } catch (error) {
            return rejectWithValue(error)
        }
})

export const postVendorCategory = createAsyncThunk(
    'vendor-category/post', 
    async (value : VendorCategoryInput, { rejectWithValue }) => {
        try {
            let body = {
                name : value.name,
            }
            const response = await Axios.post(`${process.env.REACT_APP_API_URL}vendor-category`, body)
            return response.data
        } catch (error) {
            return rejectWithValue(error)
        }
})

export const updateVendorCategory = createAsyncThunk(
  'vendor-category/update', 
  async (value : VendorCategoryInput, { rejectWithValue }) => {
      try {
          let body = {
              name : value.name,
          }
          const response = await Axios.put(`${process.env.REACT_APP_API_URL}vendor-category/${value.id}`, body)
          return response.data
      } catch (error) {
          return rejectWithValue(error)
      }
})

export const removeVendorCategory = createAsyncThunk(
  'vendor-category/delete', 
  async (value : VendorCategoryInput, { rejectWithValue }) => {
      try {
          const response = await Axios.delete(`${process.env.REACT_APP_API_URL}vendor-category/${value.id}`)
          return response.data
      } catch (error) {
          return rejectWithValue(error)
      }
})

/* istanbul ignore file */
