<script setup>
import CardVue from './CardVue.vue';

const emit = defineEmits(['onClickLikeCard', 'onClickAddBasket'])

defineProps({
  cards: Array
})

function onClickLikeCard(card) {
  emit('onClickLikeCard', card)
}

function onClickAddBasket(card) {
  emit('onClickAddBasket', card)
}
</script>

<template>
  <div  class="grid grid-cols-4 gap-12 pb-8">
    <CardVue 
      v-for="card in cards" :key="card.id"
      :card="card"
      @onClickAddBasket="onClickAddBasket(card)"
      @onClickLikeCard="onClickLikeCard(card)"/>
  </div>
</template>
