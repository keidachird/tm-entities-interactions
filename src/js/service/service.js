import axios from 'axios'

export const getData = async (url, options = {}) => {
  try {
    const response = await axios.get(url, options)
    return response.data
  } catch (error) {
    console.log(error)
  }
}
