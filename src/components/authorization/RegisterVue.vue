<script setup>
import {ref} from 'vue'
import { storeToRefs } from 'pinia'
import { useCounterStore } from '@/stores/root'

const rootStore = useCounterStore();
const { showAuto, showReg, successReg } = storeToRefs(rootStore)

const name = ref('')
const login = ref('')
const email = ref('')
const pass = ref('')


function handleSubmit() {
  let data = {
    name: name.value,
    login: login.value,
    email: email.value,
    pass: pass.value
  }
  rootStore.registerUser(data)
}
</script>

<template>
    <div class="flex flex-col text-center p-4 rounded-xl shadow-lg z-20 w-96 h-auto bg-slate-200 right-0 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
      <form v-if="!successReg"  @submit.prevent="handleSubmit" novalidate>
        <h2 class="mb-4 text-lg font-semibold">Создать новую учетную запись!</h2>
  
        <div class="mb-4">
          <!-- <div> -->
            <!-- <div>
              Некорректный адрес электронной почты
            </div> -->
            <!-- <div>
              Введите электронную почту указанную при регистрации
            </div> -->
          <!-- </div> -->
          <input class="w-full p-2 rounded-md" id="name" type="text" placeholder="Введите свое имя" v-model="name">
        </div>

        <div class="mb-4">
          <!-- <div> -->
            <!-- <div>
              Некорректный адрес электронной почты
            </div> -->
            <!-- <div>
              Введите электронную почту указанную при регистрации
            </div> -->
          <!-- </div> -->
          <input class="w-full p-2 rounded-md" id="login" type="text" placeholder="Введите свой логин" v-model="login">
        </div>

        <div class="mb-4">
          <!-- <div> -->
            <!-- <div>
              Некорректный адрес электронной почты
            </div> -->
            <!-- <div>
              Введите электронную почту указанную при регистрации
            </div> -->
          <!-- </div> -->
          <input class="w-full p-2 rounded-md" id="email" type="text" placeholder="Введите электронный адрес" v-model="email">
        </div>
  
        <div class="mb-4">
          <!-- <div>
            <div>
              Введите пароль указанный при регистрации
            </div>
          </div> -->
          <input class="w-full p-2 rounded-md" id="password" type="password" placeholder="Придумайте пароль" v-model="pass">
        </div>  
        <div >
          <button class="text-2xl text-white transition font-bold mb-4 bg-indigo-500 hover:bg-indigo-600 py-1 px-12 rounded-3xl shadow-lg"  type="submit" :disabled="false">
            Регистрация
          </button>
        </div>
  
        <div>
          <button @click="showAuto=true, showReg=false" class="text-lg transition text-gray-400 hover:text-gray-500 hover:font-bold">
            Войти
          </button>
        </div>
      </form>
      <form v-else>
        <h2 class="mb-4 text-lg font-semibold">Вы успешно зарегестрировались и теперь можете войти под своей учетной записью!</h2>
      </form>
    </div>

  </template>