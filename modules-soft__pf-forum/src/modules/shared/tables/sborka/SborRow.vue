<template>
  <tr
    @click="toggle"
    :class="{ 'table-info': isExpanded, 'fw-bold': isExpanded }"
    style="table-layout: fixed"
  >
    <!-- Иконка разворачивания/сворачивания -->
    <td
      :style="{ width: '40px', textAlign: 'center', verticalAlign: 'middle' }"
    >
      <span v-if="hasChildren" title="Развернуть/Свернуть">
        <font-awesome-icon
          :icon="isExpanded ? ['fas', 'minus'] : ['fas', 'plus']"
          class="icon-sm"
        />
      </span>
    </td>

    <!-- Статусы -->
    <td
      :style="{ width: '40px', textAlign: 'center', verticalAlign: 'middle' }"
    >
      <StatusDisplay :row="sbor" @statusFound="handleStatusFound" />
    </td>

    <!-- Поля -->
    <td
      v-for="field in fields"
      :key="field.name"
      :style="{
        fontSize: '12px',
        verticalAlign: 'middle',
        textAlign: getTextAlignment(field.type, field.name),
      }"
    >
      <div v-if="field.permissions.update">
        <input
          type="text"
          v-model="sbor[field.name]"
          class="form-control form-control-sm"
          :style="{ fontSize: '14px' }"
          @click.stop
          @blur="
            tableStore.addPendingUpdate({
              rowId: sbor.sbor_orders__id || field.updateKey || 0,
              fieldName: field.name,
              oldValue: sbor[field.name],
              newValue: sbor[field.name],
              updateTable: field.update_table,
            })
          "
        />
      </div>
      <div v-else>
        <div
          class="tree-node"
          @click.stop="handleRowClick"
          v-if="field.name === 'name' || field.name === 'description'"
          :style="{
            paddingLeft: field.name === 'name' ? `${depth * 20}px` : '0px',
            position: 'relative',
            textDecoration:
              otgruzkaAccepted &&
              (field.name === 'name' || field.name === 'description')
                ? 'line-through'
                : 'none',
            cursor: 'pointer',
          }"
          title="Нажмите для перехода"
        >
          <div
            v-if="field.name === 'name' && depth > 0"
            class="branch-line"
            :class="{ 'last-child': isLastChild }"
            :style="{ left: `${(depth - 1) * 20}px` }"
          />
          <div>
            <font-awesome-icon
              v-if="field.name === 'name'"
              :icon="sbor.is_sbor ? ['fas', 'cubes'] : ['fas', 'cube']"
              :style="{ color: sbor.is_sbor ? '#dc6611' : '#cfa614' }"
              class="icon-sm me-2"
            />
            <span
              v-html="formatValue(sbor[field.name], field.type, field.name)"
            />
          </div>
        </div>

        <StrategyDisplay
          v-else-if="field.name === 'strat'"
          :strategy="sbor[field.name]"
          :depth="depth"
        />

        <span
          v-else
          v-html="formatValue(sbor[field.name], field.type, field.name)"
          :title="generateTitle(field)"
          style="font-size: 13px"
        />
      </div>
    </td>
  </tr>

  <!-- Рекурсивный вызов для дочерних узлов -->
  <template v-if="isExpanded && hasChildren">
    <SborRow
      v-for="(child, index) in sbor.sbor_tree"
      :key="child.id"
      :sbor="child"
      :fields="fields"
      :depth="depth + 1"
      :isLastChild="index === sbor.sbor_tree.length - 1"
      :detail="detail"
    />
  </template>
</template>

<script setup>
import { computed, ref, toRefs } from 'vue'
import { useRouter } from 'vue-router'
import { useTableStore } from './tableStore'
import { FontAwesomeIcon } from '@/utils/icons.js'
import { formatValue, getTextAlignment } from '@/utils/formatters.js'
import StatusDisplay from '@/modules/shared/components/StatusDisplay.vue'
import StrategyDisplay from '@/modules/shared/components/StrategyDisplay.vue'
import './SborRow.css'
import SborRow from './SborRow.vue'

const props = defineProps({
  sbor: { type: Object, required: true },
  depth: { type: Number, default: 0 },
  fields: { type: Array, required: true },
  isLastChild: { type: Boolean, default: false },
  detail: {
    type: Object,
    required: true,
    default: () => ({ route: '' }),
  },
})

const { sbor, detail } = toRefs(props)
const router = useRouter()
const tableStore = useTableStore()
const isExpanded = ref(false)
const otgruzkaAccepted = ref(false)

const handleStatusFound = (status) => {
  if (status.suffix === '_otgruzka' && status.value === true) {
    otgruzkaAccepted.value = true
  }
}

const toggle = () => {
  if (hasChildren.value) {
    isExpanded.value = !isExpanded.value
  }
}

const handleRowClick = () => {
  const id = sbor.value.link_id

  if (!id) {
    console.error('Missing required parameter: id', {
      id,
      sbor: sbor.value,
    })
    return
  }

  router
    .push({
      name: detail.value.route,
      params: { nom_id: id },
    })
    .catch((error) => {
      console.error('Error navigating to route:', error)
    })
}

const hasChildren = computed(
  () => sbor.value.sbor_tree && sbor.value.sbor_tree.length > 0
)

const generateTitle = (field) =>
  `Поле: ${field.title || 'Нет данных'}\nПеременная: ${field.name || 'Нет данных'}`
</script>
