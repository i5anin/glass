import { defineStore } from 'pinia'
import { sendBulkUpdate, handleError } from './update.js'

export const useTableStore = defineStore('tableStore', {
  state: () => ({
    tableData: [],
    pendingUpdates: [],
    isLoading: false,
    error: null,
  }),

  actions: {
    addPendingUpdate({ rowId, fieldName, oldValue, newValue, updateTable }) {
      const uniqueKey = `${rowId}_${fieldName}_${updateTable}`
      const existingIndex = this.pendingUpdates.findIndex(
        (update) => update.updateKey === uniqueKey
      )

      if (existingIndex === -1) {
        this.pendingUpdates.push({
          key: uniqueKey,
          id: rowId,
          fieldName,
          oldValue,
          newValue,
          updateTable,
        })
      } else {
        this.pendingUpdates[existingIndex] = {
          key: uniqueKey,
          id: rowId,
          fieldName,
          oldValue,
          newValue,
          updateTable,
        }
      }
    },

    async confirmUpdates() {
      try {
        const payload = this.pendingUpdates.map((update) => ({
          key: `${update.id}_${update.fieldName}_${update.updateTable}`,
          id: update.id,
          fieldName: update.fieldName,
          value: update.newValue,
          updateTable: update.updateTable,
        }))

        await sendBulkUpdate(payload)

        this.pendingUpdates = []
      } catch (err) {
        this.error = err.message || 'Ошибка подтверждения изменений'
        handleError(err)
      }
    },

    cancelUpdates() {
      this.pendingUpdates = []
    },
  },
})
