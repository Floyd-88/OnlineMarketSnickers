<script setup>
import { inject } from 'vue';

defineProps({
    bascketCard: Object
})



const addCardBasket = inject('addCardBasket')


</script>

<template>
    <div class="flex items-center border rounded-xl p-2">
        <img class="w-20 h-20" :src="bascketCard.photo" alt="snickers">
        <div class="flex ml-2">
            <div class="flex flex-col flex-1">
                <p>{{ bascketCard.name }} </p>
                <p class="font-bold">{{ bascketCard.price }} руб.</p>

            </div>
            <div class="flex items-end mt-2">
                <img @click="addCardBasket(bascketCard)" class=" w-7 h-7 cursor-pointer hover:scale-125 transition" src="/icons/remove.svg" alt="">
            </div>
        </div>
    </div>
</template>