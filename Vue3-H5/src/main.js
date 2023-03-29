import { createApp } from 'vue'
import './style.css'
import 'normalize.css'
import router from "./router"
import pinia from "./stores"
import App from './App.vue'

createApp(App).use(router).use(pinia).mount('#app')
