<template>
  <div class="alert alert-warning warning-overlay" role="alert">
    {{ message }}
  </div>
</template>

<script>
export default {
  name: 'WarningMessage',
  props: {
    message: {
      type: String,
      required: true,
    },
  },
}
</script>

<style scoped>
.alert {
  font-size: 1rem;
  padding: 1rem;
  border: 1px solid #ffc107;
  background-color: #fff3cd;
  color: #856404;
  border-radius: 0.25rem;
}

.warning-overlay {
  position: fixed;
  top: 1rem;
  right: 1rem;
  z-index: 1050;
}
</style>
