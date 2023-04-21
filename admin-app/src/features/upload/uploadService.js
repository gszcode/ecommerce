import axios from 'axios'
import { base_url } from '../../utils/base_url'
import { config } from '../../utils/axiosconfig'

const uploadImg = async (data) => {
  const response = await axios(`${base_url}upload/`, data, config)

  return response.data
}

const uploadService = { uploadImg }

export default uploadService
