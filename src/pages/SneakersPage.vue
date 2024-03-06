<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation } from 'swiper/modules'
import {ref} from 'vue'
const modules = [Navigation]

import 'swiper/css'
import 'swiper/css/navigation'
import { useRoute, useRouter } from 'vue-router';

import { storeToRefs } from 'pinia'
import { useCounterStore } from '@/stores/root'

const rootStore = useCounterStore()
const { sneakers, isShowPhoto } = storeToRefs(rootStore)

const route = useRoute()
const router = useRouter()

rootStore.getSneakers(route.query.id)

const fullImg = ref("")

function showFullImg(image) {
  isShowPhoto.value = true
  fullImg.value = image
}
</script>

<template>
  <div v-if="isShowPhoto" class="absolute max-w-xl h-auto bg-gray-200 z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
    <img class="h-full w-full" :src="fullImg" alt="image">
  </div>
  <div class="dark:text-gray-400 mt-8">
    <div class="mb-1 flex justify-between">
      <div class="pr-2">
        <h3 class="text-base font-bold">{{ sneakers?.brand || "" }}</h3>
        <h3 class="text-base md:text-2xl font-bold">{{ sneakers?.name || "" }}</h3>
      </div>
      <button
        class="px-2 py-1 h-max border-2 text-white font-semibold border-lime-500 bg-lime-500 hover:bg-lime-600 shadow-md"
        @click="router.go(-1)"
      >
        Вернуться назад
      </button>
    </div>
    <div>
      <ul class="flex my-2">
        <li
          class="px-2 py-1 border border-indigo-500 bg-indigo-500 font-bold text-2xl text-white"
        >
          {{ sneakers?.price || ""}} руб.
        </li>
      </ul>
    </div>

    <div class="mt-3">
      <div class="flex flex-col items-center sm:flex-row sm:space-x-2 h-80">
        <div class="basis-3/6 h-full border pb-2 mr-4 sm:pb-0">
          <img
            class="flex items-center justify-center w-auto h-full"
            :src="sneakers?.photo"
          />
        </div>

        <div class="flex flex-col justify-between basis-3/6 overflow-hidden h-full">
          <swiper
          v-if="sneakers?.slider_photo"
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
              v-for="(image, index) in sneakers?.slider_photo"
              :key="index"
            >
              <img @click="showFullImg(image)" class="rounded-3xl cursor-pointer" :src="image" />
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
              class="basis-1/2 gap-2 flex justify-center items-center p-2 rounded-md border-2 border-green-500 bg-white hover:bg-green-200 cursor-pointer transition active:bg-green-300"
              :class="{ 'bg-gray-200': sneakers.isLikeCard }"
              @click="rootStore.addLikeCard(sneakers)"
              >
              <div class="font-bold text-xl">
                <span >Добавить в закладки</span>
              </div>
            </div>

            <div
              class="basis-1/2 gap-2 flex justify-center items-center p-2 rounded-md border-2 border-blue-500 hover:bg-indigo-200 cursor-pointer transition active:bg-indigo-300"
              :class="{ 'bg-gray-200': sneakers.isAddBasket }"
              @click="rootStore.addCardBasket(sneakers)"
              >
              <div class="flex items-center">
                <span class="font-bold text-xl" >Купить</span>
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
                Пол: <span class="font-light">{{ sneakers?.gender || "" }}</span>
              </li>
              <li class="mb-2 py-1 text-base border-t border-indigo-500 font-medium">
                Сезон: <span class="font-light">{{sneakers?.season || ""}}</span>
              </li>
              <li class="mb-2 py-1 text-base border-t border-indigo-500 font-medium">
                Срок гарантии:
                <span class="font-light">{{ sneakers?.guarantee || "" }} месяцев</span>
              </li>
              <li class="mb-2 py-1 text-base border-t border-indigo-500 font-medium">
                Материал верха:
                <span class="font-light">{{sneakers?.upper_material || ""}}</span>
              </li>
              <li class="mb-2 py-1 text-base border-t border-indigo-500 font-medium">
                Материал подкладки:
                <span class="font-light">{{ sneakers?.lining_material || "" }}</span>
              </li>
              <li class="mb-2 py-1 text-base border-t border-indigo-500 font-medium">
                Материал подошвы:
                <span class="font-light">{{ sneakers?.outsole_material || "" }}</span>
              </li>
              <li class="mb-2 py-1 text-sm border-t border-indigo-500 font-medium">
                Страна производства:
                <span class="font-light">{{ sneakers?.maden || ""}}</span>
              </li>
            </ul>
          </div>
          <div class="basis-3/4">
            <h2 class="text-2xl font-bold mb-2">Описание товара</h2>
            <div>
              {{ sneakers?.desc || "" }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
