<template>
  <div>
    <Navbar />
    <div class="container-fluid">
      <router-view />
    </div>
  </div>
</template>

<script setup>
import Navbar from '@/modules/_main/components/Navbar.vue'
</script>

<style>
body {
  background-color: #e6e6e6 !important;
}

.table > tbody > tr:hover > td {
  background-color: #f3f8ff !important; /* Светло-голубой цвет при наведении */
}
</style>
