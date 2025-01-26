import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
})

export const handleError = (error) => {
  throw error
}

export const sendBulkUpdate = (updates) => {
  return api
    .post('/api/bulk-update', { updates })
    .then((response) => response.data)
    .catch(handleError)
}
