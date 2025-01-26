<template>
  <div class="search-bar">
    <div class="position-relative">
      <!-- Prepend с иконкой поиска -->
      <div class="input-group">
        <span class="input-group-text">
          <i class="bi bi-search"></i>
        </span>
        <!-- Поле ввода -->
        <input
          type="text"
          v-model="searchQuery"
          class="form-control search-input"
          placeholder="Введите текст для поиска"
          :disabled="loading"
          @keyup.enter="onSearch"
        />

        <!-- Кнопка очистки -->
      </div>
      <span
        v-if="searchQuery"
        class="form-control-clear bi bi-x"
        @click="clearSearch"
      ></span>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'SearchBar',
  props: {
    loading: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['search-change'],
  setup(props, { emit }) {
    const searchQuery = ref('')

    const onSearch = () => {
      emit('search-change', searchQuery.value)
    }

    const clearSearch = () => {
      searchQuery.value = ''
      emit('search-change', '')
    }

    return {
      searchQuery,
      onSearch,
      clearSearch,
    }
  },
}
</script>

<style scoped>
.search-bar .search-input {
  width: auto;
  min-width: 300px;
}
.input-group-text {
  background-color: #f8f9fa;
}
.search-button {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  min-width: 100px;
}

.form-control-clear {
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
  cursor: pointer;
  z-index: 10;
  font-size: 1.2rem;
  color: #6c757d;
}
.form-control-clear:hover {
  color: #495057;
}
</style>
