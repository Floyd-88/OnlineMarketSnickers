<script setup>
import { useRouter, useRoute } from 'vue-router'
import ButtonVue from './buttons/ButtonVue.vue';

const router = useRouter()
const route = useRoute()

defineProps({
    statusPage: Object
})
</script>

<template>
    <div class="flex flex-col items-center pt-28 pb-32">
        <img class="w-32 h-32 mb-10" :src="statusPage.smile" alt="smile">
        <h2 class="text-3xl font-semibold mb-2">{{ statusPage.title }}</h2>
        <p class="text-xl text-center mb-10">{{ statusPage.text }}</p>
        <ButtonVue v-if="route.name !== 'home'" @click="router.go(-1)"/>
    </div>
</template>