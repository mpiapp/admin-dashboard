import { createAsyncThunk } from '@reduxjs/toolkit';
import Axios from 'axios'
import {
    StatusInput,
} from '../statusTypes'

export const fetchStatus = createAsyncThunk(
    'status/fetch', 
    async (_, { rejectWithValue }) => {
        try {
            const response = await Axios.get(`${process.env.REACT_APP_API_URL}status`)
            return response.data
        } catch (error) {
            return rejectWithValue(error)
        }
})

export const postStatus = createAsyncThunk(
    'status/post', 
    async (value : StatusInput, { rejectWithValue }) => {
        try {
            let body = {
                name : value.name,
            }
            const response = await Axios.post(`${process.env.REACT_APP_API_URL}status`, body)
            return response.data
        } catch (error) {
            return rejectWithValue(error)
        }
})

export const updateStatus = createAsyncThunk(
  'status/update', 
  async (value : StatusInput, { rejectWithValue }) => {
      try {
          let body = {
              name : value.name,
          }
          const response = await Axios.put(`${process.env.REACT_APP_API_URL}status/${value.id}`, body)
          return response.data
      } catch (error) {
          return rejectWithValue(error)
      }
})

export const removeStatus = createAsyncThunk(
  'status/delete', 
  async (value : StatusInput, { rejectWithValue }) => {
      try {
          const response = await Axios.delete(`${process.env.REACT_APP_API_URL}status/${value.id}`)
          return response.data
      } catch (error) {
          return rejectWithValue(error)
      }
})

/* istanbul ignore file */
