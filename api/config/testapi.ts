import axios from 'axios'
const { VITE_API_URl_BASE } = import.meta.env

const testApi = axios.create({
  baseURL: VITE_API_URl_BASE,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  }
})

export default testApi
