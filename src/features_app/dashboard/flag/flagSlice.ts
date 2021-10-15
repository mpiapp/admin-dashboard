/* istanbul ignore file */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { 
    IStateFlag 
} from './flagTypes'


export const fetchFlag = createAsyncThunk(
    'flag/fetch', 
    async (_, { rejectWithValue }) => {
        let data = ["VENDOR", "BUYER"]
        try {
            const response = await data
            return response
        } catch (error) {
            return rejectWithValue(error)
        }
})

const initialState: IStateFlag = {
  data: [],
  loading : false,
  error : null,
};

const proceedToArray = (value : any) => {
    let arrayFlag = []
    for(let i=0; i < value.length; i ++) {
        arrayFlag.push({ value: value[i], label: value[i] })
    }
    return arrayFlag;
}

export const flagSlice = createSlice({
  name: 'flag',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchFlag.pending.type] : (state) => {
        state.loading = true
    },
    [fetchFlag.fulfilled.type] : (state, action) => {
        state.loading = false
        state.data = proceedToArray(action.payload)
    },
    [fetchFlag.rejected.type] : (state, action) => {
        state.loading = false
        state.error = action.payload
    }
  }
});

export default flagSlice.reducer;
