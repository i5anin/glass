// Обработчик успешного ответа
export const handleResponse = (response) => {
  return response.data
}

// Обработчик ошибок
export const handleError = (error) => {
  throw error
}
