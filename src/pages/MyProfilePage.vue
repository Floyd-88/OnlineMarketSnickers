<script setup>
import CardList from '../components/CardsList.vue'

import { storeToRefs } from 'pinia'
import { useCounterStore } from '@/stores/root'
import NotOrders from '@/components/NotOrders.vue'
import { onMounted } from 'vue'

const rootStore = useCounterStore()
const { buyCards, statusPage } = storeToRefs(rootStore)
onMounted(()=> rootStore.getOrderCards())
</script>

<template>
  <div class="flex items-center justify-between mt-8 mb-8">
    <h2 class="text-3xl font-bold">Мои покупки</h2>
  </div>
  <template v-if="buyCards.length > 0">
    <div class="border-b mb-8" v-for="(cards, index) in buyCards"
    :key="index"
    >
    <CardList
    :cards="cards"
    @onClickLikeCard="rootStore.addLikeCard"
    @onClickAddBasket="rootStore.addCardBasket"
  />
    </div>

  </template>


  <NotOrders v-else :statusPage="statusPage.statusOrders" />
</template>
