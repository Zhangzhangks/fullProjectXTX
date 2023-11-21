import { createApp } from 'vue'
import App from './App.vue'
import '@/styles/common/common.scss'
import router from '@/router/router.js'
import pinia from '@/store/index'
const app = createApp(App);
app.use(router)
app.use(pinia)
app.mount('#app')
