<script setup>
import {ref} from 'vue'
import { storeToRefs } from 'pinia'
import { useCounterStore } from '@/stores/root'

const rootStore = useCounterStore();
const { showAuto, showReg } = storeToRefs(rootStore)

const email = ref('')
const pass = ref('')



function handleSubmit() {
  let data = {
    email: email.value,
    pass: pass.value
  }
  rootStore.authorizationUser(data)
}
</script>

<template>
    <div class="flex flex-col text-center p-4 rounded-xl shadow-lg z-20 w-96 h-auto bg-slate-200 right-0 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
      <form  @submit.prevent="handleSubmit" novalidate>
        <h2 class="mb-4 text-lg font-semibold">Добрый день! Для того что бы сделать заказ - войдите в свою учетную запись!</h2>
        <div class="mb-4">
          <!-- <div> -->
            <!-- <div>
              Некорректный адрес электронной почты
            </div> -->
            <!-- <div>
              Введите электронную почту указанную при регистрации
            </div> -->
          <!-- </div> -->
          <input class="w-full p-2 rounded-md" id="email" type="text" v-model="email" placeholder="Введите электронный адрес">
        </div>
  
        <div class="mb-4">
          <!-- <div>
            <div>
              Введите пароль указанный при регистрации
            </div>
          </div> -->
          <input class="w-full p-2 rounded-md" id="password" type="password" v-model="pass" placeholder="Введите пароль">
        </div>  
        <div >
          <button class="text-2xl text-white transition font-bold mb-4 bg-indigo-500 hover:bg-indigo-600 py-1 px-12 rounded-3xl shadow-lg"  type="submit" :disabled="false">
            Вход
          </button>
        </div>
  
        <div>
          <button @click="showAuto=false, showReg=true" class="text-lg transition text-gray-400 hover:text-gray-500 hover:font-bold">
            Создать новый аккаунт
          </button>
        </div>
      </form>
    </div>

  </template>