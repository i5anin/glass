<template>
  <div class="w-75">
    <svg width="100%" height="300" viewBox="0 0 200 200" preserveAspectRatio="xMidYMid meet">
      <circle
        v-for="(value, index) in furnace.electrodes.U"
        :key="'electrode-' + index"
        :cx="scaleX(furnace.electrodes.U[index])"
        :cy="scaleY(furnace.electrodes.V[index])"
        r="5"
        fill="blue"
      />
      <text x="10" y="20" font-size="16" fill="black">Расположение электродов</text>
    </svg>
  </div>
</template>

<script setup>
import { useFurnaceStore } from "./furnaceStore";

// Получение данных из стора
const { furnace } = useFurnaceStore();

// Функции масштабирования
const scaleX = (x) => x * 2 + 100; // Масштабируем и добавляем смещение
const scaleY = (y) => 200 - y * 2; // Масштабируем и инвертируем ось Y
</script>
