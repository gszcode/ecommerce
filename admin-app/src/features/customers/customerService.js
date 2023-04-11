import axios from 'axios'
import { base_url } from '../../utils/base_url'

const getUsers = async () => {
  const response = await axios(`${base_url}user/all-users`)

  return response.data
}

const customerService = {
  getUsers
}

export default customerService
