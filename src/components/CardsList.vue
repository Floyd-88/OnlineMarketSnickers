<script setup>
import CardVue from './CardVue.vue';

function onClickisAddBasket() {
  alert('Добавить в корзину')
}

function onClickLikeCard() {
  alert('Добавить в закладки')
}
</script>

<template>
  <div class="grid grid-cols-4 gap-12 pb-8">
    <CardVue 
      :photoSnickers="'/snickers/snickers_1.jpg'" 
      :nameSnickers="'Мужские Кроссовки Nike Blazer Mid Suede'" 
      :priceSnickers="'12 999'" 
      :isAddBasket="false" 
      :isLikeCard="false"
      :onClickLikeCard="onClickLikeCard"
      :onClickisAddBasket="onClickisAddBasket"/>
  </div>
</template>
