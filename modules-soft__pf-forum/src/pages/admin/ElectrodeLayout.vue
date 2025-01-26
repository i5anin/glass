<template>
  <div class="w-75">
    <svg
      :width="svgWidth"
      :height="svgHeight"
      :viewBox="dynamicViewBox"
      preserveAspectRatio="xMidYMid meet"
    >
      <!-- Координатная сетка -->
      <line
        :x1="-maxAxis - padding"
        :y1="0"
        :x2="maxAxis + padding"
        :y2="0"
        stroke="gray"
        stroke-dasharray="5,5"
      /> <!-- Ось X -->
      <line
        :x1="0"
        :y1="-maxAxis - padding"
        :x2="0"
        :y2="maxAxis + padding"
        stroke="gray"
        stroke-dasharray="5,5"
      /> <!-- Ось Y -->

      <!-- Электроды -->
      <circle
        v-for="(electrode, index) in furnace.electrodes"
        :key="'electrode-' + index"
        :cx="electrode.U"
        :cy="-electrode.V"
        r="5"
        fill="blue"
      />
      <!-- Подписи электродов -->
      <text
        v-for="(electrode, index) in furnace.electrodes"
        :key="'label-' + index"
        :x="electrode.U + 5"
        :y="-electrode.V - 5"
        font-size="5"
        fill="black"
      >
        {{ index + 1 }} ({{ electrode.U }}, {{ electrode.V }})
      </text>

      <!-- Подписи координатной системы -->
      <text :x="maxAxis + padding - 10" :y="10" font-size="10" fill="black">X</text>
      <text :x="10" :y="-maxAxis - padding + 10" font-size="10" fill="black">Y</text>
    </svg>
  </div>
</template>

<script setup>
import { useFurnaceStore } from "./furnaceStore";

// Получение данных из стора
const { furnace } = useFurnaceStore();

// Находим максимальное значение по модулю для осей
const maxU = Math.max(...furnace.electrodes.map((e) => Math.abs(e.U)));
const maxV = Math.max(...furnace.electrodes.map((e) => Math.abs(e.V)));

// Устанавливаем максимальное значение для осей и отступы
const maxAxis = Math.max(maxU, maxV);
const padding = 20; // Отступы для красоты

// Размеры SVG
const svgWidth = 400;
const svgHeight = 400;

// Динамический viewBox
const dynamicViewBox = `${-maxAxis - padding} ${-maxAxis - padding} ${2 * (maxAxis + padding)} ${2 * (maxAxis + padding)}`;
</script>
