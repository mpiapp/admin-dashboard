import { createAsyncThunk } from '@reduxjs/toolkit';
import Axios from 'axios'
import { RolesInput } from '../rolesTypes'

export const fetchRoles = createAsyncThunk(
    'roles/fetch', 
    async (_, { rejectWithValue }) => {
        try {
            const response = await Axios.get(`${process.env.REACT_APP_API_URL}roles`)
            return response.data
        } catch (error) {
            return rejectWithValue(error)
        }
})

export const postRoles = createAsyncThunk(
    'roles/post', 
    async (value : RolesInput, { rejectWithValue }) => {
        try {
            let body = {
                name : value.name,
                flag : value.flag,
                module_ids : value.module_ids
            }
            const response = await Axios.post(`${process.env.REACT_APP_API_URL}roles`, body)
            return response.data
        } catch (error) {
            return rejectWithValue(error)
        }
})

export const updateRoles = createAsyncThunk(
  'roles/update', 
  async (value : RolesInput, { rejectWithValue }) => {
      try {
          let body = {
              name : value.name,
              flag : value.flag,
              module_ids : value.module_ids
          }
          const response = await Axios.put(`${process.env.REACT_APP_API_URL}roles/${value.id}`, body)
          return response.data
      } catch (error) {
          return rejectWithValue(error)
      }
})

export const removeRoles = createAsyncThunk(
  'roles/delete', 
  async (value : RolesInput, { rejectWithValue }) => {
      try {
          const response = await Axios.delete(`${process.env.REACT_APP_API_URL}roles/${value.id}`)
          return response.data
      } catch (error) {
          return rejectWithValue(error)
      }
})


/* istanbul ignore file */
