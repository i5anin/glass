import apiClient from '@/modules/api/apiClient.js'
import { handleResponse, handleError } from '@/modules/api/responseHandlers.js'

export const getClients = (params) => {
  return apiClient
    .get('clients', { params })
    .then(handleResponse)
    .catch(handleError)
}
