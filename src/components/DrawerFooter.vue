<script setup>
import { inject } from 'vue';

let props = defineProps({
    bascketCards: Array
})

const buySnickers = inject('buySnickers')
</script>

<template>
    <div class="flex flex-col gap-4">
        <div class="flex">
            <p class="text-lg pr-2">Итого:</p>
            <div class="flex-1 border-b-2 border-dashed"></div>
            <p class="font-bold pl-2">{{ props.bascketCards.reduce((accum, b) => accum + b.price, 0)}} руб. </p>
        </div>
        <div class="flex">
            <p class="text-lg pr-2">Налог 5%:</p>
            <span class="flex-1 border-b-2 border-dashed"></span>
            <p class="font-bold pl-2">{{ (props.bascketCards.reduce((accum, b) => accum + b.price, 0) * 0.05).toFixed(2) }} руб.</p>
        </div>
        <button 
        :disabled="props.bascketCards.length === 0" 
        @click="buySnickers()"
        class="flex items-center justify-center border w-full p-4 bg-lime-500 rounded-2xl text-white font-semibold hover:bg-lime-600 transition relative disabled:bg-gray-300">Оформить заказ <img class="absolute right-5" src="/icons/next.svg" alt="next"></button>
    </div>
</template>