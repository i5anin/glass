<template>
  <div
    v-if="visible"
    class="modal fade show"
    tabindex="-1"
    role="dialog"
    style="display: block; background-color: rgba(0, 0, 0, 0.5)"
  >
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div
          class="modal-header d-flex justify-content-between align-items-center"
        >
          <h5 class="modal-title">{{ title }}</h5>
          <button
            type="button"
            class="btn btn-danger rounded-circle d-flex align-items-center justify-content-center"
            style="width: 2.5rem; height: 2.5rem"
            aria-label="Close"
            @click="closeModal"
          >
            <i class="bi bi-x"></i>
          </button>
        </div>
        <div class="modal-body">
          <div
            v-for="(value, key) in headersMap"
            :key="key"
            class="form-floating mb-3"
          >
            <input
              type="text"
              class="form-control"
              :id="key"
              v-model="editableRow[key]"
              placeholder="Введите значение"
            />
            <label :for="key">{{ headersMap[key] || key }}</label>
          </div>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-outline-secondary"
            @click="saveChanges"
          >
            Сохранить
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, computed, watch } from 'vue'

export default {
  name: 'EditModal',
  props: {
    title: {
      type: String,
      default: 'Edit Row',
    },
    visible: {
      type: Boolean,
      required: true,
    },
    row: {
      type: Object,
      default: () => ({}), // Пустой объект по умолчанию
    },
    headers: {
      type: Array,
      required: true,
    },
  },
  emits: ['close', 'save'],
  setup(props, { emit }) {
    const editableRow = reactive({ ...props.row })

    const headersMap = computed(() =>
      props.headers.reduce((map, header) => {
        map[header.name] = header.title || header.name
        return map
      }, {})
    )

    watch(
      () => props.row,
      (newRow) => {
        Object.assign(editableRow, newRow)
      }
    )

    const closeModal = () => {
      emit('close')
    }

    const saveChanges = () => {
      emit('save', { ...editableRow })
    }

    return {
      editableRow,
      headersMap,
      closeModal,
      saveChanges,
    }
  },
}
</script>

<style scoped>
.modal.fade.show {
  display: block;
  background-color: rgba(0, 0, 0, 0.5);
}

.modal-dialog {
  margin: 10% auto;
}
</style>
