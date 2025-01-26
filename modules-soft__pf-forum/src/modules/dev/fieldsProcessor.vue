<template>
  <div class="container">
    <div class="left">
      <h3>До преобразования</h3>
      <pre>{{ rawFields }}</pre>
    </div>
    <div class="right">
      <h3>После преобразования</h3>
      <pre>{{ processedFields }}</pre>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { processFields } from '@/utils/dev/fieldsProcessor.js'

const rawFields = ref('') // Поля до обработки
const processedFields = ref([]) // Поля после обработки

const apiListUrl = 'http://api.pfforum/api/list'

const fetchData = async () => {
  const queryParams = {
    page: 1,
    limit: 15,
    search: '',
    sortCol: '',
    sortDir: '',
    type: 'orders',
    module: 'managers',
  }

  const queryString = new URLSearchParams(queryParams).toString()
  const response = await fetch(`${apiListUrl}?${queryString}`)

  if (!response.ok) {
    console.error('Ошибка загрузки данных')
    return
  }

  const data = await response.json()
  const fields = Object.entries(data.table.fields).map(([key, value]) => ({
    ...value,
    key,
  }))

  rawFields.value = JSON.stringify(fields, null, 2) // Сохраняем исходные данные
  processedFields.value = processFields(fields) // Применяем обработку
}

onMounted(() => {
  fetchData()
})
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: row;
  gap: 20px;
}

.left,
.right {
  flex: 1;
  overflow: auto;
  padding: 10px;
  border: 1px solid #ddd;
  background-color: #f9f9f9;
  max-height: 100vh;
}

h3 {
  margin-bottom: 10px;
}

pre {
  white-space: pre-wrap;
  word-wrap: break-word;
}
</style>
