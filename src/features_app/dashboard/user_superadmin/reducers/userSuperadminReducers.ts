import { createAsyncThunk } from '@reduxjs/toolkit';
import Axios from 'axios'
import { UserSuperadminInput } from '../userSuperadminTypes'

export const fetchUserSuperadmin = createAsyncThunk(
    'user-superadmin/fetch', 
    async (_, { rejectWithValue }) => {
        try {
            const response = await Axios.get(`${process.env.REACT_APP_API_URL}user-superadmin`)
            return response.data
        } catch (error) {
            return rejectWithValue(error)
        }
})

export const postUserSuperadmin = createAsyncThunk(
    'user-superadmin/post', 
    async (value : UserSuperadminInput, { rejectWithValue }) => {
        try {
            let body = {
                name : value.name,
                email : value.email,
                password : value.password,
                flag : value.flag,
                status: "Active",
                role : "Superadmin",
                verified : false,
            }
            const response = await Axios.post(`${process.env.REACT_APP_API_URL}user-superadmin`, body)
            return response.data
        } catch (error) {
            return rejectWithValue(error)
        }
})

export const updateUserSuperadmin = createAsyncThunk(
  'user-superadmin/update', 
  async (value : UserSuperadminInput, { rejectWithValue }) => {
      try {
          let body = {
            name : value.name,
            email : value.email,
            password : value.password,
            flag : value.flag,
            status: "Active",
            role : "Superadmin",
            verified : false,
          }
          const response = await Axios.put(`${process.env.REACT_APP_API_URL}user-superadmin/${value.id}`, body)
          return response.data
      } catch (error) {
          return rejectWithValue(error)
      }
})

export const removeUserSuperadmin = createAsyncThunk(
  'user-superadmin/delete', 
  async (value : UserSuperadminInput, { rejectWithValue }) => {
      try {
          const response = await Axios.delete(`${process.env.REACT_APP_API_URL}user-superadmin/${value.id}`)
          return response.data
      } catch (error) {
          return rejectWithValue(error)
      }
})

/* istanbul ignore file */
