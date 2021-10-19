import { createAsyncThunk } from '@reduxjs/toolkit';
import Axios from 'axios'
import { 
    ConfigStatusInput,
} from '../configStatusTypes'

export const fetchConfigStatus = createAsyncThunk(
    'configStatus/fetch', 
    async (_, { rejectWithValue }) => {
        try {
            const response = await Axios.get(`${process.env.REACT_APP_API_URL}configStatus`)
            return response.data
        } catch (error) {
            return rejectWithValue(error)
        }
})

export const postConfigStatus = createAsyncThunk(
    'configStatus/post', 
    async (value : ConfigStatusInput, { rejectWithValue }) => {
        try {
            let body = {
                name : value.name,
                current : value.current,
                next : value.next,
            }
            const response = await Axios.post(`${process.env.REACT_APP_API_URL}configStatus`, body)
            return response.data
        } catch (error) {
            return rejectWithValue(error)
        }
})

export const updateConfigStatus = createAsyncThunk(
  'configStatus/update', 
  async (value : ConfigStatusInput, { rejectWithValue }) => {
      try {
          let body = {
                name : value.name,
                current : value.current,
                next : value.next,
          }
          const response = await Axios.put(`${process.env.REACT_APP_API_URL}configStatus/${value.id}`, body)
          return response.data
      } catch (error) {
          return rejectWithValue(error)
      }
})

export const removeConfigStatus = createAsyncThunk(
  'configStatus/delete', 
  async (value : ConfigStatusInput, { rejectWithValue }) => {
      try {
          const response = await Axios.delete(`${process.env.REACT_APP_API_URL}configStatus/${value.id}`)
          return response.data
      } catch (error) {
          return rejectWithValue(error)
      }
})
/* istanbul ignore file */
