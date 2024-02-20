<script setup>
import { inject } from 'vue';

defineProps({
    basketCard: Object
})



const addCardBasket = inject('addCardBasket')


</script>

<template>
    <div class="flex items-center border rounded-xl p-2">
        <img class="w-20 h-20" :src="basketCard.photo" alt="snickers">
        <div class="flex ml-2">
            <div class="flex flex-col flex-1">
                <p>{{ basketCard.name }} </p>
                <p class="font-bold">{{ basketCard.price }} руб.</p>

            </div>
            <div class="flex items-end mt-2">
                <img @click="addCardBasket(basketCard)" class=" w-7 h-7 cursor-pointer hover:scale-125 transition" src="/icons/remove.svg" alt="">
            </div>
        </div>
    </div>
</template>