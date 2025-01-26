<template>
  <div>
    <h3>Результаты:</h3>
    <table class="table table-sm">
      <thead>
      <tr>
        <th>Параметр</th>
        <th>Значение</th>
      </tr>
      </thead>
      <tbody>
      <tr>
        <td><strong>Объем каждого электрода:</strong></td>
        <td>{{ solution.electrodeVolume }} м³</td>
      </tr>
      <tr>
        <td><strong>Суммарная мощность:</strong></td>
        <td>{{ solution.totalPower }} Вт</td>
      </tr>
      <tr>
        <td><strong>Результирующее напряжение:</strong></td>
        <td>{{ furnace.results.voltage.U0 }} В</td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { useFurnaceStore } from "./furnaceStore";

const { furnace, solution } = useFurnaceStore();
</script>
