


import { createApp } from 'vue'

import App from './App.vue'
import router from './router'
import store from './store'
import { createPinia } from 'pinia'
import "bootstrap"
import "bootstrap/dist/css/bootstrap.min.css"
import Buefy from '@ntohq/buefy-next'
import '@ntohq/buefy-next/dist/buefy.css'

const app = createApp(App)
const pinia = createPinia()

app.use(router).use(store).use(Buefy).use(pinia)

app.mount('#app')
