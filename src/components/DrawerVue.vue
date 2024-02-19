<script setup>
import DrawerHeader from './DrawerHeader.vue'
import DrawerCardsList from './DrawerCardsList.vue'
import DrawerFooter from './DrawerFooter.vue'

defineProps({
    bascketCards: Array,
})

</script>

<template>
    <div class="flex flex-col w-96 bg-white h-full fixed top-0 right-0 z-20 p-6">
        <DrawerHeader/>
        <DrawerCardsList :bascketCards="bascketCards"/>
        <DrawerFooter :bascketCards="bascketCards"/>
    </div>
</template>