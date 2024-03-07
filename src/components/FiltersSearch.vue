<script setup>
import { storeToRefs } from 'pinia'
import { useCounterStore } from '@/stores/root'

const rootStore = useCounterStore()
const { filters } = storeToRefs(rootStore)
</script>

<template>
     <div class="flex gap-4 flex-col w-full md:w-auto lg:flex-row">
      <select
        v-model="filters.optionsCard"
        class="border h-10 rounded-lg outline-none focus:border-gray-600"
      >
        <option value="name">По названия</option>
        <option value="price">По цене (возрастание)</option>
        <option value="-price">По цене (уменьшение)</option>
      </select>
      <div class="relative">
        <img class="absolute left-3 inset-1/3" src="/icons/search.svg" alt="search" />
        <input
          v-model="filters.searchName"
          class="h-8 md:w-52 w-full border border-gray-200 rounded-lg py-5 pl-10 outline-none focus:border-gray-600"
          placeholder="Поиск..."
          type="text"
        />
      </div>
    </div>
</template>