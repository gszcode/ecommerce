import axios from 'axios'
import { base_url } from '../../utils/base_url'

const getProductCategory = async () => {
  const response = await axios(`${base_url}category/`)

  return response.data
}

const pCategoryService = { getProductCategory }

export default pCategoryService
