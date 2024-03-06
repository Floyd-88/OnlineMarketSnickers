<script setup>
// import { ref } from 'vue';
import CardVue from './CardVue.vue';

// import { storeToRefs } from 'pinia'
// import { useCounterStore } from '@/stores/root'

// const rootStore = useCounterStore()
// const { paginations } = storeToRefs(rootStore)

const emit = defineEmits(['onClickLikeCard', 'onClickAddBasket'])

defineProps({
  cards: Object
})

// const current_page = ref(paginations?.value?.current_page)
// const total_pages = ref(paginations?.value?.total_pages)

function onClickLikeCard(card) {
  emit('onClickLikeCard', card)
}

function onClickAddBasket(card) {
  emit('onClickAddBasket', card)
}
</script>

<template>
  <div v-auto-animate class="grid xl:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-12 pb-8">
    <CardVue 
      v-for="card in cards" :key="card.id"
      :card="card"
      @onClickAddBasket="onClickAddBasket(card)"
      @onClickLikeCard="onClickLikeCard(card)"/>
  </div>
</template>