<script setup>
defineProps({
    photoSnickers: String,
    nameSnickers: String,
    priceSnickers: String,
    isAddBasket: Boolean,
    isLikeCard: Boolean,
    onClickisAddBasket: Function,
    onClickLikeCard: Function
})
</script>
<template>
       <div class="flex flex-col border rounded-3xl p-8 relative cursor-pointer transition hover:shadow-xl hover:-translate-y-4">
            <img class=" w-8 absolute top-8 left-8 hover:scale-125" @click="onClickLikeCard" :src="!isAddBasket ? '/icons/like_1.svg' : '/icons/like_2.svg'" alt="like">
            <div class="flex justify-center">
                <img class="flex w-32" :src="photoSnickers" alt="snickers">
            </div>
            <p class="mt-4 flex justify-center">{{ nameSnickers }}</p>
            <div class="flex justify-between mt-4">
                <div class="flex flex-col">
                    <span class="text-gray-400">Цена:</span>
                    <span class="font-bold">{{ priceSnickers }} руб.</span>
                </div>
                <div class="flex items-center">
                    <button @click="onClickisAddBasket"><img class="hover:scale-125"  :src="!isAddBasket ? '/icons/plus_1.svg' : '/icons/plus_2.svg'" alt="plus"></button>
                </div>
            </div>
        </div>
</template>