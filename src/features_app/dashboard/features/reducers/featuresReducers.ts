import { createAsyncThunk } from '@reduxjs/toolkit';
import Axios from 'axios'
import { FeaturesInput } from '../featuresTypes'


export const fetchFeatures = createAsyncThunk(
    'features/fetch', 
    async (_, { rejectWithValue }) => {
        try {
            const response = await Axios.get(`${process.env.REACT_APP_API_URL}features`)
            return response.data
        } catch (error) {
            return rejectWithValue(error)
        }
})

export const postFeatures = createAsyncThunk(
    'features/post', 
    async (value : FeaturesInput, { rejectWithValue }) => {
        try {
            let body = {
                name : value.name,
                flag : value.flag,
                capabilities: value.capabilities,
            }
            const response = await Axios.post(`${process.env.REACT_APP_API_URL}features`, body)
            return response.data
        } catch (error) {
            return rejectWithValue(error)
        }
})

export const updateFeatures = createAsyncThunk(
  'features/update', 
  async (value : FeaturesInput, { rejectWithValue }) => {
      try {
          let body = {
                name : value.name,
                flag : value.flag,
                capabilities: value.capabilities,
          }
          const response = await Axios.put(`${process.env.REACT_APP_API_URL}features/${value.id}`, body)
          return response.data
      } catch (error) {
          return rejectWithValue(error)
      }
})

export const removeFeatures = createAsyncThunk(
  'features/delete', 
  async (value : FeaturesInput, { rejectWithValue }) => {
      try {
          const response = await Axios.delete(`${process.env.REACT_APP_API_URL}features/${value.id}`)
          return response.data
      } catch (error) {
          return rejectWithValue(error)
      }
})


/* istanbul ignore file */
