<script setup>
import CardVue from './CardVue.vue';

defineProps({
  cards: Array
})

function onClickisAddBasket() {
  alert('Добавить в корзину')
}

function onClickLikeCard() {
  alert('Добавить в закладки')
}
</script>

<template>
  <div class="grid grid-cols-4 gap-12 pb-8">
    <CardVue v-for="card in cards" :key="card.id"
      :photoSnickers="card.photo" 
      :nameSnickers="card.name" 
      :priceSnickers="card.price.toLocaleString()" 
      :isAddBasket="false" 
      :isLikeCard="false"
      :onClickLikeCard="onClickLikeCard"
      :onClickisAddBasket="onClickisAddBasket"/>
  </div>
</template>
