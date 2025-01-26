<template>
  <div class="d-flex justify-content-between align-items-center">
    <p class="text-muted mb-0">
      {{ startRecord }}–{{ endRecord }} из {{ totalCount }}
    </p>

    <nav aria-label="Page navigation">
      <ul class="pagination mb-0">
        <!-- Кнопка перехода к первой странице -->
        <li
          class="page-item"
          :class="{ disabled: currentPage === 1 }"
          @click="goToPage(1)"
        >
          <button class="page-link" type="button">«</button>
        </li>

        <!-- Кнопка перехода на предыдущую страницу -->
        <li
          class="page-item"
          :class="{ disabled: currentPage === 1 }"
          @click="goToPage(currentPage - 1)"
        >
          <button class="page-link" type="button">‹</button>
        </li>

        <!-- Отображение страниц -->
        <li
          v-for="page in visiblePages"
          :key="page"
          class="page-item"
          :class="{ active: page === currentPage }"
          @click="goToPage(page)"
        >
          <button class="page-link" type="button">{{ page }}</button>
        </li>

        <!-- Кнопка перехода на следующую страницу -->
        <li
          class="page-item"
          :class="{ disabled: currentPage === totalPages }"
          @click="goToPage(currentPage + 1)"
        >
          <button class="page-link" type="button">›</button>
        </li>

        <!-- Кнопка перехода к последней странице -->
        <li
          class="page-item"
          :class="{ disabled: currentPage === totalPages }"
          @click="goToPage(totalPages)"
        >
          <button class="page-link" type="button">»</button>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
import { computed } from 'vue'

export default {
  name: 'Pagination',
  props: {
    totalCount: {
      type: Number,
      required: true,
    },
    itemsPerPage: {
      type: Number,
      required: true,
    },
    currentPage: {
      type: Number,
      required: true,
    },
    totalPages: {
      type: Number,
      required: true,
    },
  },
  emits: ['page-change'],
  setup(props, { emit }) {
    const startRecord = computed(
      () => (props.currentPage - 1) * props.itemsPerPage + 1
    )
    const endRecord = computed(() =>
      Math.min(props.currentPage * props.itemsPerPage, props.totalCount)
    )

    const visiblePages = computed(() => {
      const maxPagesToShow = 5
      const pages = []

      const half = Math.floor(maxPagesToShow / 2)
      let startPage = Math.max(1, props.currentPage - half)
      let endPage = Math.min(props.totalPages, props.currentPage + half)

      // Корректируем диапазон, чтобы всегда показывать `maxPagesToShow` страниц, если это возможно
      if (endPage - startPage + 1 < maxPagesToShow) {
        if (startPage === 1) {
          endPage = Math.min(props.totalPages, startPage + maxPagesToShow - 1)
        } else if (endPage === props.totalPages) {
          startPage = Math.max(1, endPage - maxPagesToShow + 1)
        }
      }

      for (let i = startPage; i <= endPage; i++) {
        pages.push(i)
      }

      return pages
    })

    const goToPage = (page) => {
      if (page < 1) page = 1
      if (page > props.totalPages) page = props.totalPages
      emit('page-change', page)
    }

    return {
      startRecord,
      endRecord,
      visiblePages,
      goToPage,
    }
  },
}
</script>

<style scoped>
.pagination .page-item.disabled .page-link {
  cursor: not-allowed;
}

.pagination .page-item.active .page-link {
  background-color: #007bff;
  color: white;
  border-color: #007bff;
}
</style>
