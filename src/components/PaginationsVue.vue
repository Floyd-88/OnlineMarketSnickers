<script setup>
defineProps({
    clickNumPage: Function,
    total_pages: Number,
    current_page: Number
})
</script>
<template>
        <ul v-if="total_pages > 1" class="flex justify-center pb-10">
        <li class="border text-lg px-3 py-1 bg-lime-100 hover:bg-lime-200 cursor-pointer active:bg-lime-300"
            @click="clickNumPage(current_page - 1 < 1 ? 1 : current_page - 1)" >
            Назад
        </li>
        <li class="border text-lg px-3 py-1 bg-lime-100 hover:bg-lime-200 cursor-pointer active:bg-lime-300"
        v-for="i in total_pages" :key="i"
        :class="{ 'active': current_page === i }"
        @click="clickNumPage(i)">{{ i }}</li>
        <li  class="border text-lg px-3 py-1 bg-lime-100 hover:bg-lime-200 cursor-pointer active:bg-lime-300"
            @click="clickNumPage(current_page + 1 > total_pages ? total_pages : current_page + 1)">
            Вперед
        </li>
    </ul>
</template>

<style>
.active {
@apply bg-lime-300 hover:bg-lime-300;
}
</style>