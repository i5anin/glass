<template>
  <div
    class="tree-node"
    @click="toggle"
    :style="{ paddingLeft: `${depth * 20}px`, position: 'relative' }"
    style="cursor: pointer"
  >
    <div class="node-content">
      <span v-if="!isExpanded">
        <div class="mini-strategy">
          <span
            v-for="entry in strategyEntries"
            :key="entry[0]"
            :style="{
              backgroundColor: getColor(entry[1]),
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              width: '18px',
              height: '18px',
              margin: '1px 2px',
              borderRadius: '4px',
            }"
          >
            <div
              :style="{
                fontSize: '8px',
                color: 'white',
                fontWeight: 'bold',
                lineHeight: '8px',
              }"
            >
              {{ entry[0] }}
            </div>
          </span>
        </div>
      </span>
      <span v-else>
        <div class="full-strategy">
          <div
            v-for="entry in strategyEntries"
            :key="entry[0]"
            :style="{
              backgroundColor: getColor(entry[1]),
              display: 'flex',
              justifyContent: 'flex-start',
              alignItems: 'center',
              margin: '1px 0',
              padding: '4px',
              borderRadius: '4px',
              width: '100%',
              minHeight: '20px',
              boxSizing: 'border-box',
            }"
          >
            <div
              :style="{
                fontSize: '12px',
                color: 'white',
                fontWeight: 'bold',
                lineHeight: '12px',
                marginRight: '8px',
              }"
            >
              {{ entry[0] }}:
            </div>
            <div
              :style="{
                fontSize: '12px',
                color: 'white',
                lineHeight: '12px',
                flex: '1',
              }"
            >
              {{ entry[1].type || '-' }}
              {{ entry[1].cnc_name || '-' }}
              {{
                entry[1].t_op_left
                  ? `[Ост: ${parseFloat(entry[1].t_op_left).toFixed(2)}ч]`
                  : ''
              }}
            </div>
          </div>
        </div>
      </span>
    </div>
  </div>
</template>

<script>
import { computed, ref } from 'vue'

export default {
  name: 'StrategyDisplay',
  props: {
    strategy: {
      type: Object,
      required: true,
    },
    depth: {
      type: Number,
      default: 0,
    },
  },
  setup(props) {
    const isExpanded = ref(false)

    const colorMapping = {
      LightGreen: '#198754',
      Red: '#dc3545',
      Orange: '#FFA500',
      LimeGreen: '#90EE90',
      Default: '#aaaaaa',
    }

    const getColor = (entry) => {
      return entry.color in colorMapping
        ? colorMapping[entry.color]
        : entry.color || colorMapping.Default
    }

    const toggle = () => {
      isExpanded.value = !isExpanded.value // Переключаем состояние
    }

    const strategyEntries = computed(() => Object.entries(props.strategy))

    return {
      strategyEntries,
      isExpanded,
      toggle,
      getColor,
    }
  },
}
</script>

<style scoped>
.mini-strategy {
  display: flex;
  flex-wrap: wrap;
}

.full-strategy {
  display: flex;
  flex-direction: column;
  width: 100%;
}
</style>
