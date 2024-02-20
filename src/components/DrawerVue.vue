<script setup>
import DrawerHeader from './DrawerHeader.vue'
import DrawerCardsList from './DrawerCardsList.vue'
import DrawerFooter from './DrawerFooter.vue'
import StatusBasket from './StatusBasket.vue';

defineProps({
    basketCards: Array,
})

</script>

<template>
    <div class="flex flex-col w-96 bg-white h-full fixed top-0 right-0 z-20 p-6">
        <DrawerHeader/>

        <template v-if="basketCards.length === 0">
            <StatusBasket  :statusImg="'/basket.svg'" :statusTitle="'Корзина пустая'" :statusDesc="'Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ.'"/>
        </template>
        <template v-else>
            <DrawerCardsList :basketCards="basketCards"/>
            <DrawerFooter :basketCards="basketCards"/>
        </template>

    </div>
</template>