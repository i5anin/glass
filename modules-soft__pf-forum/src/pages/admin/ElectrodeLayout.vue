<template>
  <div class="w-75">
    <svg width="100%" height="400" viewBox="0 0 200 250" preserveAspectRatio="xMidYMid meet">
      <!-- Координатная сетка -->
      <line x1="0" y1="250" x2="200" y2="250" stroke="gray" stroke-dasharray="5,5" /> <!-- Ось X -->
      <line x1="100" y1="10" x2="100" y2="250" stroke="gray" stroke-dasharray="5,5" /> <!-- Ось Y -->

      <!-- Печь -->
      <rect
        :x="scaleX(-furnace.dimensions.length / 2)"
        :y="scaleY(furnace.dimensions.height)"
        :width="furnace.dimensions.length * 2"
        :height="furnace.dimensions.height * scaleFactorY"
        fill="rgba(255, 165, 0, 0.3)"
        stroke="orange"
        stroke-width="1"
      />

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
        :x="scaleX(electrode.U) + 4"
        :y="scaleY(electrode.V) - 4"
        font-size="5"
        fill="black"
      >
        {{ index + 1 }} ({{ electrode.U }}, {{ electrode.V }})
      </text>

      <!-- Подписи координатной системы -->
      <text x="190" y="245" font-size="10" fill="black">X</text>
      <text x="105" y="20" font-size="10" fill="black">Y</text>
    </svg>
  </div>
</template>

<script setup>
import { useFurnaceStore } from "./furnaceStore";

// Получение данных из стора
const { furnace } = useFurnaceStore();

// Коэффициенты масштабирования
const scaleFactorX = 2; // Масштаб по оси X
const scaleFactorY = 2; // Масштаб по оси Y

// Определяем максимальную высоту для смещения координат
const maxHeight = furnace.dimensions.height;

// Функции масштабирования
const scaleX = (x) => x * scaleFactorX + 100; // Масштабируем и добавляем смещение
const scaleY = (y) => 250 - y * scaleFactorY; // Масштабируем от нижней границы SVG
</script>
