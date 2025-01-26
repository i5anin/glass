import { defineStore } from "pinia";
import { reactive, computed } from "vue";

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
    const electrodeVolume = furnace.electrodes.reduce(
      (total, electrode) => total + Math.PI * electrode.radius ** 2 * electrode.length,
      0
    );

    const P1 = furnace.results.voltage.U12[0] * furnace.results.current.I1[0];
    const P2 = furnace.results.voltage.U12[1] * furnace.results.current.I2[1];
    const P3 = furnace.results.voltage.U23[1] * furnace.results.current.I3[2];
    const totalPower = P1 + P2 + P3;

    return {
      electrodeVolume: electrodeVolume.toFixed(6),
      totalPower: totalPower.toFixed(1),
    };
  });

  return {
    furnace,
    solution,
  };
});
