<template>
  <div @click="handleFormClick" style="cursor: pointer">
    <!-- Заголовок -->
    <div class="field-label d-flex align-items-center">
      <span>{{ field.title }}</span>
      <font-awesome-icon
        v-if="['zag_nom', 'zag_tech'].includes(field.key)"
        @click.stop="handleIconClick(field.key)"
        :icon="['fas', 'circle-info']"
        :style="{ color: 'green', cursor: 'pointer' }"
        class="icon-sm ms-2 me-2"
        data-bs-toggle="tooltip"
        title="Дополнительная информация заготовки"
      />
    </div>

    <!-- Значение -->
    <div
      class="field-value"
      :style="{ color: formattedValue ? '' : '#d8d8d8' }"
    >
      <span v-if="!isBoolean" @click.stop="handleFormClick">
        {{ formattedValue || 'Нет данных' }}
      </span>
      <div v-else class="form-check form-switch d-inline-block me-3">
        <input
          type="checkbox"
          :checked="value"
          class="form-check-input"
          disabled
        />

        <label class="form-check-label">{{ field.name }}</label>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'
import { FontAwesomeIcon } from '@/utils/icons.js'
import { formatValue } from '@/utils/formatters.js'

export default {
  components: { FontAwesomeIcon },
  props: {
    field: { type: Object, required: true },
    value: { type: [String, Boolean, Number, Date], required: true },
  },
  emits: ['field-click', 'icon-click'],
  setup(props, { emit }) {
    const isBoolean = computed(() => typeof props.value === 'boolean')

    const formattedValue = computed(() =>
      formatValue(props.value, props.field.type, props.field.key)
    )

    const handleIconClick = (key) => {
      emit('icon-click', key)
    }

    const handleFormClick = () => {
      emit('field-click', props.field.key)
    }

    return { isBoolean, formattedValue, handleIconClick, handleFormClick }
  },
}
</script>

<style scoped>
.field-label {
  font-size: 0.8rem;
  color: #212529;
  font-weight: 600;
}

.field-value {
  font-size: 1rem;
  color: #495057;
}
</style>
