import { defineStore } from "pinia";
import { reactive, computed, watch } from "vue";

export const useFurnaceStore = defineStore("furnace", () => {
  const furnace = reactive({
    dimensions: {
      length: 71.0, // Длина печи
      height: 121.0, // Высота печи
      resistance: 0.300, // Сопротивление материала
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
        U0: 0, // Рассчитываемое результирующее напряжение
        U12: [],
        U23: [],
      },
      current: {
        I1: [],
        I2: [],
        I3: [],
      },
    },
  });

  const solution = computed(() => {
    // Рассчёт общего объёма электродов
    const electrodeVolume = furnace.electrodes.reduce(
      (total, electrode) => total + Math.PI * electrode.radius ** 2 * electrode.length,
      0
    );

    // Расчёт напряжения
    const totalResistance = furnace.dimensions.resistance * electrodeVolume;
    const current = furnace.electricParams.initialPower / furnace.electricParams.initialVoltage;
    const U0 = current * totalResistance;

    // Расчёт суммарной мощности
    const totalPower = furnace.electrodes.reduce((power, electrode) => {
      const voltageDrop = U0 / furnace.electrodes.length; // Условное распределение напряжения
      const electrodeCurrent = voltageDrop / furnace.dimensions.resistance; // Сила тока через электрод
      return power + voltageDrop * electrodeCurrent;
    }, 0);

    return {
      electrodeVolume: electrodeVolume.toFixed(6),
      totalPower: totalPower.toFixed(1),
      U0: U0.toFixed(2),
    };
  });

  // Отслеживание изменений в массиве `electrodes`
  watch(
    () => furnace.electrodes.map((e) => ({ ...e })), // Глубокая реактивность массива
    () => {
      furnace.results.voltage.U0 = parseFloat(solution.value.U0);
    },
    { immediate: true, deep: true }
  );

  // Функция добавления электрода
  const addElectrode = (electrode) => {
    furnace.electrodes.push(electrode);
  };

  return {
    furnace,
    solution,
    addElectrode,
  };
});
