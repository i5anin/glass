import apiClient from '@/modules/api/apiClient.js'
import { handleError, handleResponse } from '@/modules/api/responseHandlers.js'

/**
 * Проверка обязательных полей
 * @param {Object} fields - объект с полями для проверки
 * @param {Array<string>} requiredFields - список обязательных полей
 * @throws {Error} - выбрасывает ошибку, если поле отсутствует
 */
const validateFields = (fields, requiredFields) => {
  requiredFields.forEach((field) => {
    if (!fields[field]) {
      console.warn(`Поле "${field}" отсутствует или пустое.`)
      throw new Error(`Обязательное поле "${field}" не заполнено.`)
    }
  })
}

/**
 * Получение данных номенклатурного заказа по параметрам
 * @param {Object} params - параметры для запроса
 * @returns {Promise<Object>} - Объект заказа
 */
export const getNomById = async (params) => {
  try {
    // Проверка обязательных параметров
    validateFields(params, ['id', 'type', 'module'])

    const response = await apiClient.get('nom_list', { params })
    return handleResponse(response)
  } catch (error) {
    handleError(error)
    throw error
  }
}
