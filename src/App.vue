<script setup>
import HeaderVue from './components/HeaderVue.vue'
import DrawerVue from './components/DrawerVue.vue'
import SwiperSlider from './components/SwiperSlider.vue'
import AuthorizationModal from './components/authorization/AuthorizationModal.vue'
import RegisterVue from './components/authorization/RegisterVue.vue'

import { provide } from 'vue'
import { onMounted } from 'vue'

import { storeToRefs } from 'pinia'
import { useCounterStore } from '@/stores/root'
import { useRoute } from 'vue-router'

const route = useRoute()

const rootStore = useCounterStore()
const { statusBasket, isShowBasket, basketCardsUser, user, showAuto, showReg, successReg, errorAuth, likeCardsUser, isShowPhoto } = storeToRefs(rootStore)

//открыть корзину
function openBasket(bool) {
  isShowBasket.value = bool

  bool
    ? (document.documentElement.style.overflow = 'hidden')
    : (document.documentElement.style.overflow = 'auto')

  if (statusBasket.value.statusTitle === 'Заказ оформлен!') {
    statusBasket.value.statusImg = '/basket.svg'
    statusBasket.value.statusTitle = 'Корзина пустая'
    statusBasket.value.statusDesc = 'Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ.'
  }
}

onMounted(() => {
  rootStore.getCards()
  user.value = JSON.parse(localStorage.getItem('user'))
  likeCardsUser.value = localStorage.getItem('likeCards') ? JSON.parse(localStorage.getItem('likeCards')) : []
  basketCardsUser.value = localStorage.getItem('basket') ? JSON.parse(localStorage.getItem('basket')) : []
})

provide('openBasket', openBasket)
</script>

<template>
  <div @click="showAuto=false, successReg=false, showReg=false, errorAuth='', isShowPhoto=false" v-if="isShowBasket || showAuto || showReg || isShowPhoto" class="fixed top-0 left-0 bg-black z-10 w-full h-full opacity-70"></div>
  <DrawerVue v-if="isShowBasket" :basketCardsUser="basketCardsUser" :statusBasket="statusBasket" />
  <template v-if="!user?.name">
    <template v-if="showAuto">
      <AuthorizationModal />
    </template>
    <template v-if="showReg">
      <RegisterVue />
    </template>
  </template>

  <div class="w-4/5 m-auto bg-white rounded-t-xl mt-16 shadow-2xl">
    <HeaderVue @openBasket="openBasket" :basketCardsUser="basketCardsUser" />

    <SwiperSlider v-if="route.name !== 'sneakers'"/>

    <div class="px-12">
      <router-view></router-view>
    </div>
  </div>
</template>
