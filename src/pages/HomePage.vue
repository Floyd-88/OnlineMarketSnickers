<script setup>
import { watch, ref } from 'vue'

import CardList from '../components/CardsList.vue'
import FiltersSearch from '@/components/FiltersSearch.vue'
import NotOrders from '@/components/NotOrders.vue'
import PaginationsVue from '@/components/PaginationsVue.vue'

import debounce from 'lodash.debounce'

import { storeToRefs } from 'pinia'
import { useCounterStore } from '@/stores/root'

const rootStore = useCounterStore()
const { cards, statusPage, paginations, filters, isLoaded } = storeToRefs(rootStore)

const loadArray = ref('')

watch(() => filters.value.searchName, debounce(rootStore.getCards, 300))
watch(() => filters.value.optionsCard, rootStore.getCards)

function loaded(n) {
  let arr = ['.', '..', '...']
  loadArray.value = arr[n]
}

let timerID = ''
function startInterval() {
  let n = 0
  timerID = setInterval(() => {
    if (n > 2) n = 0
    loaded(n)
    n++
    console.log(n)
  }, 300)
}
startInterval()

watch(isLoaded, () => {
  if (!isLoaded.value) {
    clearInterval(timerID)
  } else {
    startInterval()
  }
})

</script>

<template>
  <div class="flex flex-col md:flex-row items-center justify-between mt-8 mb-8">
    <h2 class="text-xl sm:text-3xl font-bold mb-6 md:mb-0">Все кроссовки</h2>
    <FiltersSearch />
  </div>

  <CardList
    v-if="cards.length > 0"
    :cards="cards"
    @onClickLikeCard="rootStore.addLikeCard"
    @onClickAddBasket="rootStore.addCardBasket"
  />
  <div v-if="isLoaded" class="flex justify-center p-8 font-semibold text-lg">Загрузка{{ loadArray }}</div>
  <NotOrders v-if="cards.length === 0 && !isLoaded" :statusPage="statusPage.statusSneakers" />
  <PaginationsVue
    :clickNumPage="rootStore.getCards"
    :total_pages="paginations?.total_pages"
    :current_page="paginations?.current_page"
  />
</template>
