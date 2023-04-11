import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import bCategoryService from './bcategoryService'

const initialState = {
  bCategories: [],
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: ''
}

export const getCategories = createAsyncThunk(
  'blogCategory/get-categories',
  async (thunkAPI) => {
    try {
      return await bCategoryService.getBlogCategory()
    } catch (error) {
      return thunkAPI.rejectWithValue(error)
    }
  }
)

export const bCategorySlice = createSlice({
  name: 'bCategories',
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
      state.bCategories = action.payload
    })
    builder.addCase(getCategories.rejected, (state, action) => {
      state.isLoading = false
      state.isError = true
      state.isSuccess = false
      state.message = action.error
    })
  }
})

export default bCategorySlice.reducer
