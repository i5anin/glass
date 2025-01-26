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
import { computed } from "vue";
import { defineProps } from "vue";

const props = defineProps({
  furnace: {
    type: Object,
    required: true,
  },
});

const solution = computed(() => {
  const r = props.furnace.electrodes.radii[0];
  const l = props.furnace.electrodes.lengths[0];
  const electrodeVolume = Math.PI * r ** 2 * l;

  const P1 = props.furnace.results.voltage.U12[0] * props.furnace.results.current.I1[0];
  const P2 = props.furnace.results.voltage.U12[1] * props.furnace.results.current.I2[1];
  const P3 = props.furnace.results.voltage.U23[1] * props.furnace.results.current.I3[2];
  const totalPower = P1 + P2 + P3;

  return {
    electrodeVolume: electrodeVolume.toFixed(6),
    totalPower: totalPower.toFixed(1),
  };
});
</script>
