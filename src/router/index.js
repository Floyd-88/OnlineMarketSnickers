import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../pages/HomePage.vue'
import FavoritesPage from '../pages/FavoritesPage.vue'
import MyProfilePage from '../pages/MyProfilePage.vue'

import { storeToRefs } from 'pinia'
import { useCounterStore } from '@/stores/root'


const router = createRouter({
    history: createWebHistory(
        import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            name: 'home',
            component: HomePage,
            meta: { 
                guest: true
              }
        },
        {
            path: "/favorite",
            name: 'favorite',
            component: FavoritesPage,
            meta: { 
                guest: true
              }
        },
        {
            path: "/profile",
            name: 'profile',
            component: MyProfilePage,
            meta: { 
                requiresAuth: true
              }
        }
    ]
})

router.beforeEach((to, from, next) => {

    const rootStore = useCounterStore()
    const { showAuto } = storeToRefs(rootStore)

    if(to.matched.some(record => record.meta.requiresAuth)) {
    let user = JSON.parse(localStorage.getItem('token'))
      if (user === null) {
        showAuto.value = true
        next({
          path: '/',
        })
      } else {
        next()
      }
    } else if(to.matched.some(record => record.meta.guest)) {
        // paginations.value.current_page = 1
        // if(to.name === 'favorite') {

        //     paginations.value.total_pages = Math.ceil(likeCardsUser.value.length / 10)
        //     console.log(paginations.value.total_pages)
        if(to.name === 'home') {
            rootStore.getCards()
        }
        next()
    }else {
      next() 
    }
  })

export default router