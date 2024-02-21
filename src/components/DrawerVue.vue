<script setup>
import DrawerHeader from './DrawerHeader.vue'
import DrawerCardsList from './DrawerCardsList.vue'
import DrawerFooter from './DrawerFooter.vue'
import StatusBasket from './StatusBasket.vue';

defineProps({
    basketCardsUser: Array,
    statusBasket: Object
})

</script>

<template>
    <div class="flex flex-col w-96 bg-white h-full fixed top-0 right-0 z-20 p-6">
        <DrawerHeader/>

        <template v-if="basketCardsUser.length === 0">
            <StatusBasket  :statusImg="statusBasket.statusImg" :statusTitle="statusBasket.statusTitle" :statusDesc="statusBasket.statusDesc"/>
        </template>
        <template v-else>
            <DrawerCardsList :basketCardsUser="basketCardsUser"/>
            <DrawerFooter :basketCardsUser="basketCardsUser"/>
        </template>

    </div>
</template>