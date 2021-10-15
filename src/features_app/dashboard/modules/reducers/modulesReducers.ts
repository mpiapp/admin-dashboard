import { createAsyncThunk } from '@reduxjs/toolkit';
import Axios from 'axios'
import { ModulesInput } from '../modulesType'


export const fetchModules = createAsyncThunk(
    'modules/fetch', 
    async (_, { rejectWithValue }) => {
        try {
            const response = await Axios.get(`${process.env.REACT_APP_API_URL}modules`)
            return response.data
        } catch (error) {
            return rejectWithValue(error)
        }
})

export const postModules = createAsyncThunk(
    'modules/post', 
    async (value : ModulesInput, { rejectWithValue }) => {
        try {
            let body = {
                name : value.name,
                link : value.link,
                flag : value.flag,
                feature_ids : value.feature_ids,
            }
            const response = await Axios.post(`${process.env.REACT_APP_API_URL}modules`, body)
            return response.data
        } catch (error) {
            return rejectWithValue(error)
        }
})

export const updateModules = createAsyncThunk(
  'modules/update', 
  async (value : ModulesInput, { rejectWithValue }) => {
      try {
          let body = {
                name : value.name,
                link : value.link,
                flag : value.flag,
                feature_ids : value.feature_ids,
          }
          const response = await Axios.put(`${process.env.REACT_APP_API_URL}modules/${value.id}`, body)
          return response.data
      } catch (error) {
          return rejectWithValue(error)
      }
})

export const removeModules = createAsyncThunk(
  'modules/delete', 
  async (value : ModulesInput, { rejectWithValue }) => {
      try {
          const response = await Axios.delete(`${process.env.REACT_APP_API_URL}modules/${value.id}`)
          return response.data
      } catch (error) {
          return rejectWithValue(error)
      }
})



/* istanbul ignore file */
