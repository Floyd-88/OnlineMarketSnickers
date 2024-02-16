<script setup>
import DrawerHeader from './DrawerHeader.vue'
import DrawerCardsList from './DrawerCardsList.vue'
import DrawerFooter from './DrawerFooter.vue'


</script>

<template>
    <div class="absolute top-0 left-0 bg-black z-10 w-full h-full opacity-70"></div>

    <div class="flex flex-col w-96 bg-white h-full fixed top-0 right-0 z-20 p-6">
        <DrawerHeader/>
        <DrawerCardsList/>
        <DrawerFooter/>
    </div>
</template>