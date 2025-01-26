<template>
  <div
    v-if="visible && zagotovka.fields.length"
    class="modal fade show"
    tabindex="-1"
    role="dialog"
    style="display: block; background-color: rgba(0, 0, 0, 0.5)"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">{{ zagotovka.title }}</h5>
          <button
            type="button"
            class="btn-close"
            aria-label="Close"
            @click="closeModal"
          ></button>
        </div>
        <div class="modal-body">
          <template v-if="loading">
            <p>Загрузка данных...</p>
          </template>
          <template v-else>
            <table class="table table-bordered">
              <thead>
                <tr>
                  <th>Название</th>
                  <th>Значение</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="field in zagotovka.fields" :key="field.title">
                  <td>{{ field.title }}</td>
                  <td>
                    <span v-if="!isObject(zagotovka.data[field.key])">
                      {{ zagotovka.data[field.key] || '—' }}
                    </span>
                    <template v-else>
                      <div
                        v-for="(value, subKey) in zagotovka.data[field.key]"
                        :key="subKey"
                      >
                        {{ subKey }}: {{ value }}
                      </div>
                    </template>
                  </td>
                </tr>
              </tbody>
            </table>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, watch, ref } from 'vue'
import { getZagotovkaInfo } from './api/zagotovka.js'

export default {
  name: 'ModalZagInfo',
  props: {
    visible: { type: Boolean, required: true },
    type: { type: String, required: true },
    kolvoAdd: { type: [String, Number], required: true },
    id: { type: [String, Number], required: true },
  },
  emits: ['close'],
  setup(props, { emit }) {
    const zagotovka = reactive({
      title: '',
      fields: [],
      data: {},
    })

    const loading = ref(false)

    const fetchZagotovkaData = async () => {
      if (!props.visible) return

      loading.value = true
      try {
        const response = await getZagotovkaInfo({
          type: props.type,
          kolvo_add: props.kolvoAdd,
          id: props.id,
        })
        zagotovka.title = response.title || `Данные (${props.type})`
        zagotovka.fields = Object.entries(response.fields).map(
          ([key, field]) => ({
            key,
            ...field,
          })
        )
        zagotovka.data = response.data || {}
      } catch (error) {
        console.error('Ошибка загрузки данных заготовки:', error)
      } finally {
        loading.value = false
      }
    }

    const isObject = (value) =>
      value && typeof value === 'object' && !Array.isArray(value)

    const closeModal = () => emit('close')

    watch(
      () => props.visible,
      (newValue) => {
        if (newValue) fetchZagotovkaData()
      },
      { immediate: true }
    )

    return {
      zagotovka,
      isObject,
      closeModal,
      loading,
    }
  },
}
</script>
