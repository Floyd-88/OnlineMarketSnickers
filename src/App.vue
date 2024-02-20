<script setup>
import HeaderVue from './components/HeaderVue.vue'
import CardList from './components/CardsList.vue'
import DrawerVue from './components/DrawerVue.vue'
import axios from 'axios'
import { ref, reactive, onMounted, watch, provide, computed } from 'vue'

const cards = ref([]) //карточки товара
const basketUser = ref([]) //карточки товара в корзине
const likeCards = ref([]) //какрточки добавленные в закладки
const isShowBasket = ref(false) //показывать корзину
const filters = reactive({
  //фильтр и сортировка карточек товара
  searchName: '',
  optionsCard: 'name'
})
const isDisabledBuyBtn = ref(false) //флаг активной кнопки покупки товаров

const statusBasket = reactive({  //статус по корзине
  statusImg: "/basket.svg",
  statusTitle: "Корзина пустая",
  statusDesc: "Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ."
})

const basketCards = computed(() => cards.value.filter((i) => i.isAddBasket))

//получение карточек с товаром
async function getCards() {
  try {
    let basket = JSON.parse(localStorage.getItem('basket'))    
    basket ? basketUser.value = basket : []

    let likeCards = JSON.parse(localStorage.getItem('likeCards'))
    likeCards ? likeCards.value = likeCards : []

    let params = {
      sortBy: filters.optionsCard
    }
    if (filters.searchName) {
      params.name = `*${filters.searchName}*`
    }

    await axios
      .get('https://f774087b0dcc15d2.mokky.dev/cards', {
        params
      })
      .then(({ data }) => {
       data = data.map((item) => ({ 
          ...item,
          isAddBasket: basket.some((elem) => elem.id === item.id),
          isLikeCard: likeCards.some((elem) => elem.id === item.id)

        }))
        cards.value = data
      })
  } catch (err) {
    console.log(err)
  }
}

//добавление карточки в закладки
function addLikeCard(card) {
  card.isLikeCard = !card.isLikeCard
  if (card.isLikeCard) {
    likeCards.value.push(card)
  } else {
    likeCards.value = likeCards.value.filter((i) => i.id !== card.id)
  }
  localStorage.setItem('likeCards', JSON.stringify(likeCards.value))
}

//добавление карточки в корзину
function addCardBasket(card) {
  card.isAddBasket = !card.isAddBasket
  if (card.isAddBasket) {
    basketUser.value.push(card)
  } else {
    basketUser.value = basketUser.value.filter((i) => i.id !== card.id)
  }
  localStorage.setItem('basket', JSON.stringify(basketUser.value))
}

//отправка купленных товапов на сервер
async function buySnickers() {
  try {
    isDisabledBuyBtn.value = true
    // eslint-disable-next-line no-unused-vars
    const body = basketCards.value.map(({ isAddBasket, isLikeCard, photo, ...rest }) => {
      return rest
    })
    await axios
      .post('https://f774087b0dcc15d2.mokky.dev/buy', {
        userID: 'user_1',
        body
      })
      .then((resp) => {
        statusBasket.statusImg = "/order.png"
        statusBasket.statusTitle = "Заказ оформлен!"
        statusBasket.statusDesc = `Ваш заказ #${resp.data.id} скоро будет передан курьерской доставке`

        basketCards.value.forEach((i) => {
          addCardBasket(i)
        })
      isDisabledBuyBtn.value = false

      })
  } catch (err) {
    console.log(err)
  }
}

//открыть корзину
function openBasket(bool) {
  isShowBasket.value = bool

  bool
    ? (document.documentElement.style.overflow = 'hidden')
    : (document.documentElement.style.overflow = 'auto')

    if(statusBasket.statusTitle === "Заказ оформлен!") {
      statusBasket.statusImg = "/basket.svg"
    statusBasket.statusTitle = "Корзина пустая"
    statusBasket.statusDesc = "Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ."
    }

}

//добавить карточку товра в закладку
function onClickLikeCard(card) {
  addLikeCard(card)
}
//добавить карточку товра в корзину
function onClickAddBasket(card) {
  addCardBasket(card)
}

onMounted(() => {
  getCards()
})

watch(filters, () => {
  getCards()
})

provide('buySnickers', buySnickers)
provide('openBasket', openBasket)
provide('addCardBasket', addCardBasket)
provide('isDisabledBuyBtn', isDisabledBuyBtn)

</script>

<template>
  <div v-if="isShowBasket" class="fixed top-0 left-0 bg-black z-10 w-full h-full opacity-70"></div>
  <DrawerVue v-if="isShowBasket" :basketCards="basketCards" :statusBasket="statusBasket" />

  <div class="w-4/5 m-auto bg-white rounded-t-xl mt-16 shadow-2xl">
    <HeaderVue @openBasket="openBasket" :basketCards="basketCards" />

    <div class="px-12">
      <div class="flex items-center justify-between mt-8 mb-8">
        <h2 class="text-3xl font-bold">Все кроссовки</h2>

        <div class="flex gap-4">
          <select
            v-model="filters.optionsCard"
            class="border rounded-lg outline-none focus:border-gray-600"
          >
            <option value="name">По названия</option>
            <option value="price">По цене (возрастание)</option>
            <option value="-price">По цене (уменьшение)</option>
          </select>
          <div class="relative">
            <img class="absolute left-3 inset-1/3" src="/icons/search.svg" alt="search" />
            <input
              v-model="filters.searchName"
              class="h-8 w-52 border border-gray-200 rounded-lg py-5 pl-10 outline-none focus:border-gray-600"
              placeholder="Поиск..."
              type="text"
            />
          </div>
        </div>
      </div>

      <CardList
        :cards="cards"
        @onClickLikeCard="onClickLikeCard"
        @onClickAddBasket="onClickAddBasket"
      />
    </div>
  </div>
</template>

<style scoped></style>
