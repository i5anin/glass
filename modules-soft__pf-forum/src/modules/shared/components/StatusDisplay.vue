<template>
  <div v-if="hasStatuses" class="status-display">
    <span
      :title="statusObj.description"
      v-for="(statusObj, index) in formattedStatuses"
      :key="index"
      :class="['badge', statusObj.badgeClass || 'bg-black']"
    >
      {{ statusObj.label }}
    </span>
  </div>
</template>

<script setup>
import { computed, defineProps, defineEmits } from 'vue'
import { statuses } from '@/modules/shared/logic/statuses.js'

const props = defineProps({
  row: {
    type: Object,
    required: true,
  },
})

const emit = defineEmits(['statusFound'])

// Форматируем статусы, проверяя окончание ключей
const formattedStatuses = computed(() => {
  return statuses
    .map((statusObj) => {
      const rowKey = Object.keys(props.row).find((key) =>
        key.endsWith(statusObj.suffix)
      )
      if (rowKey && statusObj.suffix === '_otgruzka') {
        emit('statusFound', {
          suffix: '_otgruzka',
          key: rowKey,
          value: props.row[rowKey],
        })
      }
      return rowKey
        ? {
            ...statusObj,
            key: rowKey,
            badgeClass: statusObj.badgeClass || 'bg-black', // Устанавливаем чёрный цвет по умолчанию
          }
        : null
    })
    .filter(
      (statusObj) =>
        statusObj &&
        props.row[statusObj.key] &&
        String(props.row[statusObj.key]).trim() !== ''
    )
})

// Проверяем, есть ли хотя бы один статус
const hasStatuses = computed(() => formattedStatuses.value.length > 0)
</script>

<style scoped>
.status-display {
  display: flex;
  gap: 3px;
  justify-content: center;
  align-items: center;
  height: 100%;
}

.badge {
  padding: 5px;
  border-radius: 4px;
}

.bg-black {
  background-color: black;
  color: white;
}
</style>
