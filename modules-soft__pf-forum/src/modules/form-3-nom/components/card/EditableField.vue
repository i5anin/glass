<template>
  <div>
    <div v-if="isTextarea" class="form-floating">
      <textarea
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
        :placeholder="field.title"
        class="form-control form-control-sm"
        :style="{ height: calculateHeight(String(modelValue)) + 'px' }"
        :id="`floatingTextarea-${field.name}`"
      ></textarea>
      <label :for="`floatingTextarea-${field.name}`">{{ field.title }}</label>
    </div>

    <div
      v-else-if="isCheckbox"
      class="form-check form-switch d-inline-block me-3"
    >
      <input
        type="checkbox"
        :checked="modelValue"
        @change="$emit('update:modelValue', $event.target.checked)"
        class="form-check-input"
        :id="`switch-${field.name}`"
      />
      <label class="form-check-label" :for="`switch-${field.name}`">
        {{ field.title }}
      </label>
    </div>

    <div v-else class="form-floating">
      <input
        type="text"
        :value="String(modelValue)"
        @input="$emit('update:modelValue', $event.target.value)"
        :placeholder="field.title"
        class="form-control form-control-sm"
        :id="`floatingInput-${field.name}`"
      />
      <label :for="`floatingInput-${field.name}`">{{ field.title }}</label>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { calculateHeight } from '../../utils/calculateHeight.js'
import '@/assets/FormFloatingField.css'

const props = defineProps({
  field: {
    type: Object,
    required: true,
  },
  modelValue: {
    type: [String, Boolean, Number],
    required: true,
  },
})

const isTextarea = computed(() => String(props.modelValue).length >= 40)
const isCheckbox = computed(() => typeof props.modelValue === 'boolean')
</script>
