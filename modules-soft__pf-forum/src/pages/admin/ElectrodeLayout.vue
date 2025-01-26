<template>
  <div class="w-75">
    <svg width="100%" height="300" viewBox="0 0 200 200" preserveAspectRatio="xMidYMid meet">
      <!-- Координатная сетка -->
      <line x1="0" y1="100" x2="200" y2="100" stroke="gray" stroke-dasharray="5,5" /> <!-- Ось X -->
      <line x1="100" y1="0" x2="100" y2="200" stroke="gray" stroke-dasharray="5,5" /> <!-- Ось Y -->

      <!-- Электроды -->
      <circle
        v-for="(electrode, index) in furnace.electrodes"
        :key="'electrode-' + index"
        :cx="scaleX(electrode.U)"
        :cy="scaleY(electrode.V)"
        r="5"
        fill="blue"
      />
      <!-- Подписи электродов -->
      <text
        v-for="(electrode, index) in furnace.electrodes"
        :key="'label-' + index"
        :x="scaleX(electrode.U) + 5"
        :y="scaleY(electrode.V) - 5"
        font-size="6"
        fill="black"
      >
        {{ index + 1 }} ({{ electrode.U }}, {{ electrode.V }})
      </text>

      <!-- Подписи координатной системы -->
      <text x="190" y="105" font-size="12" fill="black">X</text>
      <text x="105" y="10" font-size="12" fill="black">Y</text>
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
