import { createApp } from 'vue'
import App from './App.vue'
import '@/styles/common/common.scss'
import router from '@/router/router.js'
import pinia from '@/store/index'
import commonComponent from '@/components/libirary/index'
import lazy from '@/directive/lazy-img'
const app = createApp(App);
app.use(router)
app.use(pinia)
app.use(commonComponent)
app.use(lazy)
app.mount('#app')
