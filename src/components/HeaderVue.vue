<script setup>
import { storeToRefs } from 'pinia'
import { useCounterStore } from '@/stores/root'

const rootStore = useCounterStore()
const { user } = storeToRefs(rootStore)

const props = defineProps({
  basketCardsUser: Array
})
</script>

<template>
  <header class="flex flex-col lg:flex-row justify-between items-center pt-10 px-12 pb-8 border-b-2 border-gray-300 relative">
    <div class="flex flex-col text-center m-auto pt-5 pb-5 lg:pb-0 sm:pt-0 sm:text-left sm:m-0 sm:flex-row items-center gap-4">
      <div>
        <router-link to="/"><img src="/logo.png" alt="" /></router-link>

      </div>
      <div>
        <router-link to="/"><h1 class="text-xl font-bold">Online Market Sneakers</h1></router-link>
        <router-link to="/"><h2 class="text-sm text-gray-400">Магазин лучших кроссовок</h2></router-link>
      </div>
    </div>
    <div>
      <ul class="flex gap-10 items-center text-gray-500">
        <li @click="$emit('openBasket', true)" class="flex gap-2 hover:text-black cursor-pointer font-medium">
          <img src="/icons/basket.svg" alt="" />
          <p class="flex">{{  props.basketCardsUser.reduce((accum, b) => accum + b.price, 0).toLocaleString() }} руб.</p>
        </li>
        <router-link to="/favorite">
          <li class="flex gap-2 hover:text-black cursor-pointer font-medium">
          <img src="/icons/heart.svg" alt="" />
          <p class="hidden sm:flex">Закладки</p>
        </li>
        </router-link>

        <router-link to="/profile">
          <li class="flex gap-2 hover:text-black cursor-pointer font-medium">
            <template v-if="user?.name">
              <img src="/icons/prof.svg" alt="" />
              <p class="hidden sm:flex">Профиль</p>
            </template>
            <template v-else>
              <img src="/icons/come.svg" alt="" />
              <p class="hidden sm:flex">Войти</p>
            </template>
          </li>
        </router-link>
      </ul>
    </div>

    <div v-if="user?.name" class="absolute right-0 top-0 flex pt-6 pr-12">
        <p class="pr-4">Здраствуйте, <span class="font-bold">{{ user?.login.substr(0, 1).toUpperCase() + user?.login.substr(1) }}</span></p>
        <a @click="rootStore.exitUser" class="font-bold text-gray-400 hover:text-gray-600" href="">Выход</a>
      </div>
  </header>
</template>
