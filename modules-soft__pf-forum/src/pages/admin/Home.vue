<template>
  <div class="mt-4">
    <FurnaceDataForm />
    <FurnaceInput />
    <ElectrodeLayout />
    <FurnaceResults />
  </div>
</template>

<script setup>
import FurnaceDataForm from "./FurnaceDataForm.vue";
import FurnaceInput from "./FurnaceInput.vue";
import ElectrodeLayout from "./ElectrodeLayout.vue";
import FurnaceResults from "./FurnaceResults.vue";
</script>
