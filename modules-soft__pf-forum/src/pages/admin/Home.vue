<template>
  <div class="mt-4">
    <h3>Дано:</h3>

    <div class="d-flex flex-wrap">
      <!-- Таблицы для ввода данных -->
      <div class="table-responsive w-50">
        <table class="table table-sm">
          <thead>
          <tr>
            <th>Параметр</th>
            <th>Значение</th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td>Размеры печи</td>
            <td>
              <div>
                <input v-model.number="furnace.dimensions.length" type="number" class="form-control form-control-sm" /> м
              </div>
              <div>
                <input v-model.number="furnace.dimensions.height" type="number" class="form-control form-control-sm" /> м
              </div>
              <div>
                <input v-model.number="furnace.dimensions.resistance" type="number" class="form-control form-control-sm" step="0.001" /> Ом·м
              </div>
            </td>
          </tr>
          <tr>
            <td>Координаты электродов</td>
            <td>
              <div v-for="(value, index) in furnace.electrodes.U" :key="'coord-' + index" class="d-flex gap-2">
                <input v-model.number="furnace.electrodes.U[index]" type="number" class="form-control form-control-sm" /> м
                <input v-model.number="furnace.electrodes.V[index]" type="number" class="form-control form-control-sm" /> м
              </div>
            </td>
          </tr>
          <tr>
            <td>Радиусы и длины</td>
            <td>
              <div v-for="(value, index) in furnace.electrodes.radii" :key="'radius-' + index" class="d-flex gap-2">
                <input v-model.number="furnace.electrodes.radii[index]" type="number" class="form-control form-control-sm" /> м
                <input v-model.number="furnace.electrodes.lengths[index]" type="number" class="form-control form-control-sm" /> м
              </div>
            </td>
          </tr>
          <tr>
            <td>Электрические параметры</td>
            <td>
              <div>
                <input v-model.number="furnace.electricParams.groups" type="number" class="form-control form-control-sm" />
              </div>
              <div>
                <input v-model.number="furnace.electricParams.initialVoltage" type="number" class="form-control form-control-sm" step="0.1" /> В
              </div>
              <div>
                <input v-model.number="furnace.electricParams.initialPower" type="number" class="form-control form-control-sm" /> Вт
              </div>
            </td>
          </tr>
          </tbody>
        </table>
      </div>

      <!-- Рисование расположения электродов -->
      <div class="w-50">
        <svg width="100%" height="300">
          <circle v-for="(value, index) in furnace.electrodes.U"
                  :key="'electrode-' + index"
                  :cx="furnace.electrodes.U[index] + 150"
                  :cy="furnace.electrodes.V[index]"
                  r="5" fill="blue" />
          <text x="10" y="10" font-size="16" fill="black">Расположение электродов</text>
        </svg>
      </div>
    </div>

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
import { reactive, computed } from "vue";

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

const solution = computed(() => {
  const r = furnace.electrodes.radii[0];
  const l = furnace.electrodes.lengths[0];
  const electrodeVolume = Math.PI * r ** 2 * l;

  const P1 = -45.9 * -814;
  const P2 = -45.9 * 944;
  const P3 = -79.5 * 941;
  const totalPower = P1 + P2 + P3;

  return {
    electrodeVolume: electrodeVolume.toFixed(6),
    totalPower: totalPower.toFixed(1),
  };
});
</script>

<style scoped>
.table td, .table th {
  vertical-align: middle;
}
</style>
