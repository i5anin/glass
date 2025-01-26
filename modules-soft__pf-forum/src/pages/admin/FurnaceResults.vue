<template>
  <div>
    <h3 class="mt-4">Результаты:</h3>
    <table class="table table-sm">
      <thead>
      <tr>
        <th>Параметр</th>
        <th>Значение</th>
      </tr>
      </thead>
      <tbody>
      <tr>
        <td><strong>Объем электродов (V):</strong></td>
        <td>{{ solution.electrodeVolume }} м³</td>
      </tr>
      <tr>
        <td><strong>Суммарная мощность (P):</strong></td>
        <td>{{ solution.totalPower }} Вт</td>
      </tr>
      <tr>
        <td><strong>Результирующее напряжение (U₀):</strong></td>
        <td>{{ solution.U0 }} В</td>
      </tr>
      </tbody>
    </table>

    <h3 class="mt-4">Формулы:</h3>
    <ul>
      <li>
        <strong>Объем электродов:</strong>
        <pre>
V = Σ(π × r² × h)
где r - радиус электрода, h - длина электрода.
</pre>
        <span><strong>Текущие данные:</strong> {{ furnace.electrodes.map(e => `r=${e.radius}, h=${e.length}`).join('; ')
          }}</span>
      </li>
      <li>
        <strong>Сопротивление:</strong>
        <pre>
R = ρ × V
где ρ - сопротивление материала, V - объем электродов.
</pre>
        <span><strong>Текущие данные:</strong> ρ={{ furnace.dimensions.resistance }}, V={{ solution.electrodeVolume
          }}</span>
      </li>
      <li>
        <strong>Сила тока:</strong>
        <pre>
I = P / U
где P - мощность, U - начальное напряжение.
</pre>
        <span><strong>Текущие данные:</strong> P={{ furnace.electricParams.initialPower
          }}, U={{ furnace.electricParams.initialVoltage }}</span>
      </li>
      <li>
        <strong>Результирующее напряжение:</strong>
        <pre>
U₀ = I × R
где I - сила тока, R - сопротивление.
</pre>
        <span><strong>Текущие данные:</strong> I={{ (furnace.electricParams.initialPower / furnace.electricParams.initialVoltage).toFixed(2)
          }}, R={{ (furnace.dimensions.resistance * solution.electrodeVolume).toFixed(6) }}</span>
      </li>
      <li>
        <strong>Суммарная мощность:</strong>
        <pre>
P = Σ((U₀ / N) × (U₀ / N / R))
где N - количество электродов, U₀ - результирующее напряжение, R - сопротивление.
</pre>
        <span><strong>Текущие данные:</strong> N={{ furnace.electrodes.length }}, U₀={{ solution.U0 }}</span>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { useFurnaceStore } from './furnaceStore'

const { furnace, solution } = useFurnaceStore()
</script>

<style scoped>
.table td,
.table th {
  vertical-align: middle;
}

pre {
  background: #f8f9fa;
  padding: 0.5em;
  border-radius: 4px;
}
</style>
