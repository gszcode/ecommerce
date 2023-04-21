import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import uploadService from './uploadService'

const initialState = {
  images: [],
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: false
}

export const uploadImg = createAsyncThunk(
  'upload/images',
  async (data, thunkAPI) => {
    try {
      return uploadService.uploadImg(data)
    } catch (error) {
      return thunkAPI.rejectWithValue(error)
    }
  }
)

export const uploadSlice = createSlice({
  name: 'images',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(uploadImg.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(uploadImg.fulfilled, (state, action) => {
      state.isLoading = false
      state.isError = false
      state.isSuccess = true
      state.images = action.payload
    })
    builder.addCase(uploadImg.rejected, (state, action) => {
      state.isLoading = false
      state.isError = true
      state.isSuccess = false
      state.message = action.error
    })
  }
})

export default uploadSlice.actions
