<template>
  <div class="row">
    <div class="col-12">
      <!-- Заголовок -->
      <h3 class="client-name mb-3">Список клиентов</h3>

      <!-- Таблица данных -->
      <ServerSideTable
        edit-button
        :items="clients || []"
        :headers="tableFields"
        :items-per-page-options="[15, 30, 50, 100]"
        :items-per-page="itemsPerPage"
        :current-page="currentPage"
        :total-pages="totalPages"
        :total-count="totalCount"
        :sort-column="sortColumn"
        :sort-order="sortOrder"
        @row-click="handleRowClick"
        @page-change="handlePageChange"
        @sort-change="handleSortChange"
        @page-size-change="handlePageSizeChange"
        @search-change="handleSearchChange"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { getClients } from '../form-1/api/clients.js'
import ServerSideTable from '@/modules/shared/tables/table-server/ServerSideTable.vue'
import { useRoleStore } from '@/modules/_main/store/index.js'

// Реактивные переменные
const clients = ref([])
const tableFields = ref([])
const currentPage = ref(1)
const itemsPerPage = ref(15)
const totalCount = ref(0)
const sortColumn = ref('')
const sortOrder = ref('')
const searchQuery = ref('')

// Вычисляемые свойства
const totalPages = computed(() =>
  Math.ceil(totalCount.value / itemsPerPage.value)
)

// Стор и роутер
const roleStore = useRoleStore()
const router = useRouter()

// Получение данных клиентов
const fetchClients = async () => {
  try {
    const response = await getClients({
      page: currentPage.value,
      limit: itemsPerPage.value,
      sortCol: sortColumn.value,
      sortDir: sortOrder.value,
      type: roleStore.selectedTypes,
      module: roleStore.selectedRole,
      search: searchQuery.value,
    })

    if (response && response.table) {
      clients.value = response.table.data || []

      // Фильтрация полей
      tableFields.value = Object.entries(response.table.fields || {})
        .filter(([, field]) => field.permissions?.read)
        .map(([key, field]) => ({
          name: key,
          title: field.title,
          width: field.width,
          type: field.type || 'string',
          permissions: field.permissions || { read: true, update: false },
        }))

      totalCount.value = response.header?.total_count || clients.value.length
    } else {
      clients.value = []
      totalCount.value = 0
    }
  } catch (error) {
    console.error('Ошибка при загрузке списка клиентов:', error)
    clients.value = []
    totalCount.value = 0
  }
}

// Обработчики событий
const handleRowClick = (row) => {
  router.push({
    name: 'Noms',
    params: { clientId: row.link_id },
  })
}

const handlePageChange = (page) => {
  currentPage.value = page
  fetchClients()
}

const handleSortChange = ({ column, order }) => {
  sortColumn.value = column
  sortOrder.value = order
  currentPage.value = 1
  fetchClients()
}

const handlePageSizeChange = (size) => {
  itemsPerPage.value = size
  currentPage.value = 1
  fetchClients()
}

const handleSearchChange = (search) => {
  searchQuery.value = search
  currentPage.value = 1
  fetchClients()
}

// Загрузка данных при монтировании
onMounted(fetchClients)
</script>

<style scoped>
.client-name {
  font-weight: bold;
}
</style>
