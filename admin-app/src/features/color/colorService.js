import axios from 'axios'
import { base_url } from '../../utils/base_url'

const getColors = async () => {
  const response = await axios(`${base_url}color/`)

  return response.data
}

const colorService = {
  getColors
}

export default colorService
