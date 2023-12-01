import { createApp } from 'vue'
import App from './App.vue'
import '@/styles/common/common.scss'
import './style.scss'
import router from '@/router/router.js'
import pinia from '@/store/index'
import commonComponent from '@/components/libirary/index'
import lazy from '@/directive/lazy-img'
// collapse
import { ElCollapseTransition } from 'element-plus'
// 如果您正在使用CDN引入，请删除下面一行。
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import 'element-plus/theme-chalk/base.css'
import '@/utils/mock'
import message from './components/libirary/message'
const app = createApp(App);
//this.$message({})
app.config.globalProperties.$message = message


app.use(router)
app.use(pinia)
app.use(commonComponent)

app.component(ElCollapseTransition.name, ElCollapseTransition)
app.use(lazy)

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
app.mount('#app')
// main.ts




