


import { createApp } from 'vue'

import App from './App.vue'
import router from './router'
import store from './store'
import "bootstrap"
import "bootstrap/dist/css/bootstrap.min.css"
import Buefy from '@ntohq/buefy-next'
import '@ntohq/buefy-next/dist/buefy.css'

const app = createApp(App)

app.use(router).use(store).use(Buefy)

app.mount('#app')
