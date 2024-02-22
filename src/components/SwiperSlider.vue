<script setup>
import {ref} from 'vue'

import { Swiper, SwiperSlide } from "swiper/vue";
import {Navigation } from 'swiper/modules';
const modules = [Navigation]

import 'swiper/css';
import 'swiper/css/navigation';

const images = ref([{
          id: 1,
          imageUrl: '/baner/baner_1.png'
        },
        {
          id: 2,
          imageUrl: ''
        },
        {
          id: 3,
          imageUrl: '/baner/baner_1.png'
        }
])

</script>

<template>
        <swiper 
        class="rounded-2xl"
        style="margin: 0 110px; margin-top: 35px;"
        :modules="modules"
        :centeredSlides="true"
        :loop="true"  
        :navigation="{ nextEl: '.nextArrow', prevEl: '.prevArrow'}"
    >
            <swiper-slide class="relative" style="display: flex; justify-content: center;" v-for="image in images" :key="image.id">
                <div class="rounded-2xl flex justify-between" style="width: 960px; height: 300px; background-color: #F4EFE9;">
                    <div class="flex flex-col">
                        <img class="w-40 p-4" src="/brand.png" alt="brand">
                        <div class="pl-20">
                            <h2 class="text-4xl opacity-80 mb-6 font-bold"><span class="text-lime-600">Stan Smith</span>, <br> Forever!</h2>
                            <button class="barder opacity-80 rounded-3xl bg-lime-600 text-white text-lg py-2 px-12" type="button">Купить</button>
                        </div>
                    </div>
                    <div>
                        <img :src="image.imageUrl">
                    </div>
                </div> 
            </swiper-slide>  
            <div class="prevArrow hover:bg-gray-100 transition bg-white border rounded-full cursor-pointer absolute top-1/2 transform -translate-y-1/2 left-0 z-10"><img class="rotate-180 p-3 w-10 h-10" src="/icons/next_slider.svg" alt="next"></div>
                <div class="nextArrow hover:bg-gray-100 transition bg-white border rounded-full cursor-pointer absolute top-1/2 transform -translate-y-1/2 right-0 z-10"><img class="p-3 w-10 h-10" src="/icons/next_slider.svg" alt="next"></div>   
        </swiper>
</template>
