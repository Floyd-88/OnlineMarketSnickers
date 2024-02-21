<script setup>
import {ref} from 'vue'

import { Swiper, SwiperSlide } from "swiper/vue";
import { Pagination, Navigation } from 'swiper/modules';
const modules = [Pagination, Navigation]

import 'swiper/css';
import 'swiper/css/navigation';

const images = ref([{
          id: 1,
          imageUrl: '/baner/baner_1.png'
        },
        {
          id: 2,
          imageUrl: '/baner/baner_1.png'
        },
        {
          id: 3,
          imageUrl: '/baner/baner_1.png'
        }
])

</script>

<template>
        <swiper 
        style="margin: 0 110px;"
        class="mt-8"
        :modules="modules"
        :centeredSlides="true"
        :loop="true"  
        :grabCursor="true"
        :navigation="{ nextEl: '.nextArrow', prevEl: '.prevArrow'}"
    >
           


            <swiper-slide class="relative" style="display: flex; justify-content: center;" v-for="image in images" :key="image.id">
                <img :src="image.imageUrl">  
                <div class="prevArrow hover:bg-gray-100 transition bg-white border rounded-full cursor-pointer absolute top-1/2 transform -translate-y-1/2 left-0 z-10"><img class="rotate-180 p-3 w-10 h-10" src="/icons/next_slider.svg" alt="next"></div>
                <div class="nextArrow hover:bg-gray-100 transition bg-white border rounded-full cursor-pointer absolute top-1/2 transform -translate-y-1/2 right-0 z-10"><img class="p-3 w-10 h-10" src="/icons/next_slider.svg" alt="next"></div>
            </swiper-slide>     
        </swiper>
</template>
