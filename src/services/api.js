import axios from 'axios'

const apiodeBurger = axios.create({
  baseURL: 'http://localhost:3001',
  validateStatus: () => true
})

export default apiodeBurger
