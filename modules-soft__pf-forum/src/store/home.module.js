// src/store/home.module.js
import { defineStore } from 'pinia'

export const useHomeStore = defineStore('home', {
  state: () => ({
    title: 'some title',
    Form: {
      title: '',
      description: '',
    },
    currentPage: 1,
    itemsPerPage: 15,
    searchQuery: '',
  }),
  actions: {
    nextPage() {
      this.currentPage++
      console.log('Текущая страница в store:', this.currentPage)
    },
    prevPage() {
      if (this.currentPage > 0) {
        this.currentPage--
        console.log('Текущая страница в store:', this.currentPage)
      }
    },
    updateSearchQuery(query) {
      this.searchQuery = query // Обновление поискового запроса
    },
  },
})
