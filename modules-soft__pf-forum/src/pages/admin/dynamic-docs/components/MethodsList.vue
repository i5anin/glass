<template>
  <div>
    <div v-if="ownMethods.length" class="mb-3">
      <h5>*Собственные методы</h5>
      <ul class="list-group">
        <li
          v-for="method in ownMethods"
          :key="method"
          class="list-group-item"
        >
          {{ method }}
        </li>
      </ul>
    </div>
    <div v-if="externalMethods.length" class="mb-3">
      <h5>Внешние методы</h5>
      <ul class="list-group">
        <li
          v-for="method in externalMethods"
          :key="method"
          class="list-group-item"
        >
          {{ method }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  ownMethods: {
    type: Array,
    required: true,
  },
  externalMethods: {
    type: Array,
    required: true,
  },
});
</script>

<style scoped>
/* Стили, если нужны */
</style>
