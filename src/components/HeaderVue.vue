<script setup>
const props = defineProps({
  bascketCards: Array
})
</script>

<template>
  <header class="flex justify-between items-center pt-10 px-12 pb-8 border-b-2 border-gray-300">
    <div class="flex items-center gap-4">
      <div>
        <img src="/logo.png" alt="" />
      </div>
      <div>
        <h1 class="text-xl font-bold">Online Market Snickers</h1>
        <h2 class="text-sm text-gray-400">Магазин лучших кроссовок</h2>
      </div>
    </div>
    <div>
      <ul class="flex gap-10 text-gray-500">
        <li @click="$emit('openBasket', true)" class="flex gap-2 hover:text-black cursor-pointer font-medium">
          <img src="/icons/basket.svg" alt="" />
          <p>{{  props.bascketCards.reduce((accum, b) => accum + b.price, 0).toLocaleString() }} руб.</p>
        </li>
        <li class="flex gap-2 hover:text-black cursor-pointer font-medium">
          <img src="/icons/heart.svg" alt="" />
          <p>Закладки</p>
        </li>
        <li class="flex gap-2 hover:text-black cursor-pointer font-medium">
          <img src="/icons/prof.svg" alt="" />
          <p>Профиль</p>
        </li>
      </ul>
    </div>
  </header>
</template>
