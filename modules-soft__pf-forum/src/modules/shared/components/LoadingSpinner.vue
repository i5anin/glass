<template>
  <div
    class="d-flex justify-content-center align-items-center"
    :style="{ padding: padding }"
  >
    <div class="spinner-border" style="width: 3rem; height: 3rem" role="status">
      <span class="visually-hidden">Загрузка...</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LoadingSpinner',
  props: {
    padding: {
      type: String,
      default: '35vh 0', // Отступы по умолчанию
    },
  },
}
</script>
