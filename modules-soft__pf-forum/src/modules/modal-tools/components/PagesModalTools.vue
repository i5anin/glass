<template>
  <div
    class="modal fade"
    id="orderModal"
    tabindex="-1"
    aria-labelledby="orderModalLabel"
    aria-hidden="true"
    ref="modalContainer"
  >
    <div class="modal-dialog modal-fullscreen">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="orderModalLabel">
            Инструмент (операция {{ operationNumber }}, уникальный id операции
            {{ operationId }})
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
            @click="closeModal"
          ></button>
        </div>
        <div class="modal-body">
          <div v-if="instrumentData">
            <div class="row">
              <AddedInstrumentsTable
                :instruments="addedInstruments"
                :collapse-states="collapseStates"
                @remove-instrument="removeInstrument"
              />

              <ProposedInstrumentsTable
                :instruments="filteredInstruments"
                :collapse-states="collapseStates"
                @add-instrument="addInstrument"
              />
            </div>
          </div>
          <div v-else>
            <p>Загрузка данных...</p>
          </div>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
            @click="closeModal"
          >
            Закрыть
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, reactive } from 'vue'
import { Modal } from 'bootstrap'
import { useRoute } from 'vue-router'
import AddedInstrumentsTable from './AddedInstrumentsTable.vue'
import ProposedInstrumentsTable from './ProposedInstrumentsTable.vue'
import { fetchInstrumentData } from '../api/tools.js'

const route = useRoute()
const operationNumber = ref(route.params.no)
const operationId = ref(route.params.nomId)
const emit = defineEmits(['close'])

const modalContainer = ref(null)
let modalInstance = null
const instrumentData = ref(null)
const addedInstruments = ref([])
const collapseStates = reactive({})

onMounted(() => {
  modalInstance = new Modal(modalContainer.value)
  loadInstrumentData()
})

const loadInstrumentData = async () => {
  if (operationNumber.value && operationId.value) {
    try {
      instrumentData.value = await fetchInstrumentData(
        operationNumber.value,
        operationId.value
      )
      modalInstance.show()
    } catch (error) {
      console.error('Ошибка при загрузке данных инструмента:', error)
      instrumentData.value = null
    }
  }
}

const generateUniqueId = (item) => {
  return `${item.tool_group_id}-${JSON.stringify(item.property_description)}`
}

const filteredInstruments = computed(() => {
  if (!instrumentData.value) return []
  return instrumentData.value.data.filter((item) => {
    const itemId = generateUniqueId(item)
    return !addedInstruments.value.some(
      (addedItem) => generateUniqueId(addedItem) === itemId
    )
  })
})

const addInstrument = (item) => {
  addedInstruments.value.push(item)
  collapseStates[generateUniqueId(item)] = false
}

const removeInstrument = (item) => {
  addedInstruments.value = addedInstruments.value.filter(
    (addedItem) => generateUniqueId(addedItem) !== generateUniqueId(item)
  )
  delete collapseStates[generateUniqueId(item)]
}

const closeModal = () => {
  emit('close')
  modalInstance.hide()
}
</script>

<style scoped>
.table th {
  text-align: center;
}
.btn-circle {
  background-color: transparent;
  border: none;
}
@media (max-width: 767px) {
  .col-md-6 {
    flex: 0 0 100%;
    max-width: 100%;
  }
}
.modal-fullscreen {
  max-width: 100%;
  margin: 0;
}
.modal-content {
  height: 100vh;
}
.row {
  display: flex;
  align-items: stretch;
}
.col-md-6 {
  display: flex;
  flex-direction: column;
}
</style>
