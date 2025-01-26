<template>
  <section class="mb-4">
    <h4 class="mb-2 d-flex justify-content-between align-items-center">
      {{ title }}
      <button class="btn btn-link" @click="toggle">
        {{ isCollapsed ? 'Развернуть' : 'Свернуть' }}
      </button>
    </h4>
    <div v-show="!isCollapsed">
      <slot></slot>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
});

const isCollapsed = ref(false);

const toggle = () => {
  isCollapsed.value = !isCollapsed.value;
};
</script>

<style scoped>
/* Стили, если нужны */
</style>
