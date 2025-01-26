<template>
  <header class="navbar navbar-expand-lg">
    <div
      class="container-fluid d-flex justify-content-between align-items-center"
    >
      <router-link class="navbar-brand mb-0" to="/">
        <BackButton :showText="false" />
      </router-link>
      <!-- Селектор роли -->
      <div class="d-flex align-items-center">
        <label for="role-selector" class="me-2 mb-0">Выбор роли:</label>
        <select
          class="form-select form-select-sm w-auto"
          id="role-selector"
          v-model="roleStore.selectedRole"
          @change="onRoleChange"
        >
          <option
            v-for="(name, key) in roleStore.roleNames"
            :key="key"
            :value="key"
          >
            {{ name }}
          </option>
        </select>
      </div>

      <!-- Селектор типа -->
      <div class="d-flex align-items-center" v-if="roleStore.types.length">
        <label for="type-selector" class="me-2 mb-0">Выбор типа:</label>
        <select
          class="form-select form-select-sm w-auto"
          id="type-selector"
          v-model="roleStore.selectedTypes"
          @change="onTypeChange"
        >
          <option
            v-for="(type, key) in roleStore.types"
            :key="key"
            :value="type"
          >
            {{ type }}
          </option>
        </select>
      </div>
    </div>
  </header>
</template>

<script>
import { useRoleStore } from '../store/index.js'
import BackButton from '@/modules/shared/components/BackButton.vue'

export default {
  components: { BackButton },
  setup() {
    const roleStore = useRoleStore()

    // Загружаем данные из localStorage при инициализации
    const loadSelectedRoleFromStorage = () => {
      const storedRole = localStorage.getItem('selectedRole')
      const storedType = localStorage.getItem('selectedTypes')
      if (storedRole) {
        roleStore.setSelectedRole(storedRole)
      }
      if (storedType) {
        roleStore.selectedTypes = storedType
      }
    }

    // Обработчик смены роли
    const onRoleChange = () => {
      console.log('Выбранная роль:', roleStore.selectedRole)
      localStorage.setItem('selectedRole', roleStore.selectedRole)
    }

    // Обработчик смены типа
    const onTypeChange = () => {
      console.log('Выбранный тип:', roleStore.selectedTypes)
      localStorage.setItem('selectedTypes', roleStore.selectedTypes)
    }

    // Обработчик очистки данных
    const clearStorage = () => {
      localStorage.removeItem('selectedRole')
      localStorage.removeItem('selectedTypes')
      roleStore.setSelectedRole(null)
      roleStore.selectedTypes = null
    }

    // Инициализация
    loadSelectedRoleFromStorage()

    return {
      roleStore,
      onRoleChange,
      onTypeChange,
      clearStorage,
    }
  },
}
</script>
