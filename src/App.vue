<script setup>
import HeaderVue from './components/HeaderVue.vue'
import CardList from './components/CardsList.vue'
import DrawerVue from './components/DrawerVue.vue'
import axios from 'axios'
import { ref, reactive, onMounted, watch } from 'vue'

const cards = ref([])

const filters = reactive({
  searchName: '',
  optionsCard: 'name'
})

async function getCards() {
  try {
    let params = {
        sortBy: filters.optionsCard
    }
    if(filters.searchName) {
        params.name = `*${filters.searchName}*`
    }
    await axios
      .get('https://f774087b0dcc15d2.mokky.dev/cards', {
        params
      })
      .then((response) => {
        cards.value = response.data
        })
    
  } catch (err) {
    console.log(err)
  }
}

let isShowBasket = ref(false)

function openBasket(bool) {
  isShowBasket.value = bool
}

onMounted(() => {
    getCards()
})

watch(filters, () => {
    getCards()
    })
</script>

<template>
  <div v-if="isShowBasket">
    <DrawerVue />
  </div>
  <div class="w-4/5 m-auto bg-white rounded-t-xl mt-16 shadow-2xl">
    <HeaderVue @openBasket="openBasket" />

    <div class="px-12">
      <div class="flex items-center justify-between mt-8 mb-8">
        <h2 class="text-3xl font-bold">Все кроссовки</h2>

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
      </div>

      <CardList :cards="cards" />
    </div>
  </div>
</template>

<style scoped></style>
