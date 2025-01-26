<template>
  <div class="border-light mt-2">
    <div class="card-text p-2">
      <div
        v-for="commentField in commentFields"
        :key="commentField.name"
        class="mb-3"
      >
        <label class="form-label small">
          <strong>{{ commentField.title }}</strong>
        </label>
        <textarea
          class="form-control form-control-sm"
          aria-label="textarea"
          :value="fieldValues[commentField.name] || 'Нет данных'"
          :placeholder="commentField.title"
          :style="{
            height: '2rem',
            resize: 'vertical',
            color: fieldValues[commentField.name] ? '' : '#d8d8d8',
          }"
          disabled
        ></textarea>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, computed } from 'vue'

export default defineComponent({
  props: {
    commentFields: {
      type: Array,
      required: true,
    },
    fieldValues: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const hasNonEmptyComments = computed(() =>
      props.commentFields.some(
        (field) =>
          props.fieldValues[field.name] &&
          props.fieldValues[field.name].trim() !== ''
      )
    )

    return {
      hasNonEmptyComments,
    }
  },
})
</script>
