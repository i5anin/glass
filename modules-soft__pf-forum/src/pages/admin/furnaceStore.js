import { defineStore } from "pinia";
import { reactive, computed, watch } from "vue";

export const useFurnaceStore = defineStore("furnace", () => {
  const furnace = reactive({
    dimensions: {
      length: 71.0,
      height: 121.0,
      resistance: 0.300,
    },
    electrodes: [
      { U: -24.0, V: 70.0, radius: 0.25, length: 5.0 },
      { U: -8.0, V: 70.0, radius: 0.25, length: 5.0 },
      { U: 8.0, V: 70.0, radius: 0.25, length: 5.0 },
      { U: 24.0, V: 70.0, radius: 0.25, length: 5.0 },
      { U: -20.0, V: 116.0, radius: 0.25, length: 5.0 },
      { U: 20.0, V: 116.0, radius: 0.25, length: 5.0 },
    ],
    electricParams: {
      groups: 7,
      initialVoltage: 100.0,
      initialPower: 200000.0,
    },
    results: {
      voltage: {
        U0: 0,
      },
    },
  });

  const solution = computed(() => {
    // Рассчёт расстояний между электродами
    const distances = [];
    for (let i = 0; i < furnace.electrodes.length; i++) {
      for (let j = i + 1; j < furnace.electrodes.length; j++) {
        const dx = furnace.electrodes[i].U - furnace.electrodes[j].U;
        const dy = furnace.electrodes[i].V - furnace.electrodes[j].V;
        const distance = Math.sqrt(dx ** 2 + dy ** 2);
        distances.push(distance);
      }
    }

    const averageDistance = distances.length > 0
      ? distances.reduce((sum, d) => sum + d, 0) / distances.length
      : 0;

    // Вернуть результат
    return {
      distances: distances.map((d) => d.toFixed(2)), // Если массив пуст, это будет []
      averageDistance: averageDistance.toFixed(2),
      // Остальные расчёты
      electrodeVolume: '0.000000',
      totalPower: '0.0',
      U0: '0.00',
    };
  });


  // Отслеживание изменений
  watch(
    () => furnace.electrodes.map((e) => ({ ...e })), // Глубокое отслеживание
    () => {
      console.log("Электроды изменены, пересчет...");
    },
    { deep: true }
  );

  const addElectrode = () => {
    furnace.electrodes.push({ U: 0, V: 0, radius: 0.1, length: 1.0 });
  };

  const removeElectrode = (index) => {
    furnace.electrodes.splice(index, 1);
  };

  return {
    furnace,
    solution,
    addElectrode,
    removeElectrode,
  };
});
