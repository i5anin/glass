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
                <input
                  v-model.number="furnace.dimensions.resistance"
                  type="number"
                  class="form-control form-control-sm"
                  step="0.001"
                />
                <span>Ом·м</span>
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
import { useFurnaceStore } from "./furnaceStore.js";
const furnaceStore = useFurnaceStore();

const furnace = furnaceStore.furnace;
const solution = furnaceStore.solution;
</script>

<style scoped>
.table td,
.table th {
  vertical-align: middle;
}
</style>
