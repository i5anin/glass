<script setup>
import { ref, onMounted } from 'vue'
import { processFields } from '@/utils/dev/fieldsProcessor.js'

// Конфигурация колонок таблицы
const tableConfig = [
  { label: 'Заголовок', key: 'title' },
  { label: 'Ключ', key: 'key' },
  { label: 'Тип', key: 'type' },
  { label: 'Таблица обновления', key: 'update_table' },
  { label: 'create', key: 'permissions.create' },
  { label: 'read', key: 'permissions.read' },
  { label: 'update', key: 'permissions.update' },
  { label: 'delete', key: 'permissions.delete' },
]

// Возможные значения для типов и модулей
const types = ['orders', 'kp', 'specs']
const modules = ['managers', 'metrolog', 'omts', 'tech_calc']

// Коррекция модулей для `nom_list`:
const nomModules = {
  orders: modules, // Все модули
  kp: modules.filter((mod) => mod !== 'tech_calc'), // Исключаем `tech_calc`
  specs: modules, // Все модули
}

const allData = ref([]) // Данные для всех комбинаций type и module

const apilistUrl = 'http://api.pfforum/api/list'
const apinomUrl = 'http://api.pfforum/api/nom_list'

// Функция загрузки данных с API
const fetchAllData = async () => {
  const results = []

  // 1. Сначала запрашиваем данные для `list`
  for (const module of modules) {
    const moduleData = [] // Данные для одного модуля
    for (const type of types) {
      const queryParams = {
        page: 1,
        limit: 15,
        search: '',
        sortCol: '',
        sortDir: '',
        type: type,
        module: module,
      }
      const queryString = new URLSearchParams(queryParams).toString()
      const response = await fetch(`${apilistUrl}?${queryString}`)

      if (!response.ok) {
        console.error(
          `Ошибка при загрузке данных (list) для ${type} и ${module}`
        )
        continue
      }

      const data = await response.json()

      let fields = Object.entries(data.table.fields).map(([key, value]) => ({
        ...value,
        key, // Добавляем ключ как поле объекта
      }))
      fields = processFields(fields)

      moduleData.push({
        type,
        module,
        api: 'list',
        fields,
      })
    }
    results.push({ module, data: moduleData })
  }

  // 2. Затем запрашиваем данные для `nom_list`
  for (const type of types) {
    for (const module of nomModules[type]) {
      const queryParams = {
        id: 100,
        type: type,
        module: module,
      }
      const queryString = new URLSearchParams(queryParams).toString()
      const response = await fetch(`${apinomUrl}?${queryString}`)

      if (!response.ok) {
        console.error(
          `Ошибка при загрузке данных (nom_list) для ${type} и ${module}`
        )
        continue
      }

      const data = await response.json()

      let fields = Object.entries(data.table.fields).map(([key, value]) => ({
        ...value,
        key, // Добавляем ключ как поле объекта
      }))
      fields = processFields(fields)

      results
        .find((res) => res.module === module)
        .data.push({
          type,
          module,
          api: 'nom_list',
          fields,
        })
    }
  }

  allData.value = results
}

// Загружаем данные при монтировании компонента
onMounted(() => {
  fetchAllData()
})
</script>

<template>
  <div class="container mt-4">
    <h3 class="mb-4">Данные JSON по модулям и типам</h3>
    <div v-for="moduleGroup in allData" :key="moduleGroup.module" class="mb-5">
      <h4 class="text-primary">Модуль: {{ moduleGroup.module }}</h4>
      <div
        v-for="dataSet in moduleGroup.data"
        :key="`${dataSet.type}-${dataSet.api}`"
      >
        <h5 class="text-secondary">
          Тип: {{ dataSet.type }} ({{ dataSet.api }})
        </h5>
        <table class="table table-bordered">
          <thead>
            <tr>
              <th v-for="column in tableConfig" :key="column.key">
                {{ column.label }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="row in dataSet.fields"
              :key="row.key"
              :class="{
                'table-success': row.permissions?.read === true,
                'table-danger': row.modified,
              }"
            >
              <td v-for="column in tableConfig" :key="column.key">
                {{ getValueByPath(row, column.key) }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
/**
 * Возвращает значение из объекта по заданному пути (например, "permissions.read").
 * @param {Object} obj - Объект данных.
 * @param {String} path - Путь до значения (например, "permissions.read").
 * @returns {*} Значение или пустая строка, если путь не существует.
 */
function getValueByPath(obj, path) {
  return path
    .split('.')
    .reduce((o, key) => (o && o[key] !== undefined ? o[key] : ''), obj)
}
</script>

<style scoped>
h3 {
  margin-bottom: 20px;
}

h4 {
  margin-top: 30px;
}

table {
  font-family: Arial, sans-serif;
  font-size: 14px;
  width: 100%;
  text-align: left;
  border-collapse: collapse;
}

th,
td {
  border: 1px solid #ddd;
  padding: 10px;
}

th {
  background-color: #f4f4f4;
  text-align: left;
}

.table-success {
  background-color: #d4edda !important;
}

.table-danger {
  background-color: #f8d7da !important;
}
</style>
