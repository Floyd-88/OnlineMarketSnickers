<script setup>
import DrawerCard from './DrawerCard.vue'

defineProps({
  basketCards: Array
})
</script>

<template>
  <div v-auto-animate class="flex flex-col mt-6 gap-6 flex-1 overflow-y-auto mb-4 pb-2">
    <DrawerCard 
      v-for="basketCard in basketCards" :key="basketCard.id" 
      :basketCard="basketCard"/>
  </div>
</template>
