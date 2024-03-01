<script setup>
import { useRoute } from 'vue-router'
defineProps({
  card: Object
})

const route = useRoute()
</script>
<template>
  <div
    class="flex flex-col border rounded-3xl p-8 relative transition hover:shadow-xl hover:-translate-y-4"
  >
    <img
      v-if="route.name !== 'profile'"
      class="w-8 absolute top-8 left-8 hover:scale-125 cursor-pointer"
      @click="$emit('onClickLikeCard')"
      :src="!card.isLikeCard ? '/icons/like_1.svg' : '/icons/like_2.svg'"
      alt="like"
    />
    <router-link to="/snickers">
      <div class="flex justify-center">
        <img class="flex w-32 cursor-pointer" :src="card.photo" alt="snickers" />
      </div>
    </router-link>
    <router-link to="/snickers"
      ><p class="mt-4 flex justify-center cursor-pointer hover:text-gray-500">{{ card.name }}</p></router-link
    >
    <div class="flex justify-between mt-4">
      <div class="flex flex-col">
        <span class="text-gray-400">Цена:</span>
        <span class="font-bold">{{ card.price.toLocaleString() }} руб.</span>
      </div>
      <div class="flex items-center" v-if="route.name !== 'profile'">
        <button class="w-7 h-7" @click="$emit('onClickAddBasket')">
          <img
            class="hover:scale-125 cursor-pointer"
            :src="!card.isAddBasket ? '/icons/plus_1.svg' : '/icons/plus_2.svg'"
            alt="plus"
          />
        </button>
      </div>
    </div>
  </div>
</template>
