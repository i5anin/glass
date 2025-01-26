<template>
  <ul class="list-group">
    <li
      v-for="child in childrenList"
      :key="child.name || child.__file"
      class="list-group-item"
    >
      <InfoComponent :targetComponent="child" />
    </li>
  </ul>
</template>

<script setup>
import InfoComponent from '../InfoComponent.vue';

const props = defineProps({
  childrenList: {
    type: Array,
    required: true,
  },
});
</script>

<style scoped>
/* Стили, если нужны */
</style>
