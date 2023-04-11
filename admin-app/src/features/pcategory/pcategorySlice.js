import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import pCategoryService from './pcategoryService'

const initialState = {
  pCategories: [],
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: ''
}

export const getCategories = createAsyncThunk(
  'productCategory/get-categories',
  async (thunkAPI) => {
    try {
      return await pCategoryService.getProductCategory()
    } catch (error) {
      return thunkAPI.rejectWithValue(error)
    }
  }
)

export const pCategorySlice = createSlice({
  name: 'pCategories',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCategories.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(getCategories.fulfilled, (state, action) => {
      state.isLoading = false
      state.isError = false
      state.isSuccess = true
      state.pCategories = action.payload
    })
    builder.addCase(getCategories.rejected, (state, action) => {
      state.isLoading = false
      state.isError = true
      state.isSuccess = false
      state.message = action.error
    })
  }
})

export default pCategorySlice.reducer
