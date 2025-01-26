<template>
  <div>
    <h3>Дано:</h3>
    <div class="d-flex flex-wrap">
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
              <div v-for="(value, field) in furnace.dimensions" :key="field" class="d-flex gap-2">
                <input v-model.number="furnace.dimensions[field]" type="number" class="form-control form-control-sm" />
                <span>{{ dimensionLabels[field] }}</span>
              </div>
            </td>
          </tr>
          <tr>
            <td>Координаты электродов</td>
            <td>
              <div v-for="(coord, index) in furnace.electrodes.U" :key="'coord-' + index" class="d-flex gap-2">
                <input v-model.number="furnace.electrodes.U[index]" type="number" class="form-control form-control-sm" />
                <span>м</span>
                <input v-model.number="furnace.electrodes.V[index]" type="number" class="form-control form-control-sm" />
                <span>м</span>
              </div>
            </td>
          </tr>
          <tr>
            <td>Радиусы и длины</td>
            <td>
              <div v-for="(value, index) in furnace.electrodes.radii" :key="'radius-' + index" class="d-flex gap-2">
                <input v-model.number="furnace.electrodes.radii[index]" type="number" class="form-control form-control-sm" />
                <span>м</span>
                <input v-model.number="furnace.electrodes.lengths[index]" type="number" class="form-control form-control-sm" />
                <span>м</span>
              </div>
            </td>
          </tr>
          <tr>
            <td>Электрические параметры</td>
            <td>
              <div v-for="(value, field) in furnace.electricParams" :key="field" class="d-flex gap-2">
                <input v-model.number="furnace.electricParams[field]" type="number" class="form-control form-control-sm" />
                <span>{{ electricParamsLabels[field] }}</span>
              </div>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useFurnaceStore } from "./furnaceStore";

const { furnace } = useFurnaceStore();

const dimensionLabels = {
  length: "м",
  height: "м",
  resistance: "Ом·м",
};

const electricParamsLabels = {
  groups: "",
  initialVoltage: "В",
  initialPower: "Вт",
};
</script>
