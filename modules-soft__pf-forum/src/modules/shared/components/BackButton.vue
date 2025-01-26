<template>
  <div>
    <!-- Кнопка "Назад" -->
    <router-link
      v-if="targetRoute"
      :to="{ name: targetRoute }"
      :class="[btnClasses]"
    >
      <SvgIcon type="mdi" :path="mdiArrowLeft" class="me-1" />
      <span v-if="showText">Назад</span>
    </router-link>
    <button v-else @click="goBack" :class="[btnClasses]">
      <SvgIcon type="mdi" :path="mdiArrowLeft" class="me-1" />
      <span v-if="showText">Назад</span>
    </button>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'
import { useRouter } from 'vue-router'
import SvgIcon from '@jamescoyle/vue-icon'
import { mdiArrowLeft } from '@mdi/js'

// Указываем имя компонента
defineOptions({
  name: 'BackButton',
})

const router = useRouter()

// Пропсы компонента
const props = defineProps({
  targetRoute: {
    type: String,
    default: null,
  },
  showText: {
    type: Boolean,
    default: true, // Показывать текст по умолчанию
  },
})

// Классы кнопки
const btnClasses = [
  'btn',
  'btn-secondary',
  'me-3',
  'mb-2',
  'btn-sm',
  'btn-outline-light',
]

// Функция для перехода "Назад" в истории маршрутов
const goBack = () => {
  router.back()
}
</script>
