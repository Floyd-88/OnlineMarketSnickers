<script setup>
import {watch} from 'vue'
import { storeToRefs } from 'pinia'
import { useCounterStore } from '@/stores/root'

const rootStore = useCounterStore()
const { filters } = storeToRefs(rootStore)

watch(filters.value, () => {
  rootStore.getCards()
})
</script>

<template>
     <div class="flex gap-4">
      <select
        v-model="filters.optionsCard"
        class="border rounded-lg outline-none focus:border-gray-600"
      >
        <option value="name">По названия</option>
        <option value="price">По цене (возрастание)</option>
        <option value="-price">По цене (уменьшение)</option>
      </select>
      <div class="relative">
        <img class="absolute left-3 inset-1/3" src="/icons/search.svg" alt="search" />
        <input
          v-model="filters.searchName"
          class="h-8 w-52 border border-gray-200 rounded-lg py-5 pl-10 outline-none focus:border-gray-600"
          placeholder="Поиск..."
          type="text"
        />
      </div>
    </div>
</template>