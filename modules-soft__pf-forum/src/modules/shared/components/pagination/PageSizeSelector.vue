<template>
  <div class="d-flex align-items-center gap-2">
    <label for="pageSizeSelector" class="form-label mb-0">
      Показать на странице:
    </label>
    <select
      id="pageSizeSelector"
      class="form-select form-select-sm w-auto"
      :value="modelValue"
      @change="handleChange"
    >
      <option v-for="size in pageSizes" :key="size" :value="size">
        {{ size }}
      </option>
    </select>
  </div>
</template>

<script>
export default {
  props: {
    pageSizes: { type: Array, required: true },
    modelValue: { type: Number, required: true },
  },
  emits: ['update:modelValue', 'page-size-change'],
  methods: {
    handleChange(event) {
      const newValue = parseInt(event.target.value, 10)
      this.$emit('update:modelValue', newValue)
      this.$emit('page-size-change', newValue)
    },
  },
}
</script>
