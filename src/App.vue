<script setup>
import HeaderVue from './components/HeaderVue.vue'
import CardList from './components/CardsList.vue'
import DrawerVue from './components/DrawerVue.vue'
</script>

<template>
  <div v-if="true">
    <DrawerVue />
  </div>
  <div class="w-4/5 m-auto bg-white rounded-t-xl mt-16 shadow-2xl">
    <HeaderVue />

    <div class="px-12">
      <div class="flex items-center justify-between mt-8 mb-8">
        <h2 class="text-3xl font-bold">Все кроссовки</h2>
        <div class="relative">
          <img class="absolute left-3 inset-1/3" src="/icons/search.svg" alt="search" />
          <input
            class="h-8 w-52 border border-gray-200 rounded-lg py-5 pl-10"
            placeholder="Поиск..."
            type="text"
          />
        </div>
      </div>

      <CardList />
    </div>
  </div>
</template>

<style scoped></style>
