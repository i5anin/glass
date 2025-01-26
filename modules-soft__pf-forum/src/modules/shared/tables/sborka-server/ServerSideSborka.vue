<template>
  <div>
    <div class="d-flex align-items-center justify-content-between mb-3">
      <PageSizeSelector
        :pageSizes="pageSizes"
        :modelValue="localItemsPerPage"
        @update:modelValue="updateItemsPerPage"
      />
      <DateRangeFilters
        v-if="datepicker"
        :start="localStartDate"
        :end="localEndDate"
        @update:start="updateStartDate"
        @update:end="updateEndDate"
      />
      <SearchBar :loading="loading" @search-change="onSearch" />
    </div>

    <SborMain
      :tableData="items"
      :tableFields="filteredHeaders"
      :detail="detail"
    />

    <Pagination
      :totalCount="totalCnt"
      :itemsPerPage="localItemsPerPage"
      :currentPage="currentPg"
      :totalPages="totalPg"
      @page-change="goToPage"
    />
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { formatISO } from 'date-fns'
import SearchBar from '@/modules/shared/components/search/SearchBar.vue'
import Pagination from '@/modules/shared/components/pagination/Pagination.vue'
import PageSizeSelector from '@/modules/shared/components/pagination/PageSizeSelector.vue'
import DateRangeFilters from '@/modules/shared/components/forms/DateRangeFilters.vue'
import SborMain from '../sborka/SborMain.vue'

const props = defineProps({
  items: { type: Array, required: true },
  headers: { type: Array, required: true },
  excluded: { type: Array, default: () => [] },
  itemsPerPageOptions: { type: Array, default: () => [15, 30, 50, 100] },
  totalPages: { type: Number, required: true },
  totalCount: { type: Number, required: true },
  currentPage: { type: Number, required: true },
  sortColumn: { type: String, default: '' },
  sortOrder: { type: String, default: 'asc' },
  itemsPerPage: { type: Number, required: true },
  datepicker: { type: Boolean, default: false },
  startDate: { type: String, default: '' },
  endDate: { type: String, default: '' },
  detail: {
    type: Object,
    required: true,
  },
})

const emit = defineEmits([
  'row-click',
  'page-change',
  'sort-change',
  'page-size-change',
  'search-change',
  'date-range-change',
])

const localItemsPerPage = ref(props.itemsPerPage)
const localStartDate = ref(props.startDate ? new Date(props.startDate) : null)
const localEndDate = ref(props.endDate ? new Date(props.endDate) : null)
const loading = ref(false)

const pageSizes = computed(() => props.itemsPerPageOptions)

const filteredHeaders = computed(() =>
  props.headers.filter((header) => !props.excluded.includes(header.name))
)

const totalCnt = computed(() => props.totalCount)
const currentPg = computed(() => props.currentPage)
const totalPg = computed(() => props.totalPages)

const sortBy = (column) => {
  const isAsc = props.sortColumn === column && props.sortOrder === 'asc'
  emit('sort-change', { column, order: isAsc ? 'desc' : 'asc' })
}

const handleRowClick = (row) => emit('row-click', row)

const updateItemsPerPage = (value) => {
  localItemsPerPage.value = value
  emit('page-change', 1)
  emit('page-size-change', value)
}

const updateStartDate = (value) => {
  localStartDate.value = value
  emit('date-range-change', {
    startDate: value ? formatISO(value, { representation: 'date' }) : '',
    endDate: localEndDate.value
      ? formatISO(localEndDate.value, { representation: 'date' })
      : '',
  })
}

const updateEndDate = (value) => {
  localEndDate.value = value
  emit('date-range-change', {
    startDate: localStartDate.value
      ? formatISO(localStartDate.value, { representation: 'date' })
      : '',
    endDate: value ? formatISO(value, { representation: 'date' }) : '',
  })
}

const onSearch = (query) => {
  loading.value = true
  emit('search-change', query)
  setTimeout(() => (loading.value = false), 500)
}

const goToPage = (page) => {
  emit('page-change', page)
}
</script>
