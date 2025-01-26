<template>
  <div class="w-50">
    <svg width="70%" height="300">
      <circle
        v-for="(value, index) in furnace.electrodes.U"
        :key="'electrode-' + index"
        :cx="furnace.electrodes.U[index] + 150"
        :cy="furnace.electrodes.V[index]"
        r="5"
        fill="blue"
      />
      <text x="10" y="10" font-size="16" fill="black">Расположение электродов</text>
    </svg>
  </div>
</template>

<script setup>
import { defineProps } from "vue";

const props = defineProps({
  furnace: Object,
});
</script>
