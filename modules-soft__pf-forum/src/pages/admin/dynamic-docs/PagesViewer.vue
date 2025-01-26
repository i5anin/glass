<template>
  <div>
    <InfoComponent :targetComponent="PagesClients" />
  </div>
</template>

<script setup>
import PagesClients from '@/pages/form-2/PagesClientNoms.vue'
import InfoComponent from './InfoComponent.vue'
</script>
