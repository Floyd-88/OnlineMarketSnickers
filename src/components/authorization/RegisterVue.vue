<script setup>
import {reactive} from 'vue'
import { storeToRefs } from 'pinia'
import { useCounterStore } from '@/stores/root'
import useFormValidation from "@/validateForm/useFormValidation";
import useSubmitButtonState from '@/validateForm/useSubmitButtonState'


const rootStore = useCounterStore();
const { showAuto, showReg, successReg, errorAuth } = storeToRefs(rootStore)

const formInput = reactive({
 name: "",
 login: "",
 email: "",
 password: "",
 phone: ""
})


const { validateNameField, validateLoginField, validatePhoneField, validateEmailField, validatePasswordField, errors } = useFormValidation();
const { isSignupButtonDisabled } = useSubmitButtonState(formInput, errors)

const validateInput = (nameInput, nameState) => {
  errorAuth.value = ""
    switch (nameInput) {
      case 'name':
        validateNameField(nameInput, nameState);
        break;

      case 'login':
        validateLoginField(nameInput, nameState);
        break;
      
      case 'email':
        validateEmailField(nameInput, nameState);
        break;

      case 'phone':
        validatePhoneField(nameInput, nameState);
        break;

      case 'password':
        validatePasswordField(nameInput, nameState);
        break;
    
      default:
        break;
    }
  };


function handleSubmit() {
  rootStore.registerUser(formInput)
}

</script>

<template>
    <div class="flex flex-col text-center p-4 rounded-xl shadow-lg z-20 w-96 h-auto bg-slate-200 right-0 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
      <form v-if="!successReg"  @submit.prevent="handleSubmit" novalidate>
        <h2 class="mb-4 text-lg font-semibold">Создать новую учетную запись!</h2>
  
        <div class="mb-4">
          <div class="text-left text-sm text-red-500 mb-1" v-if="errors.name">
            {{ errors.name }}
          </div>
          <input class="w-full p-2 rounded-md"   
            type="text"
            id="name"
            placeholder="Введите свое имя"
            autocomplete="off"
            v-model="formInput.name"
            @keyup="validateInput('name', formInput.name)"
            @blur="validateInput('name', formInput.name)">
        </div>

        <div class="mb-4">
          <div class="text-left text-sm text-red-500 mb-1" v-if="errors.login">
            {{ errors.login }}
          </div>

          <input class="w-full p-2 rounded-md" 
            type="text"
            id="login"
            placeholder="Введите свой логин"
            autocomplete="off"
            v-model="formInput.login"
            @keyup="validateInput('login', formInput.login)"
            @blur="validateInput('login', formInput.login)"> 
        </div>

        <div class="mb-4">
          <div class="text-left text-sm text-red-500 mb-1" v-if="errors.email">
            {{ errors.email }}
          </div>

          <input class="w-full p-2 rounded-md" 
            type="email"
            id="email"
            placeholder="Введите электронный адрес"
            autocomplete="off"
            v-model="formInput.email"
            @keyup="validateInput('email', formInput.email)"
            @blur="validateInput('email', formInput.email)">
        </div>

        <div class="mb-4">
          <div class="text-left text-sm text-red-500 mb-1" v-if="errors.phone">
            {{ errors.phone }}
          </div>

          <input class="w-full p-2 rounded-md" 
            type="tel"
            id="phone"
            placeholder="Введите свой номер телефона"
            autocomplete="off"
            v-model="formInput.phone"
            @keyup="validateInput('phone', formInput.phone)"
            @blur="validateInput('phone', formInput.phone)">
        </div>
  
        <div class="mb-4">
          <div class="text-left text-sm text-red-500 mb-1" v-if="errors.password">
            {{ errors.password }}
          </div>

          <input class="w-full p-2 rounded-md" 
            type="password"
            id="password"
            placeholder="Придумайте пароль"
            autocomplete="off"
            v-model="formInput.password"
            @keyup="validateInput('password', formInput.password)"
            @blur="validateInput('password', formInput.password)">
        </div>
        <p class="text-sm mb-4 text-red-500" v-if="errorAuth">{{ errorAuth }}</p>
        <div >
          <button class="text-2xl text-white transition font-bold mb-4 bg-indigo-500 hover:bg-indigo-600 py-1 px-12 rounded-3xl shadow-lg disabled:bg-gray-400 disabled:text-gray-200"  type="submit" :disabled="isSignupButtonDisabled">
            Регистрация
          </button>
        </div>
  
        <div>
          <button @click="showAuto=true, showReg=false, errorAuth=''" class="text-lg transition text-gray-400 hover:text-gray-500 hover:font-bold">
            Войти
          </button>
        </div>
      </form>
      <form v-else>
        <h2 class="mb-4 text-lg font-semibold">Вы успешно зарегестрировались и теперь можете войти под своей учетной записью!</h2>
      </form>
    </div>

  </template>