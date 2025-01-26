<template>
  <div class="card mb-2">
    <div class="card-body p-2">
      <div class="row">
        <!-- Поля для редактирования -->
        <div class="col-12">
          <div v-for="field in updateFormFields" :key="field.key" class="mb-3">
            <component
              :is="EditableField"
              :field="field"
              v-model="localFieldValues[field.key]"
            />
          </div>
        </div>

        <!-- Только для чтения -->
        <div class="col-12 mt-3">
          <div class="row g-3">
            <div
              class="col-md-6"
              v-for="field in readonlyFormFields"
              :key="field.key"
            >
              <ReadonlyField
                :field="field"
                :value="formattedFieldValues[field.key]"
                @field-click="handleFieldClick(field.key)"
              />
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Модалка -->
    <ModalZagInfo
      :visible="modalVisible"
      :type="modalType"
      :kolvo-add="modalKolvoAdd"
      :id="modalId"
      @close="closeModal"
    />
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import EditableField from './card/EditableField.vue'
import ReadonlyField from './card/ReadonlyField.vue'
import ModalZagInfo from '@/modules/shared/zagotovka/ModalZagotovka.vue'

// Props
const props = defineProps({
  updateFormFields: {
    type: Array,
    required: true,
    default: () => [], // По умолчанию пустой массив
  },
  readonlyFormFields: {
    type: Array,
    required: true,
  },
  fieldValues: {
    type: Object,
    required: true,
  },
})

// Local state
const localFieldValues = ref({ ...props.fieldValues })
const modalVisible = ref(false)
const modalType = ref('')
const modalKolvoAdd = ref('')
const modalId = ref('')

// Computed properties
const formattedFieldValues = computed(() =>
  Object.fromEntries(
    Object.entries(props.fieldValues).map(([key, value]) => [key, value || ''])
  )
)

// Methods
const handleFieldClick = (name) => {
  console.log(`Клик по полю в родительском компоненте: ${name}`) // Лог проверки
  if (['zag_nom', 'zag_tech'].includes(name)) {
    modalType.value = name === 'zag_nom' ? 'nom' : 'tech'
    modalKolvoAdd.value = formattedFieldValues.value.kolvo_add || 0
    modalId.value =
      name === 'zag_nom'
        ? formattedFieldValues.value.nom_id_nom ||
          formattedFieldValues.value.nom__id ||
          ''
        : formattedFieldValues.value.ordersnom__id || ''

    if (modalId.value) {
      modalVisible.value = true
    } else {
      console.warn('Не указан modalId для:', name)
    }
  }
}

const closeModal = () => {
  modalVisible.value = false
}
</script>

<style scoped>
.card {
  border-radius: 8px;
  background-color: #f8f9fa;
}
</style>
