<script setup>
import HeaderVue from './components/HeaderVue.vue'
import DrawerVue from './components/DrawerVue.vue'
import SwiperSlider from './components/SwiperSlider.vue';

import { provide } from 'vue'
import { onMounted } from 'vue'


import { storeToRefs } from 'pinia';
import { useCounterStore } from '@/stores/root'

const rootStore = useCounterStore();
const { statusBasket, isShowBasket, basketCardsUser } = storeToRefs(rootStore)

//открыть корзину
function openBasket(bool) {
  isShowBasket.value = bool;

  bool
    ? (document.documentElement.style.overflow = 'hidden')
    : (document.documentElement.style.overflow = 'auto')

  if(statusBasket.value.statusTitle === 'Заказ оформлен!') {
    statusBasket.value.statusImg = '/basket.svg'
    statusBasket.value.statusTitle = 'Корзина пустая'
    statusBasket.value.statusDesc = 'Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ.'
  }
}

onMounted(() => {
  rootStore.getCards()
})

provide('openBasket', openBasket)
</script>

<template>
  <div v-if="isShowBasket" class="fixed top-0 left-0 bg-black z-10 w-full h-full opacity-70"></div>
  <DrawerVue v-if="isShowBasket" :basketCardsUser="basketCardsUser" :statusBasket="statusBasket" />
  
  <div class="w-4/5 m-auto bg-white rounded-t-xl mt-16 shadow-2xl">
    <HeaderVue @openBasket="openBasket" :basketCardsUser="basketCardsUser" />
    
    <SwiperSlider/>


    <div class="px-12">
      <router-view></router-view>
    </div>
  </div>
</template>