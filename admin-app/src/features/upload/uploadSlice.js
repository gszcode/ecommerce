import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import uploadService from './uploadService'

const initialState = {
  images: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: ''
}

export const uploadImg = createAsyncThunk(
  'upload/images',
  async (data, thunkAPI) => {
    try {
      const formData = new FormData()
      for (let i = 0; i < data.length; i++) {
        formData.append('images', data[i])
      }

      return await uploadService.uploadImg(formData)
    } catch (error) {
      return thunkAPI.rejectWithValue(error)
    }
  }
)

export const deleteImg = createAsyncThunk(
  'delete/images',
  async (id, thunkAPI) => {
    try {
      return await uploadService.deleteImg(id)
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
      state.isError = false
      state.isSuccess = true
      state.message = action.error
    })
    builder.addCase(deleteImg.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(deleteImg.fulfilled, (state, action) => {
      state.isLoading = false
      state.isError = false
      state.isSuccess = true
      state.images = []
    })
    builder.addCase(deleteImg.rejected, (state, action) => {
      state.isLoading = false
      state.isError = false
      state.isSuccess = true
      state.message = action.payload
    })
  }
})

export default uploadSlice.reducer
