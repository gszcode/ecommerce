import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import productService from './productService'

const initialState = {
  products: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: ''
}

export const getProducts = createAsyncThunk(
  'product/get-products',
  async (thunkAPI) => {
    try {
      return await productService.getProducts()
    } catch (error) {
      return thunkAPI.rejectWithValue(error)
    }
  }
)

export const createProducts = createAsyncThunk(
  'product/create-products',
  async (productData, thunkAPI) => {
    try {
      return await productService.createProduct(productData)
    } catch (error) {
      return thunkAPI.rejectWithValue(error)
    }
  }
)

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getProducts.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(getProducts.fulfilled, (state, action) => {
      state.isLoading = false
      state.isError = false
      state.isSuccess = true
      state.products = action.payload
    })
    builder.addCase(getProducts.rejected, (state, action) => {
      state.isLoading = false
      state.isError = false
      state.isSuccess = true
      state.message = action.error
    })
    builder.addCase(createProducts.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(createProducts.fulfilled, (state, action) => {
      state.isLoading = false
      state.isError = false
      state.isSuccess = true
      state.products = action.payload
    })
    builder.addCase(createProducts.rejected, (state, action) => {
      state.isLoading = false
      state.isError = false
      state.isSuccess = true
      state.message = action.error
    })
  }
})

export default productSlice.reducer
