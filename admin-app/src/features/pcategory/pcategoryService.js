import axios from 'axios'
import { base_url } from '../../utils/base_url'
import { config } from '../../utils/axiosconfig'

const getProductCategory = async () => {
  const response = await axios(`${base_url}category/`)

  return response.data
}

const createCategory = async (category) => {
  const response = await axios.post(`${base_url}category/`, category, config)

  return response.data
}

const pCategoryService = { getProductCategory, createCategory }

export default pCategoryService
