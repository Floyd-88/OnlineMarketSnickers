<script setup>
import ButtonVue from './buttons/ButtonVue.vue';
import { inject } from 'vue';

defineProps({
  statusImg: String,
  statusTitle: String,
  statusDesc: String
})

const openBasket = inject('openBasket')
</script>

<template>
  <div class="flex flex-col h-full items-center text-center justify-center p-10">
    <img class="mb-4" :src="statusImg" alt="img status" />
    <h3 class="text-2xl font-bold mb-2">{{ statusTitle }}</h3>
    <p class="text-gray-400 mb-7">{{ statusDesc }}</p>

    <ButtonVue @click="openBasket(false)"/>
  </div>
</template>
