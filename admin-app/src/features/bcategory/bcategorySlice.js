import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit'
import bCategoryService from './bcategoryService'

export const resetState = createAction('Reset_all')

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

export const createBlogCategory = createAsyncThunk(
  'blogCategory/create-category',
  async (blogData, thunkAPI) => {
    try {
      return await bCategoryService.createBlogCategory(blogData)
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
    builder
      .addCase(getCategories.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getCategories.fulfilled, (state, action) => {
        state.isLoading = false
        state.isError = false
        state.isSuccess = true
        state.bCategories = action.payload
      })
      .addCase(getCategories.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.isSuccess = false
        state.message = action.error
      })
      .addCase(createBlogCategory.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createBlogCategory.fulfilled, (state, action) => {
        state.isLoading = false
        state.isError = false
        state.isSuccess = true
        state.createdBlogCategory = action.payload
      })
      .addCase(createBlogCategory.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.isSuccess = false
        state.message = action.error
      })
      .addCase(resetState, () => initialState)
  }
})

export default bCategorySlice.reducer
