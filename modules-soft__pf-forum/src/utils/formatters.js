import moment from 'moment'

/**
 * Определяет выравнивание текста для отображения в таблице.
 *
 * @param {string} type - Тип данных (например, 'date', 'timestamp', 'bool', и т.д.).
 * @param {string} [key=''] - Ключ данных, используется для дополнительных условий (например, содержит 'price').
 * @returns {string} - Значение выравнивания текста ('left', 'center', 'right').
 *
 * Логика:
 * - Если ключ включает 'price', возвращается 'right' (выравнивание по правому краю).
 * - Если тип данных — 'date' или 'timestamp', возвращается 'center' (выравнивание по центру).
 * - Для всех остальных случаев — 'left' (выравнивание по левому краю).
 */
export function getTextAlignment(type, key = '') {
  if (key.toLowerCase().includes('price')) {
    return 'right' // Цена выравнивается по правому краю
  }

  if (type === 'bool') {
    return 'center' // Булевые значения выравниваются по центру
  }

  if (type === 'date' || type === 'timestamp') {
    return 'center' // Дата и время выравниваются по центру
  }

  return 'left' // Все остальное выравнивается по левому краю
}

/**
 * Форматирует значение для отображения в таблице.
 *
 * @param {*} value - Значение, которое требуется отформатировать.
 * @param {string} type - Тип значения (например, 'bool', 'integer', 'date').
 * @param {string} [key=''] - Ключ данных, используется для дополнительных условий (например, содержит 'price').
 * @returns {string} - Отформатированное значение в строковом формате.
 *
 * Логика:
 * - Если ключ включает 'price', форматируется как валюта (`formatCurrency`).
 * - Тип данных определяет обработку:
 *   - `bool`: через `formatBoolean`, возвращает ✅ или пустую строку.
 *   - `integer`/`float`: через `formatNumber`, форматирует числа с разделением тысяч.
 *   - `string`: через `formatText`, проверяет на email и генерирует `<a>`-ссылку для почты.
 *   - `date`: через `formatDate`, возвращает дату в формате DD.MM.YYYY.
 *   - `timestamp`: через `formatTimestamp`, добавляет время в формате DD.MM.YYYY HH:mm.
 *   - `NULL`: возвращает пустую строку.
 *   - Любой другой тип — возвращает значение как есть или пустую строку.
 */
export function formatValue(value, type, key) {
  // Проверяем, является ли значение объектом
  if (isObject(value)) {
    if (key && key.toLowerCase().includes('strat')) {
      return formatStrategy(value)
    }
    return '[Object]'
  }

  const getCallerStack = () => {
    const stack = new Error().stack
    return stack
      ? stack
          .split('\n')
          .slice(2) // Пропускаем первую строку (ошибка) и сам вызов `getCallerStack`
          .join('\n')
      : 'Стек вызовов недоступен'
  }

  if (!key) {
    console.warn(
      `В функцию форматтера передан некорректный ключ. Ключ отсутствует или пустой.
      value: ${value}, type: ${type}
      Стек вызова:
      ${getCallerStack()}`
    )
    return value || ''
  }

  if (key.toLowerCase().includes('price')) {
    return formatCurrency(value)
  }

  switch (type) {
    case 'bool':
      return formatBoolean(value)
    case 'integer':
    case 'int':
    case 'float':
      return formatNumber(value)
    case 'string':
      return formatText(value)
    case 'date':
      return formatDate(value)
    case 'timestamp':
      return formatTimestamp(value)
    case 'NULL':
      return ''
    default:
      console.warn(
        `Неизвестный тип данных "${type}" для ключа "${key}".\nvalue: ${value}`
      )
      console.groupCollapsed('Показать стек вызова')
      console.log(getCallerStack())
      console.groupEnd()

      return value || ''
  }
}

// Вспомогательные функции:

/**
 * Форматирует булевое значение.
 *
 * @param {boolean} value - Значение true или false.
 * @returns {string} - '✅' для true, пустая строка для false.
 */
function formatBoolean(value) {
  return value ? '✅' : ''
}

/**
 * Форматирует числовое значение.
 *
 * @param {number|string} value - Число или строка, содержащая число.
 * @param {boolean} [isPrice=false] - Если true, форматируется как цена с двумя знаками после запятой.
 * @returns {string} - Отформатированное число с разделением тысяч.
 */
function formatNumber(value, isPrice = false) {
  const numberValue = Number(value)

  if (!isFinite(numberValue)) {
    return '0' // Возвращаем "0" для некорректных значений
  }

  const formatted = numberValue
    .toFixed(isPrice ? 2 : 0) // Для цены — 2 знака после запятой
    .replace(/\B(?=(\d{3})+(?!\d))/g, '\u202F') // Разделение тысяч
    .replace('.', ',') // Замена точки на запятую

  return isPrice || !formatted.endsWith(',00')
    ? formatted
    : formatted.slice(0, -3) // Убираем ",00" для целых чисел
}

/**
 * Форматирует текстовое значение.
 *
 * @param {string|number} value - Значение для форматирования.
 * @returns {string} - Отформатированное значение, email преобразуется в ссылку.
 */
function formatText(value) {
  if (typeof value === 'number') {
    return formatNumber(value)
  } else if (typeof value === 'string' && isEmail(value)) {
    return `<a href="mailto:${value}">${value}</a>`
  } else {
    return value || ''
  }
}

/**
 * Проверяет, является ли строка email.
 *
 * @param {string} value - Строка для проверки.
 * @returns {boolean} - true, если строка является email.
 */
function isEmail(value) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(value)
}

/**
 * Форматирует дату.
 *
 * @param {string|Date} value - Дата в строковом формате или объект Date.
 * @returns {string} - Дата в формате DD.MM.YYYY.
 */
function formatDate(value) {
  return value ? moment(value).format('DD.MM.YYYY') : ''
}

/**
 * Форматирует метку времени.
 *
 * @param {string|Date} value - Дата и время.
 * @returns {string} - Метка времени в формате DD.MM.YYYY HH:mm.
 */
function formatTimestamp(value) {
  return value ? moment(value).format('DD.MM.YYYY HH:mm') : ''
}

/**
 * Форматирует значение как валюту (рубли).
 *
 * @param {number|string} value - Число или строка, содержащая число.
 * @returns {string} - Значение в формате "1 234,00 ₽".
 */
function formatCurrency(value) {
  return `${formatNumber(value, true)}\u00A0₽` // Используем `formatNumber` с isPrice = true
}

function isObject(value) {
  return value && typeof value === 'object' && !Array.isArray(value)
}
