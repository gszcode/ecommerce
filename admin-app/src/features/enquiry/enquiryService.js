import axios from 'axios'
import { base_url } from '../../utils/base_url'

const getEnquiries = async () => {
  const response = await axios(`${base_url}enquiry/`)

  return response.data
}

const enquiryService = { getEnquiries }

export default enquiryService
