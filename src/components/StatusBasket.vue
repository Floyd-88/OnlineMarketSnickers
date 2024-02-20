<script setup>
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
    <button @click="openBasket(false)" class="flex items-center gap-5 border rounded-2xl bg-lime-500 text-white font-semibold text-lg py-4 px-7  hover:bg-lime-600 transition ">
      <svg
        width="16"
        height="14"
        viewBox="0 0 16 14"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M14.7144 7L1.00007 7"
          stroke="white"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M7 13L1 7L7 1"
          stroke="white"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
      Вернуться назад
    </button>
  </div>
</template>
