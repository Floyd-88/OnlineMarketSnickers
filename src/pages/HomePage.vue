<script setup>
import CardList from '../components/CardsList.vue'
import FiltersSearch from '@/components/FiltersSearch.vue'

import { storeToRefs } from 'pinia'
import { useCounterStore } from '@/stores/root'

const rootStore = useCounterStore()
const { cards } = storeToRefs(rootStore)
</script>

<template>
  <div class="flex items-center justify-between mt-8 mb-8">
    <h2 class="text-3xl font-bold">Все кроссовки</h2>
    <FiltersSearch/>
  </div>

  <CardList
    :cards="cards"
    @onClickLikeCard="rootStore.addLikeCard"
    @onClickAddBasket="rootStore.addCardBasket"
  />
</template>
