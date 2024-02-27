import axios from 'axios'
import { defineStore } from 'pinia'
import { CARDS_URL, BUY_URL, USERS_URL, REGISTER_URL, AUTH_URL } from '../constants/api.js'

export const useCounterStore = defineStore('root', {
  state: () => ({
    cards: [], //карточки товара
    buyCards: [], //купленные товары
    user: {}, //пользователь
    showAuto: false, //показать окно авторизации
    showReg: false, //показать окно регистрации
    successReg: false, //показывать окно об успешной регистрации

    //фильтр и сортировка карточек товара
    filters: {
      searchName: '',
      optionsCard: 'name'
    },

    //статус по корзине
    statusBasket: {
      statusImg: '/basket.svg',
      statusTitle: 'Корзина пустая',
      statusDesc: 'Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ.'
    },

    //отсутствие заказов
    statusPage: {
      statusOrders: {
        smile: '/not_orders.png',
        title: 'У вас нет заказов',
        text: 'Оформите хотя бы один заказ.'
      },
      statusFavorites: {
        smile: '/not_favorites.png',
        title: 'Закладок нет :(',
        text: 'Вы ничего не добавляли в закладки'
      },
      statusSnickers: {
        smile: '/not_favorites.png',
        title: 'Товары отстуствуют',
        text: 'В данный момент в наличии нет доступных товаров'
      }
    },

    isShowBasket: false, //показывать корзину
    isDisabledBuyBtn: false //флаг активной кнопки покупки товаров
  }),

  getters: {
    basketCardsUser: (state) => state.cards.filter((elem) => elem.isAddBasket), //карточки товара в корзине
    likeCardsUser: (state) => state.cards.filter((elem) => elem.isLikeCard) //какрточки добавленные в закладки
  },

  actions: {
    //добавление карточки в корзину
    addCardBasket(card) {
      card.isAddBasket = !card.isAddBasket
      localStorage.setItem('basket', JSON.stringify(this.basketCardsUser))
    },

    //добавление карточки в закладки
    addLikeCard(card) {
      card.isLikeCard = !card.isLikeCard
      localStorage.setItem('likeCards', JSON.stringify(this.likeCardsUser))
    },

    //получение всех карточек с товаром
    async getCards() {
      try {
        let basket = JSON.parse(localStorage.getItem('basket'))
        let like = JSON.parse(localStorage.getItem('likeCards'))

        let params = {
          sortBy: this.filters.optionsCard
        }
        if (this.filters.searchName) {
          params.name = `*${this.filters.searchName}*`
        }

        await axios
          .get(CARDS_URL, {
            params
          })
          .then(({ data }) => {
            data = data.map((item) => ({
              ...item,
              isAddBasket: basket?.some((elem) => elem.id === item.id),
              isLikeCard: like?.some((elem) => elem.id === item.id)
            }))
            this.cards = data
          })
      } catch (err) {
        console.log(err)
      }
    },

    //совершение покупки товаров
    async buySnickers() {
      try {
        this.isDisabledBuyBtn = true
        // eslint-disable-next-line no-unused-vars
        const orders = this.basketCardsUser.map(({ isAddBasket, isLikeCard, id, ...rest }) => {
          rest.cardID = id
          return rest
        })

        await axios
          .post(BUY_URL, {...orders, userID:`user_${this.user.id}`}, {
            headers: { 
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem('token')}`
            }
          })
          .then((resp) => {
            this.statusBasket.statusImg = '/order.png'
            this.statusBasket.statusTitle = 'Заказ оформлен!'
            this.statusBasket.statusDesc = `Ваш заказ #${resp.data.id} скоро будет передан курьерской доставке`

            this.basketCardsUser.forEach((i) => {
              this.addCardBasket(i)
            })
            this.isDisabledBuyBtn = false
          })
      } catch (err) {
        console.log(err)
      }
    },

    //получение моих заказанных товаров
    async getOrderCards() {
      try {
        let params = {
          userID: `user_${this.user.id}`
        }

        await axios
          .get(BUY_URL, {
            params
          })
          .then(({ data }) => {
            // eslint-disable-next-line no-unused-vars
            let array = data.map(({userID, id, ...elem}) => {
              return elem
            })
            this.buyCards = array
          })
      } catch (err) {
        console.log(err)
      }
    },

    //регистрация нового пользователя
    async registerUser(data) {
      try {
        if (!data.name || !data.name || !data.email || !data.pass) {
          console.log('Данные не заполнены')
          return
        } else {
          let body = JSON.stringify({
            name: data.name,
            login: data.login,
            email: data.email,
            password: data.pass})

            await axios
            .post(REGISTER_URL, body, {
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
              }
            })
            .then(() => {
              this.successReg = true
            })
          }
      } catch (err) {
        console.log(err)
      }
    },

    //авторизация пользователя
    async authorizationUser(data) {
      try {
        if (!data.email || !data.pass) {
          console.log('Необходимо заполнить поля')
          return
        }
        let body = JSON.stringify({
          email: data.email,
          password: data.pass
        })

        await axios
          .post(AUTH_URL, body, {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json"
            }
          })
          .then(({data }) => {
            if (data.token) {
              localStorage.setItem('token', JSON.stringify(data.token))

              this.user = data.data
              localStorage.setItem('user', JSON.stringify(this.user))
              this.showAuto = false
            } else {
              console.log('Пользователь не найден')
            }
          })
      } catch (err) {
        console.log(err)
      }
    },

    //выход пользователя
    async exitUser() {
      this.user = {}
      localStorage.setItem('user', null)
      localStorage.setItem('token', null)
    }
  }
})
