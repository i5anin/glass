<template>
  <div>
    <div class="grid-container">
      <div :class="{ collapsed: isCollapsed }">
        <OrderInfoCard :header="headerData" />
      </div>

      <div class="sbor-main">
        <SborMain
          v-if="nomTableData.length > 0"
          :table-data="nomTableData"
          :table-fields="filteredTableFields"
          :detail="detail"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, defineProps, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

import { getNomById } from './api/nom_list.js'
import OrderInfoCard from '@/modules/form-2-card-noms/components/Form2Card.vue'
import { useRoleStore } from '@/modules/_main/store/index.js'
import SborMain from '@/modules/shared/tables/sborka/SborMain.vue'
import { processFields } from '@/utils/dev/fieldsProcessor.js'

// Пропсы
const props = defineProps({
  type: { type: String, required: true },
  route: { type: String, required: true },
})

// Маршруты и стор
const router = useRouter()
const roleStore = useRoleStore()

// Реактивные переменные
const nomTableData = ref([])
const headerData = ref({})
const tableFields = ref({})
const isCollapsed = ref(false)

// Вычисляемые свойства
const selectedRole = computed(() => roleStore.selectedRole)

const detail = computed(() => ({
  route: props.route,
  idKey: 'link_id',
}))

const fetchOrderData = async () => {
  const link_id = router.currentRoute.value.params.id
  const queryParams = {
    id: link_id,
    type: props.type,
    module: selectedRole.value,
  }
  try {
    const { header, table } = await getNomById(queryParams)
    headerData.value = header

    // Обработка fields через processFields
    const processedFields = processFields(
      Object.entries(table.fields).map(([key, field]) => ({
        key,
        ...field,
      }))
    )

    // Преобразуем обратно в объект
    tableFields.value = processedFields.reduce((acc, field) => {
      acc[field.key] = { ...field }
      delete acc[field.key].key // Убираем ключ 'key' из результата
      return acc
    }, {})

    nomTableData.value = table.data
  } catch (error) {
    console.error('Ошибка при загрузке данных:', error)
  }
}

const filteredTableFields = computed(() => {
  return Object.entries(tableFields.value)
    .filter(([_, field]) => field.permissions?.read) // Только те, у кого read === true
    .map(([key, field]) => ({
      name: key,
      ...field,
    }))
})

// Инициализация данных
onMounted(fetchOrderData)
</script>

<style scoped>
.grid-container {
  display: grid;
  grid-template-columns: 270px 1fr;
  gap: 4px;
}
</style>
