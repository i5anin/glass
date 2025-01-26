<template>
  <div class="mt-4">
    <FurnaceInput :furnace="furnace" />
    <ElectrodeLayout :furnace="furnace" />
    <FurnaceResults :furnace="furnace" />
  </div>
</template>

<script setup>
import { reactive } from "vue";
import FurnaceInput from "./FurnaceInput.vue";
import ElectrodeLayout from "./ElectrodeLayout.vue";
import FurnaceResults from "./FurnaceResults.vue";

const furnace = reactive({
  dimensions: {
    length: 71.0,
    height: 121.0,
    resistance: 0.300,
  },
  electrodes: {
    U: [-24.0, -8.0, 8.0, 24.0, -20.0, 20.0, -20.0, -10.0, -20.0, 20.0, 10.0, 20.0],
    V: [70.0, 70.0, 70.0, 70.0, 116.0, 116.0, 35.0, 22.5, 10.0, 35.0, 22.5, 10.0],
    radii: [0.25, 0.25, 0.25, 0.25, 0.25, 0.25, 0.25, 0.25, 0.25, 0.25, 0.25, 0.25],
    lengths: [5.0, 5.0, 5.0, 5.0, 5.0, 5.0, 5.0, 5.0, 5.0, 5.0, 5.0, 5.0],
  },
  electricParams: {
    groups: 7,
    initialVoltage: 100.0,
    initialPower: 200000.0,
  },
  results: {
    voltage: {
      U0: 91.828060,
      U12: [-45.9, -79.5],
      U23: [-45.9, 79.5],
    },
    current: {
      I1: [-814.0, 0.0, 814.0],
      I2: [-472.0, 944.0, -472.0],
      I3: [941.0, 944.0, 941.0],
    },
  },
});
</script>
