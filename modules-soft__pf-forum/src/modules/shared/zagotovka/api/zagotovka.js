import apiClient from '@/modules/api/apiClient.js'
import { handleResponse, handleError } from '@/modules/api/responseHandlers.js'

/**
 * Получает информацию о заготовке.
 *
 * @param {Object} params - Параметры запроса.
 * @returns {Promise<Object>} - Промис с данными о заготовке.
 */
export const getZagotovkaInfo = async (params) => {
  try {
    const response = await apiClient.get('/zag_info', { params })
    return handleResponse(response)
  } catch (error) {
    return handleError(error)
  }
}
