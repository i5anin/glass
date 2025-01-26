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
              <div class="d-flex gap-2">
                <input v-model.number="furnace.dimensions.length" type="number" class="form-control form-control-sm" />
                <span>м</span>
              </div>
              <div class="d-flex gap-2">
                <input v-model.number="furnace.dimensions.height" type="number" class="form-control form-control-sm" />
                <span>м</span>
              </div>
              <div class="d-flex gap-2">
                <input v-model.number="furnace.dimensions.resistance" type="number" class="form-control form-control-sm" step="0.001" />
                <span>Ом·м</span>
              </div>
            </td>
          </tr>

          <!-- Координаты электродов -->
          <tr>
            <td>Координаты электродов</td>
            <td>
              <div v-for="(electrode, index) in furnace.electrodes" :key="'coord-' + index" class="d-flex gap-2 align-items-center">
                <span>{{ index + 1 }}</span>
                <input v-model.number="electrode.U" type="number" class="form-control form-control-sm" />
                <span>м</span>
                <input v-model.number="electrode.V" type="number" class="form-control form-control-sm" />
                <span>м</span>
                <button @click="removeElectrode(index)" class="btn btn-danger btn-sm">Удалить</button>
              </div>
              <button @click="addElectrode" class="btn btn-primary btn-sm mt-2">Добавить электрод</button>
            </td>
          </tr>

          <!-- Радиусы и длины (все на одной строке) -->
          <tr>
            <td>Радиусы и длины</td>
            <td>
              <div class="d-flex gap-2">
                <div v-for="(electrode, index) in furnace.electrodes" :key="'electrode-dim-' + index" class="d-flex gap-2">
                  <input v-model.number="electrode.radii" type="number" class="form-control form-control-sm" />
                  <span>м</span>
                  <input v-model.number="electrode.lengths" type="number" class="form-control form-control-sm" />
                  <span>м</span>
                </div>
              </div>
            </td>
          </tr>

          <!-- Электрические параметры -->
          <tr>
            <td>Электрические параметры</td>
            <td>
              <div class="d-flex gap-2">
                <input v-model.number="furnace.electricParams.groups" type="number" class="form-control form-control-sm" />
              </div>
              <div class="d-flex gap-2">
                <input v-model.number="furnace.electricParams.initialVoltage" type="number" class="form-control form-control-sm" step="0.1" />
                <span>В</span>
              </div>
              <div class="d-flex gap-2">
                <input v-model.number="furnace.electricParams.initialPower" type="number" class="form-control form-control-sm" />
                <span>Вт</span>
              </div>
            </td>
          </tr>
          </tbody>
        </table>
      </div>

      <!-- Рисование расположения электродов -->
      <div class="w-50">
        <svg width="100%" height="300">
          <circle v-for="(electrode, index) in furnace.electrodes"
                  :key="'electrode-circle-' + index"
                  :cx="electrode.U * 3 + 150"
          :cy="electrode.V * 2 + 150"
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
  electrodes: [
    { U: -24.0, V: 70.0, radii: 0.25, lengths: 5.0 },
    { U: -8.0, V: 70.0, radii: 0.25, lengths: 5.0 },
    { U: 8.0, V: 70.0, radii: 0.25, lengths: 5.0 },
    { U: 24.0, V: 70.0, radii: 0.25, lengths: 5.0 },
    { U: -20.0, V: 116.0, radii: 0.25, lengths: 5.0 },
    { U: 20.0, V: 116.0, radii: 0.25, lengths: 5.0 },
    { U: -20.0, V: 35.0, radii: 0.25, lengths: 5.0 },
    { U: -10.0, V: 22.5, radii: 0.25, lengths: 5.0 },
    { U: -20.0, V: 10.0, radii: 0.25, lengths: 5.0 },
    { U: 20.0, V: 35.0, radii: 0.25, lengths: 5.0 },
    { U: 10.0, V: 22.5, radii: 0.25, lengths: 5.0 },
    { U: 20.0, V: 10.0, radii: 0.25, lengths: 5.0 },
  ],
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
  const r = furnace.electrodes[0].radii;
  const l = furnace.electrodes[0].lengths;
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

const addElectrode = () => {
  furnace.electrodes.push({ U: 0, V: 0, radii: 0.25, lengths: 5.0 });
};

const removeElectrode = (index) => {
  if (furnace.electrodes.length > 1) {
    furnace.electrodes.splice(index, 1);
  }
};
</script>

<style scoped>
.table td, .table th {
  vertical-align: middle;
}
</style>
