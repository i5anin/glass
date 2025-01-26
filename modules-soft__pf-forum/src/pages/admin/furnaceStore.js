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
      },
    },
  });

  const solution = computed(() => {
    // 1. Рассчёт общего объёма электродов
    const electrodeVolume = furnace.electrodes.reduce(
      (total, electrode) => total + Math.PI * electrode.radius ** 2 * electrode.length,
      0
    );

    // 2. Рассчёт общего сопротивления
    const totalResistance = furnace.dimensions.resistance * electrodeVolume;

    // 3. Рассчёт силы тока
    const current = furnace.electricParams.initialPower / furnace.electricParams.initialVoltage;

    // 4. Рассчёт результирующего напряжения
    const U0 = current * totalResistance;

    // 5. Рассчёт суммарной мощности
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

  // Отслеживание изменений в массиве `electrodes` и других параметрах
  watch(
    furnace, // Отслеживаем весь объект
    () => {
      furnace.results.voltage.U0 = parseFloat(solution.value.U0);
    },
    { deep: true } // Глубокое отслеживание всех вложенных объектов
  );

  // Функция добавления электрода
  const addElectrode = () => {
    furnace.electrodes.push({ U: 0, V: 0, radius: 0.1, length: 1.0 });
  };

  // Функция удаления электрода
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
