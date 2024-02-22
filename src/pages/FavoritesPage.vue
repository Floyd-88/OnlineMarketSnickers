<script setup>
import CardList from '../components/CardsList.vue'
import FiltersSearch from '@/components/FiltersSearch.vue'

import { storeToRefs } from 'pinia'
import { useCounterStore } from '@/stores/root'
import NotOrders from '@/components/NotOrders.vue';

const rootStore = useCounterStore()
const { likeCardsUser, statusPage } = storeToRefs(rootStore)
</script>

<template>
      <div class="flex items-center justify-between mt-8 mb-8">
    <h2 class="text-3xl font-bold">Закладки</h2>
    <FiltersSearch/>
  </div>

  <CardList
  v-if="likeCardsUser.length > 0"
    :cards="likeCardsUser"
    @onClickLikeCard="rootStore.addLikeCard"
    @onClickAddBasket="rootStore.addCardBasket"
  />

  <NotOrders v-else :statusPage="statusPage.statusFavorites"/>
</template>