/**
 * Конфигурация исключений:
 * - excludedKeys: Точные ключи, которые нужно исключить.
 * - patterns: Шаблоны для частичного совпадения ключей.
 */
const exclusionConfig = {
  excludedKeys: [
    'specs_op_id',
    'color',
    'comments',
    'exp',
    'goz',
    'is_sbor',
    'kp_data__id',
    'kp_data__total_price_det',
    'kp_list__id',
    'ordersnom__metall_price_total_det',
    'ordersnom__status_cal',
    'ordersnom_id',
    'sbor_orders__id',
    'specs__spec_no',
    'zag_tech_material_id',
    'ordersnom__id',
    'zag_buy_p1',
    'zag_buy_p2',
    'zag_buy_p3',
    'zag_buy_p4',
    'zag_buy_weight',
    'nom_id_nom',
    'kp_list__id',
    'kp_data__id',
    'orders__comments',
    'link_id',
    'instr_price_sum',
  ],
  patterns: [/status/, /specs_nom__status_/, /comment/, /ordersnom__status_/], // Регулярные выражения для поиска в ключах
}

/**
 * Обрабатывает массив объектов fields, изменяя permissions.read на true
 * для всех объектов, кроме указанных в исключениях.
 *
 * @param {Array} fields - Массив объектов с полями.
 * @param {Object} config - Конфигурация исключений.
 * @returns {Array} - Новый массив объектов с изменениями.
 */
export function processFields(fields, config = exclusionConfig) {
  const { excludedKeys, patterns } = config

  if (!Array.isArray(fields)) {
    console.error(
      'processFields: Ожидается массив объектов, но получено:',
      fields
    )
    throw new Error('processFields: Expected an array of fields')
  }

  return fields.map((field) => {
    if (typeof field !== 'object' || field === null) {
      console.error('Некорректное поле:', field)
      throw new Error('processFields: Field is not a valid object')
    }

    // Проверка на точное совпадение ключа
    if (excludedKeys.includes(field.key)) {
      return { ...field, modified: false }
    }

    // Проверка на совпадение с шаблонами
    if (patterns.some((pattern) => pattern.test(field.key))) {
      return { ...field, modified: false }
    }

    // Если поле содержит permissions, изменяем read и помечаем как modified
    if (field.permissions) {
      return {
        ...field,
        permissions: {
          ...field.permissions,
          read: true,
        },
        modified: true,
      }
    }
    console.log({ ...field, modified: false })
    return { ...field, modified: false }
  })
}
