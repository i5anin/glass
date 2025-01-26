import apiClient from '@/modules/api/apiClient.js'
import { handleResponse, handleError } from '@/modules/api/responseHandlers.js'

/**
 * Получение списка заказов с использованием API.
 * @param {Object} params - параметры для запроса.
 * @returns {Promise<Object>} - Промис с данными заказа.
 */
export const getItems = (params) => {
  return apiClient
    .get('list', { params }) // Передаём параметры напрямую
    .then(handleResponse)
    .catch(handleError)
}
