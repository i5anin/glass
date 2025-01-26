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

    <DataTable
      :headers="headers"
      :items="items"
      :sortColumn="sortColumn"
      :sortItem="sortItem"
      :formatValue="formatValue"
      :edit-button="editButton"
      :getTextAlignment="getTextAlignment"
      @row-click="handleRowClick"
      @sort-change="sortBy"
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

<script>
import { computed, ref } from 'vue'
import moment from 'moment'
import SearchBar from '@/modules/shared/components/search/SearchBar.vue'
import Pagination from '@/modules/shared/components/pagination/Pagination.vue'
import PageSizeSelector from '@/modules/shared/components/pagination/PageSizeSelector.vue'
import DataTable from './ComponentTable.vue'
import DateRangeFilters from '@/modules/shared/components/forms/DateRangeFilters.vue'
import { formatValue, getTextAlignment } from '@/utils/formatters.js'

export default {
  name: 'ServerSideTable',
  components: {
    DataTable,
    SearchBar,
    Pagination,
    PageSizeSelector,
    DateRangeFilters,
  },
  props: {
    items: { type: Array, required: true },
    headers: { type: Array, required: true },
    excluded: { type: Array, default: () => [] },
    itemsPerPageOptions: { type: Array, default: () => [15, 30, 50, 100] },
    totalPages: { type: Number, required: true },
    totalCount: { type: Number, required: true },
    currentPage: { type: Number, required: true },
    sortColumn: { type: String, default: '' },
    sortItem: { type: String, default: '' },
    itemsPerPage: { type: Number, required: true },
    datepicker: { type: Boolean, default: false },
    startDate: { type: String, default: '' },
    endDate: { type: String, default: '' },
    editButton: { type: Boolean, default: false },
  },
  emits: [
    'row-click',
    'page-change',
    'sort-change',
    'page-size-change',
    'search-change',
    'date-range-change',
  ],
  setup(props, { emit }) {
    const localItemsPerPage = ref(props.itemsPerPage)
    const localStartDate = ref(
      props.startDate ? moment(props.startDate).toDate() : null
    )
    const localEndDate = ref(
      props.endDate ? moment(props.endDate).toDate() : null
    )
    const loading = ref(false)

    const pageSizes = computed(() => props.itemsPerPageOptions)

    const filteredHeaders = computed(() =>
      props.headers.filter((header) => !props.excluded.includes(header.name))
    )

    const totalCnt = computed(() => props.totalCount)
    const currentPg = computed(() => props.currentPage)
    const totalPg = computed(() => props.totalPages)

    const sortBy = (column) => {
      const isAsc = props.sortColumn === column && props.sortItem === 'asc'
      emit('sort-change', { column, item: isAsc ? 'desc' : 'asc' })
    }

    const handleRowClick = (row) => emit('row-click', row)

    const updateItemsPerPage = (value) => {
      localItemsPerPage.value = value
      emit('page-size-change', value)
    }

    const updateDateRange = () => {
      emit('date-range-change', {
        startDate: localStartDate.value
          ? moment(localStartDate.value).format('YYYY-MM-DD')
          : '',
        endDate: localEndDate.value
          ? moment(localEndDate.value).format('YYYY-MM-DD')
          : '',
      })
    }

    const updateStartDate = (value) => {
      localStartDate.value = value
      updateDateRange()
    }

    const updateEndDate = (value) => {
      localEndDate.value = value
      updateDateRange()
    }

    const onSearch = (query) => {
      loading.value = true
      emit('search-change', query)
      setTimeout(() => (loading.value = false), 500)
    }

    const goToPage = (page) => emit('page-change', page)

    return {
      pageSizes,
      localItemsPerPage,
      localStartDate,
      localEndDate,
      filteredHeaders,
      loading,
      totalCnt,
      currentPg,
      totalPg,
      sortBy,
      handleRowClick,
      updateItemsPerPage,
      updateStartDate,
      updateEndDate,
      onSearch,
      goToPage,
      formatValue,
      getTextAlignment,
    }
  },
}
</script>
