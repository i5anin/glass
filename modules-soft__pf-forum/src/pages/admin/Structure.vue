<template>
  <div class="component-summary">
    <h2>Сводка о компоненте</h2>
    <div v-if="component">
      <p><strong>Имя компонента:</strong> {{ componentName }}</p>
      <p><strong>Пропсы:</strong> {{ props.join(', ') }}</p>
      <p><strong>Методы:</strong> {{ methods.join(', ') }}</p>
    </div>
    <p v-else>Загрузка компонента...</p>
  </div>
</template>

<script setup>
import PagesZagotovkaInfo from '@/modules/shared/zagotovka/PagesZagotovkaInfo.vue'
import { ref } from 'vue'

const component = ref(PagesZagotovkaInfo)
const componentName = ref('PagesZagotovkaInfo')
const props = ref([])
const methods = ref([])

const loadComponentInfo = () => {
  try {
    const instance = {
      type: component.value,
      props: Object.keys(component.value.props || {}),
      methods: Object.keys(component.value.methods || {}),
    }

    componentName.value = instance.type.name || 'Анонимный компонент'
    props.value = instance.props
    methods.value = instance.methods
  } catch (error) {
    console.error('Ошибка анализа компонента:', error)
  }
}

onMounted(() => {
  loadComponentInfo()
})
</script>

<style scoped>
.component-summary {
  max-width: 600px;
  margin: 0 auto;
  font-family: Arial, sans-serif;
}
</style>
