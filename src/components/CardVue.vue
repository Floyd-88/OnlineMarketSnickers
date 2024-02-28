<script setup>
import {useRoute} from 'vue-router'
defineProps({
card: Object
})

const route = useRoute()
</script>
<template>
       <div class="flex flex-col border rounded-3xl p-8 relative cursor-pointer transition hover:shadow-xl hover:-translate-y-4">
            <img v-if="route.name !== 'profile'" class=" w-8 absolute top-8 left-8 hover:scale-125" @click="$emit('onClickLikeCard')" :src="!card.isLikeCard ? '/icons/like_1.svg' : '/icons/like_2.svg'" alt="like">
            <div class="flex justify-center">
                <img class="flex w-32" :src="card.photo" alt="snickers">
            </div>
            <p class="mt-4 flex justify-center">{{ card.name }}</p>
            <div class="flex justify-between mt-4">
                <div class="flex flex-col">
                    <span class="text-gray-400">Цена:</span>
                    <span class="font-bold">{{ card.price.toLocaleString() }} руб.</span>
                </div>
                <div class="flex items-center">
                    <button class="w-7 h-7" @click="$emit('onClickAddBasket')"><img class="hover:scale-125"  :src="!card.isAddBasket ? '/icons/plus_1.svg' : '/icons/plus_2.svg'" alt="plus"></button>
                </div>
            </div>
        </div>
</template>