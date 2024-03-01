<script setup>
import { ref } from 'vue'
// import SwiperSlider from '@/components/SwiperSlider.vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation } from 'swiper/modules'
const modules = [Navigation]

import 'swiper/css'
import 'swiper/css/navigation'

const images = ref([
  {
    id: 1,
    imageUrl: '/snickers/1/1.jpeg'
  },
  {
    id: 2,
    imageUrl: '/snickers/1/2.jpeg'
  },
  {
    id: 3,
    imageUrl: '/snickers/1/3.jpeg'
  },
  {
    id: 4,
    imageUrl: '/snickers/1/4.jpeg'
  }
])
</script>

<template>
  <div class="dark:text-gray-400 mt-8">
    <div class="mb-1 flex justify-between">
      <div class="pr-2">
        <h3 class="text-base font-bold">Puma</h3>
        <h3 class="text-base md:text-2xl font-bold">Кроссовки Puma X Aka Boku Future Rider</h3>
      </div>
      <button
        class="px-2 py-1 h-max border-2 text-white font-semibold border-lime-500 bg-lime-500 hover:bg-lime-600 shadow-md"
      >
        вернуться назад
      </button>
    </div>
    <!-- <div>{{ anime.aired?.from?.toLocaleString().slice(0, 4) }} | {{ anime.rating }}</div> -->
    <div>
      <ul class="flex my-2">
        <li
          class="px-2 py-1 border border-indigo-500 bg-indigo-500 font-bold text-2xl text-white"
        >
          10 449 руб.
        </li>
      </ul>
    </div>

    <div class="mt-3">
      <div class="flex flex-col items-center sm:flex-row sm:space-x-2 h-80">
        <div class="basis-3/6 h-full border pb-2 mr-4 sm:pb-0">
          <img
            class="flex items-center justify-center w-auto h-full"
            src="/snickers/snickers_1.jpg"
          />
        </div>

        <div class="flex flex-col justify-between basis-3/6 overflow-hidden h-full">
          <swiper
            class=""
            style="width: 100%; display: flex; flex: 0 1 auto"
            :modules="modules"
            :space-between="50"
            :centeredSlides="true"
            :loop="true"
            :navigation="{ nextEl: '.nextArrow', prevEl: '.prevArrow' }"
          >
            <swiper-slide
              class=""
              style="display: flex; justify-content: center"
              v-for="image in images"
              :key="image.id"
            >
              <img class="rounded-3xl" :src="image.imageUrl" />
            </swiper-slide>
            <div
              class="prevArrow hover:bg-indigo-500 transition bg-indigo-400 shadow-md rounded-full cursor-pointer absolute top-1/2 transform -translate-y-1/2 left-0 z-10"
            >
              <img class="rotate-180 p-3 w-10 h-10" src="/icons/next_slider.svg" alt="next" />
            </div>
            <div
              class="nextArrow hover:bg-indigo-500 transition bg-indigo-400 shadow-md rounded-full cursor-pointer absolute top-1/2 transform -translate-y-1/2 right-0 z-10"
            >
              <img class="p-3 w-10 h-10" src="/icons/next_slider.svg" alt="next" />
            </div>
          </swiper>

          <div class="mt-2 flex flex-row gap-3">
            <div
              class="basis-1/2 gap-2 flex justify-center items-center p-2 rounded-md border-2 border-green-500 hover:bg-green-200 cursor-pointer transition active:bg-green-300"
            >
              <div class="font-bold text-xl">
                <span>Добавить в закладки</span>
              </div>
            </div>

            <div
              class="basis-1/2 gap-2 flex justify-center items-center p-2 rounded-md border-2 border-blue-500 hover:bg-indigo-200 cursor-pointer transition active:bg-indigo-300"
            >
              <div class="flex items-center">
                <span class="font-bold text-xl">Купить</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="mt-4">

        <div class="flex flex-col mt-10 lg:flex-row lg:space-x-2">
          <div class="basis-1/3 pr-2">
            <h2 class="text-2xl font-bold mb-2">Характеристики</h2>
            <ul>
              <li class="mb-2 py-1 text-base border-t border-indigo-500 font-medium">
                Пол: <span class="font-light">мужской</span>
              </li>
              <li class="mb-2 py-1 text-base border-t border-indigo-500 font-medium">
                Сезон: <span class="font-light">лето</span>
              </li>
              <li class="mb-2 py-1 text-base border-t border-indigo-500 font-medium">
                Срок гарантии:
                <span class="font-light">12 месяцев</span>
              </li>
              <li class="mb-2 py-1 text-base border-t border-indigo-500 font-medium">
                Материал верха:
                <span class="font-light">63% полиэстер, 37% синтетическая кожа</span>
              </li>
              <li class="mb-2 py-1 text-base border-t border-indigo-500 font-medium">
                Материал подкладки:
                <span class="font-light">100% полиэстер</span>
              </li>
              <li class="mb-2 py-1 text-base border-t border-indigo-500 font-medium">
                Материал подошвы:
                <span class="font-light">термопластичная резина</span>
              </li>
              <li class="mb-2 py-1 text-sm border-t border-indigo-500 font-medium">
                Страна производства:
                <span class="font-light">Китай</span>
              </li>
            </ul>
          </div>
          <div class="basis-3/4">
            <h2 class="text-2xl font-bold mb-2">Описание товара</h2>
            <div>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Recusandae autem, temporibus
              saepe iste nostrum minus numquam cum sit. Dolor, nulla ipsam alias exercitationem
              deserunt odio tempora dicta deleniti impedit reiciendis ab debitis maiores ratione,
              dolorum at ad aliquam saepe reprehenderit! Modi voluptate voluptas dolores cupiditate
              eius esse quis tempore facere.
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
