<template>
  <div>
    <!-- Индикатор загрузки -->
    <LoadingSpinner v-if="loading" :padding="'35vh 0'" />

    <!-- Таблица -->
    <div v-else>
      <table class="table table-striped table-bordered table-hover">
        <thead>
          <tr>
            <th
              v-if="showStatusColumn"
              :style="{ fontSize: '0.90rem', width: '50px' }"
            >
              Статусы
            </th>
            <th
              v-for="column in filteredFields"
              :key="column.name"
              @click="handleSort(column)"
              :style="{ fontSize: '0.90rem' }"
            >
              {{ column.title }}
              <span v-if="column.sortable">
                <i
                  v-if="sortColumn === column.name && sortItem === 'asc'"
                  class="bi bi-caret-up-fill"
                ></i>
                <i
                  v-else-if="sortColumn === column.name && sortItem === 'desc'"
                  class="bi bi-caret-down-fill"
                ></i>
              </span>
            </th>
            <th v-if="editButton" title="Колонка редактировать"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="!items.length">
            <td colspan="100%" class="text-center">Нет данных</td>
          </tr>
          <tr
            v-for="row in items"
            :key="row.id"
            @click="emit('row-click', row)"
            :class="{ locked: row.locked, 'table-success': row.goz }"
          >
            <td v-if="showStatusColumn">
              <StatusDisplay :row="row" />
            </td>
            <td
              v-for="field in filteredFields"
              :key="field.name"
              :style="{ textAlign: getTextAlignment(field.type, field.name) }"
            >
              <span
                v-html="formatValue(row[field.name], field.type, field.name)"
              />
            </td>

            <td @click.stop="openEditModal(row)" v-if="editButton">
              <button class="btn btn-sm">
                <i class="bi bi-pencil-fill" style="color: gray"></i>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <EditModal
        v-if="editButton"
        :visible="isModalVisible"
        :row="selectedRow"
        :headers="headers"
        title="Редактирование строки"
        @close="closeModal"
        @save="saveRowChanges"
      />
    </div>
  </div>
</template>

<script setup>
import { computed, defineEmits, defineProps, ref } from 'vue'
import LoadingSpinner from '@/modules/shared/components/LoadingSpinner.vue'
import StatusDisplay from '@/modules/shared/components/StatusDisplay.vue'
import EditModal from './EditModal.vue'

const props = defineProps({
  headers: { type: Array, required: true },
  items: { type: Array, required: true },
  excluded: { type: Array, default: () => [] },
  sortColumn: { type: String, required: true },
  sortItem: { type: String, required: true },
  formatValue: { type: Function, required: true },
  getTextAlignment: { type: Function, default: () => 'left' },
  editButton: { type: Boolean, default: false },
})

const emit = defineEmits(['row-click', 'sort-change'])

const loading = ref(false)
const isModalVisible = ref(false)
const selectedRow = ref(null)

const normalizedHeaders = computed(() =>
  props.headers.map((header) => ({
    ...header,
    permissions: header.permissions || { read: true },
  }))
)

const filteredFields = computed(() => {
  return normalizedHeaders.value.filter(
    (header) => !props.excluded.includes(header.name) && header.permissions.read
  )
})

const showStatusColumn = computed(() => {
  const firstItem = props.items[0]
  return (
    firstItem &&
    Object.keys(firstItem).some((key) => key.toLowerCase().includes('status'))
  )
})

const handleSort = (column) => {
  if (column.sortable) emit('sort-change', column.name)
}

const openEditModal = (row) => {
  selectedRow.value = row
  isModalVisible.value = true
}

const closeModal = () => {
  isModalVisible.value = false
  selectedRow.value = null
}

const saveRowChanges = (updatedRow) => {
  console.log('Сохранено:', updatedRow)
  closeModal()
}
</script>

<style>
.table th,
.table td {
  min-width: 8px;
  max-width: 300px;
  word-wrap: break-word;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
