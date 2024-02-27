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
    if(to.matched.some(record => record.meta.requiresAuth)) {
    let user = JSON.parse(localStorage.getItem('token'))
      if (user === null) {
        const rootStore = useCounterStore()
        const { showAuto } = storeToRefs(rootStore)
        showAuto.value = true
        next({
          path: '/',
        })
      } else {
        next()
      }
    } else if(to.matched.some(record => record.meta.guest)) {
        next()
    }else {
      next() 
    }
  })

export default router