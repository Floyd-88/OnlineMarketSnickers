<script setup>
import { reactive } from 'vue'
import { storeToRefs } from 'pinia'
import { useCounterStore } from '@/stores/root'
import useFormValidation from '@/validateForm/useFormValidation'
import useSubmitButtonState from '@/validateForm/useSubmitButtonState'

const rootStore = useCounterStore()
const { showAuto, showReg, errorAuth } = storeToRefs(rootStore)

const formInput = reactive({
  email: '',
  password: ''
})

const { validateEmailField, validateField, errors } = useFormValidation()
const { isSignupButtonDisabled } = useSubmitButtonState(formInput, errors)

const validateInput = (nameInput, nameState) => {
errorAuth.value = ""
  switch (nameInput) {
    case 'email':
      validateEmailField(nameInput, nameState)
      break

    case 'password':
      validateField(nameInput, nameState)
      break

    default:
      break
  }
}

function handleSubmit() {
  rootStore.authorizationUser(formInput)
}
</script>

<template>
  <div
    class="flex flex-col text-center p-4 rounded-xl shadow-lg z-20 w-80 sm:w-96 h-auto bg-slate-200 right-0 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
  >
    <form @submit.prevent="handleSubmit" novalidate>
      <h2 class="mb-4 text-lg font-semibold">
        Добрый день! Для того что бы сделать заказ - войдите в свою учетную запись!
      </h2>
      <div class="mb-4">
        <div class="text-left text-sm text-red-500 mb-1" v-if="errors.email">
          {{ errors.email }}
        </div>
        <input
          class="w-full p-2 rounded-md"
          type="email"
          id="email"
          placeholder="Введите электронный адрес"
          autocomplete="off"
          v-model="formInput.email"
          @keyup="validateInput('email', formInput.email)"
          @blur="validateInput('email', formInput.email)"
        />
      </div>

      <div class="mb-4">
        <div class="text-left text-sm text-red-500 mb-1" v-if="errors.password">
          {{ errors.password }}
        </div>
        <input
          class="w-full p-2 rounded-md"
          type="password"
          id="password"
          placeholder="Введите пароль"
          autocomplete="off"
          v-model="formInput.password"
          @keyup="validateInput('password', formInput.password)"
          @blur="validateInput('password', formInput.password)"
        />
      </div>
        <p class="text-sm mb-4 text-red-500" v-if="errorAuth">{{ errorAuth }}</p>
      <div>
        <button
          class="text-2xl text-white transition font-bold mb-4 bg-indigo-500 hover:bg-indigo-600 py-1 px-12 rounded-3xl shadow-lg disabled:bg-gray-400 disabled:text-gray-200"
          type="submit"
          :disabled="isSignupButtonDisabled"
        >
          Вход
        </button>
      </div>

      <div>
        <button
          @click="showAuto = false, showReg = true, errorAuth=''"
          class="text-lg transition text-gray-400 hover:text-gray-500 hover:font-bold"
        >
          Создать новый аккаунт
        </button>
      </div>
    </form>
  </div>
</template>
