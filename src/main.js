import './assets/main.css'

import { autoAnimatePlugin } from '@formkit/auto-animate/vue'

import { createPinia } from 'pinia'

import { createApp } from 'vue'

import App from './App.vue'

const app = createApp(App)
import router from './router' 

app.use(autoAnimatePlugin)
app.use(createPinia())
app.use(router)
app.mount('#app')
