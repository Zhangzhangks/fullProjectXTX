import { createApp } from 'vue'
import App from './App.vue'
import '@/styles/common/common.scss'
import router from '@/router/router.js'
import pinia from '@/store/index'
import commonComponent from '@/components/libirary/index'
import lazy from '@/directive/lazy-img'
// collapse
import { ElCollapseTransition } from 'element-plus'
import 'element-plus/theme-chalk/base.css'
const app = createApp(App);
app.use(router)
app.use(pinia)
app.use(commonComponent)
app.component(ElCollapseTransition.name, ElCollapseTransition)
app.use(lazy)
app.mount('#app')
