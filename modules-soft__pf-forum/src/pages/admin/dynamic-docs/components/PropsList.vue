<template>
  <ul class="list-group">
    <li
      v-for="prop in propsList"
      :key="prop.name"
      class="list-group-item"
    >
      <strong :title="JSON.stringify(prop)">{{ prop.name }}</strong>
      <span v-if="prop.type">(тип: {{ prop.type }})</span>
      <span v-if="prop.default" class="text-muted">
        - значение по умолчанию: {{ prop.default }}
      </span>
    </li>
  </ul>
</template>

<script setup>
const props = defineProps({
  propsList: {
    type: Array,
    required: true,
  },
});
</script>

<style scoped>
/* Стили, если нужны */
</style>
