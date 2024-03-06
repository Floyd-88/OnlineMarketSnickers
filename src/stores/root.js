import axios from 'axios'
import { defineStore } from 'pinia'
import { CARDS_URL, BUY_URL, REGISTER_URL, AUTH_URL } from '../constants/api.js'

export const useCounterStore = defineStore('root', {
  state: () => ({
    cards: [], //карточки товара
    sneakers: {}, //информация по кроссовкам
    // sneakersID: {}, //query параметр id страницы с информацией по кроссовкам

    buyCards: [], //купленные товары
    user: {}, //пользователь
    showAuto: false, //показать окно авторизации
    showReg: false, //показать окно регистрации
    successReg: false, //показывать окно об успешной регистрации
    errorAuth: "", //ошибка при авторизации
    paginations: {}, //информация с сервера для страничной пагинации
    likeCardsUser: [], //карточки добавленные в закладки
    basketCardsUser: [], //карточки добавленные в корзину
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
      statusSneakers: {
        smile: '/not_favorites.png',
        title: 'Товары отстуствуют',
        text: 'В данный момент в наличии нет доступных товаров'
      }
    },

    isShowBasket: false, //показывать корзину
    isDisabledBuyBtn: false, //флаг активной кнопки покупки товаров
    isShowPhoto: false, //показывать картинку в фул размере
    isLoaded: false //показывать загрузчик во время запросов на сервер
  }),

  getters: {},

  actions: {
    //добавление карточки в корзину
    addCardBasket(card) {
      card.isAddBasket = !card.isAddBasket
      this.basketCardsUser = localStorage.getItem('basket') ? JSON.parse(localStorage.getItem('basket')) : []
    if(card.isAddBasket) {
      this.basketCardsUser.push(card)
    } else {
      this.basketCardsUser = this.basketCardsUser.filter((i) => i.id !== card.id)
    }
    localStorage.setItem('basket', JSON.stringify(this.basketCardsUser))

    if(card.isLikeCard) {
      this.likeCardsUser.map((el) => card.id === el.id ? el.isAddBasket = card.isAddBasket : card)
      localStorage.setItem('likeCards', JSON.stringify(this.likeCardsUser))
    }

    },

    //добавление карточки в закладки
    addLikeCard(card) {
      card.isLikeCard = !card.isLikeCard
        this.likeCardsUser = localStorage.getItem('likeCards') ? JSON.parse(localStorage.getItem('likeCards')) : []
      if(card.isLikeCard) {
        this.likeCardsUser.push(card)
      } else {
        this.likeCardsUser = this.likeCardsUser.filter((i) => i.id !== card.id)
      }
      localStorage.setItem('likeCards', JSON.stringify(this.likeCardsUser))
    },

    //получение всех карточек с товаром
    async getCards(current_page) {
      try {

        this.isLoaded = true

        let basket = localStorage.getItem('basket') ? JSON.parse(localStorage.getItem('basket')) : []
        let like = localStorage.getItem('likeCards') ? JSON.parse(localStorage.getItem('likeCards')) : []

        let params = {
          sortBy: this.filters.optionsCard,
          page: current_page || 1,
          limit: 8

        }
        if (this.filters.searchName) {
          params.name = `*${this.filters.searchName}*`
        }

        await axios
          .get(CARDS_URL, {
            params
          })
          .then(({data}) => {
            this.isLoaded = false
            data.items = data.items.map((item) => ({
              ...item,
              isAddBasket: basket?.some((elem) => elem.id === item.id),
              isLikeCard: like?.some((elem) => elem.id === item.id)
            }))
            this.cards = data.items
            this.paginations = data.meta
          }) .finally(() => this.isLoaded = false)
      } catch (err) {
        console.log(err)
      }
    },

    //совершение покупки товаров
    async buySneakers() {
      try {
        this.isDisabledBuyBtn = true
        // eslint-disable-next-line no-unused-vars
        const orders = this.basketCardsUser.map(({ isAddBasket, isLikeCard, id, ...rest }) => {
          rest.cardID = id
          return rest
        })

        await axios
          .post(BUY_URL, {
            ...orders, 
            userID:`user_${this.user.id}`,
            date: new Date()
          }, {
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
          sortBy: "-date",
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

    //получить информацию по кроссовкам
    async getSneakers(id) {
      let basket = localStorage.getItem('basket') ? JSON.parse(localStorage.getItem('basket')) : []
      let like = localStorage.getItem('likeCards') ? JSON.parse(localStorage.getItem('likeCards')) : []
      try {
        let params = {
          id
        }
          await axios.get(CARDS_URL, {
            params
          }).then(({data}) => {
          if(data.length > 0) {
          data[0].slider_photo = data[0].slider_photo.split(', ')
          data[0].isAddBasket = basket?.some((elem) => elem.id === data[0].id),
          data[0].isLikeCard = like?.some((elem) => elem.id === data[0].id)
          
          this.sneakers = data[0]
            }
          }) 
      } catch(err) {
        console.log(err)
      }
    },

    //регистрация нового пользователя
    async registerUser(data) {
      try {
        if (!data.name || !data.name || !data.email || !data.password) {
          console.log('Данные не заполнены')
          return
        } else {
          let body = JSON.stringify({
            name: data.name,
            login: data.login,
            email: data.email,
            password: data.password})

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
        if(err.response?.data?.message === 'RESOURCE_USER_ALREADY_EXISTS') {
          this.errorAuth = "Пользователь с такой почтой уже зарегистрирован"
        }
      }
    },

    //авторизация пользователя
    async authorizationUser(data) {
      try {
        if (!data.email || !data.password) {
          console.log('Необходимо заполнить поля')
          return
        }
        let body = JSON.stringify({
          email: data.email,
          password: data.password
        })

        await axios
          .post(AUTH_URL, body, {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json"
            }
          })
          .then(({data}) => {
            if (data.token) {
              localStorage.setItem('token', JSON.stringify(data.token))

              this.user = data.data
              localStorage.setItem('user', JSON.stringify(this.user))
              this.showAuto = false
              console.log(data)
            } else {
              console.log('Пользователь не найден')
            }
          })
      } catch (err) {
        if(err.response?.data?.message === 'RESOURCE_INVALID_LOGIN_OR_PASSWORD') {
          this.errorAuth = "Пользователя с таким логином или паролем не найдено"
        }
        
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
