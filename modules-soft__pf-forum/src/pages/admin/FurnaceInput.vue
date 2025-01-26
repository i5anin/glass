<template>
  <div>
    <h3>Координаты электродов:</h3>
    <div class="table-responsive">
      <table class="table table-sm">
        <thead>
        <tr>
          <th>#</th>
          <th>U (м)</th>
          <th>V (м)</th>
          <th>Радиус (м)</th>
          <th>Длина (м)</th>
          <th>Действия</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(electrode, index) in furnace.electrodes" :key="index">
          <td>{{ index + 1 }}</td>
          <td>
            <input
              v-model.number="electrode.U"
              type="number"
              class="form-control form-control-sm"
            />
          </td>
          <td>
            <input
              v-model.number="electrode.V"
              type="number"
              class="form-control form-control-sm"
            />
          </td>
          <td>
            <input
              v-model.number="electrode.radius"
              type="number"
              class="form-control form-control-sm"
            />
          </td>
          <td>
            <input
              v-model.number="electrode.length"
              type="number"
              class="form-control form-control-sm"
            />
          </td>
          <td>
            <button @click="removeElectrode(index)" class="btn btn-sm btn-danger">
              Удалить
            </button>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
    <button @click="addElectrode" class="btn btn-sm btn-primary mt-2">Добавить электрод</button>
  </div>
</template>

<script setup>
import { useFurnaceStore } from "./furnaceStore";

const { furnace } = useFurnaceStore();

const addElectrode = () => {
  furnace.electrodes.push({ U: 0, V: 0, radius: 0.1, length: 1.0 });
};

const removeElectrode = (index) => {
  furnace.electrodes.splice(index, 1);
};
</script>

<style scoped>
.table td,
.table th {
  vertical-align: middle;
}
</style>
