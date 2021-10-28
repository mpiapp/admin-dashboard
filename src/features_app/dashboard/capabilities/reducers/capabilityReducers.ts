import { createAsyncThunk } from '@reduxjs/toolkit';
import Axios from 'axios'
import { CapabilityInput } from '../capabilitiesTypes'

export const fetchCapability = createAsyncThunk(
    'capability/fetch', 
    async (_, { rejectWithValue }) => {
        try {
            const response = await Axios.get(`${process.env.REACT_APP_API_URL_STAGING_CMS}/capability`)
            return response.data
        } catch (error) {
            return rejectWithValue(error)
        }
})

export const postCapability = createAsyncThunk(
    'capability/post', 
    async (value : CapabilityInput, { rejectWithValue }) => {
        try {
            let body = {
                name : value.name,
            }
            const response = await Axios.post(`${process.env.REACT_APP_API_URL_STAGING_CMS}/capability`, body)
            return response.data
        } catch (error) {
            return rejectWithValue(error)
        }
})

export const updateCapability = createAsyncThunk(
  'capability/update', 
  async (value : CapabilityInput, { rejectWithValue }) => {
      try {
          let body = {
              name : value.name,
          }
          const response = await Axios.put(`${process.env.REACT_APP_API_URL_STAGING_CMS}/capability/${value._id}`, body)
          return response.data
      } catch (error) {
          return rejectWithValue(error)
      }
})

export const removeCapability = createAsyncThunk(
  'capability/delete', 
  async (value : CapabilityInput, { rejectWithValue }) => {
      try {
          const response = await Axios.delete(`${process.env.REACT_APP_API_URL_STAGING_CMS}/capability/${value._id}`)
          return response.data
      } catch (error) {
          return rejectWithValue(error)
      }
})

/* istanbul ignore file */
