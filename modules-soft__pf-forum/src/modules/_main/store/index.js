// src/stores/roleStore.js
import { defineStore } from 'pinia'

export const useRoleStore = defineStore('roleStore', {
  state: () => ({
    selectedRole: 'metrolog',
    roleNames: {
      managers: 'Менеджер',
      metrolog: 'Метролог',
      omts: 'ОМТС',
      tech_calc: 'Технолог',
    },
    selectedTypes: 'orders',
    types: {
      orders: 'orders',
      specs: 'specs',
    },
  }),
  actions: {
    setSelectedRole(role) {
      this.selectedRole = role
    },
  },
  getters: {
    roleDisplayName(state) {
      return state.roleNames[state.selectedRole]
    },
  },
})
