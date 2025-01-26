<template>
  <div class="row">
    <div class="col-12">
      <ServerSideTable
        datepicker
        :headers="tableColumns"
        :items="items"
        :items-per-page-options="[15, 30, 50, 100]"
        :items-per-page="itemsPerPage"
        :current-page="currentPage"
        :total-pages="totalPages"
        :total-count="totalCount"
        :sort-column="sortColumn"
        :sort-item="sortItem"
        @row-click="navigateToRow"
        @page-change="updatePage"
        @sort-change="updateSort"
        @page-size-change="updatePageSize"
        @search-change="updateSearch"
        @date-range-change="updateDateRange"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { getItems } from '@/pages/form-1/api/list.js'
import ServerSideTable from '@/modules/shared/tables/table-server/ServerSideTable.vue'
import { useRoleStore } from '@/modules/_main/store/index.js'

const props = defineProps({
  type: { type: String, required: true },
  route: { type: String, required: true },
})

const items = ref([])
const tableFields = ref([])
const totalCount = ref(0)
const searchQuery = ref('')
const currentPage = ref(1)
const itemsPerPage = ref(15)
const sortColumn = ref('')
const sortItem = ref('')

const startDate = ref(null)
const endDate = ref(null)

const router = useRouter()
const roleStore = useRoleStore()

const totalPages = computed(() =>
  Math.ceil(totalCount.value / itemsPerPage.value)
)

const tableColumns = computed(() =>
  tableFields.value.map((field) => ({
    name: field.key,
    title: field.title,
    type: field.type,
    sortable: true,
    width: field.width,
    update: field.update,
  }))
)

const fetchItems = async () => {
  try {
    const response = await getItems({
      page: currentPage.value,
      limit: itemsPerPage.value,
      search: searchQuery.value,
      sortCol: sortColumn.value,
      sortDir: sortItem.value,
      date1: startDate.value,
      date2: endDate.value,
      type: props.type,
      module: roleStore.selectedRole,
    })

    if (response?.table) {
      const fields = Object.entries(response.table.fields)
        .filter(([_, field]) => field.permissions?.read) // Фильтруем только поля с read: true
        .map(([key, field]) => ({
          key,
          ...field,
        }))
      tableFields.value = fields
      items.value = response.table.data
      totalCount.value = response.header.total_count
    } else {
      resetData()
    }
  } catch (error) {
    console.error('Error fetching items:', error)
    resetData()
  }
}

const resetData = () => {
  items.value = []
  totalCount.value = 0
}

const navigateToRow = (row) => {
  router.push({ name: props.route, params: { id: row.link_id } })
}

const updatePage = (page) => {
  currentPage.value = page
  fetchItems()
}

const updateSort = ({ column, item }) => {
  sortColumn.value = column
  sortItem.value = item
  currentPage.value = 1
  fetchItems()
}

const updatePageSize = (size) => {
  itemsPerPage.value = size
  currentPage.value = 1
  fetchItems()
}

const updateSearch = (query) => {
  searchQuery.value = query
  currentPage.value = 1
  fetchItems()
}

const updateDateRange = ({ startDate: newStart, endDate: newEnd }) => {
  if (newStart) startDate.value = newStart
  if (newEnd) endDate.value = newEnd
  currentPage.value = 1
  fetchItems()
}

onMounted(fetchItems)
</script>

<style scoped>
.table tbody tr {
  cursor: pointer;
}

th.sortable {
  cursor: pointer;
}

th.sortable:hover {
  background-color: #f1f1f1;
}
</style>
