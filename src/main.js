import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import "bootstrap"
import "bootstrap/dist/css/bootstrap.min.css"
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome'

const app = createApp(App)

app.use(router).use(store).component('font-awesome-icon', FontAwesomeIcon)

app.mount('#app')
