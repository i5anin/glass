<template>
  <div v-if="header" class="card border-light mb-2">
    <div class="card-header bg-transparent border-success border-light p-2">
      <svg-icon type="mdi" :path="mdiFormatListBulletedType" color="red" />
      Информация о заказе
    </div>
    <div class="card-body p-2 row g-3">
      <div
        v-for="(field, name) in allFields"
        :key="name"
        class="col-md-6"
        :title="`${field?.type}&#10;${name || ''}`"
      >
        <div class="field-label">{{ field.title }}</div>
        <div
          class="field-value"
          :style="{ color: fieldValues[name] ? '' : '#d8d8d8' }"
        >
          {{ fieldValues[name] || 'Нет данных' }}
        </div>
      </div>
    </div>
    <CommentSection
      class="card-footer bg-transparent border-success"
      :commentFields="commentFields"
      :fieldValues="fieldValuesComputed"
    />
  </div>
</template>

<script>
import { computed, defineComponent, reactive, watch } from 'vue'
import SvgIcon from '@jamescoyle/vue-icon'
import { mdiFormatListBulletedType } from '@mdi/js'
import { formatValue } from '@/utils/formatters.js'
import CommentSection from './CardComment.vue'
import { processFields } from '@/utils/dev/fieldsProcessor.js'

export default defineComponent({
  components: { SvgIcon, CommentSection },
  props: {
    header: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const allFields = computed(() => {
      const fields = props.header.fields || {}
      const fieldsArray = Object.entries(fields).map(([key, value]) => ({
        key,
        ...value,
      }))
      const processedFields = processFields(fieldsArray)

      return processedFields
        .filter((field) => field.permissions?.read) // Фильтруем только видимые поля
        .reduce((acc, field) => {
          acc[field.key] = field
          return acc
        }, {})
    })

    const commentFields = computed(() => {
      return Object.entries(props.header.fields || {})
        .filter(([name]) => name.includes('comments'))
        .map(([name, field]) => ({ name, ...field }))
    })

    const fieldValues = reactive({})

    const updateFieldValues = () => {
      Object.assign(
        fieldValues,
        Object.fromEntries(
          Object.keys(props.header.fields || {}).map((name) => [
            name,
            formatValue(
              props.header.data?.[name] ?? null,
              props.header.fields[name]?.type || '',
              name
            ),
          ])
        )
      )
    }

    watch(() => props.header, updateFieldValues, { immediate: true })

    return {
      mdiFormatListBulletedType,
      allFields,
      commentFields,
      fieldValues,
      fieldValuesComputed: computed(() => fieldValues),
    }
  },
})
</script>

<style scoped>
.field-label {
  font-size: 0.8rem;
  color: #212529;
  font-weight: 600;
}

.field-value {
  font-size: 1rem;
  color: #495057;
}
</style>
