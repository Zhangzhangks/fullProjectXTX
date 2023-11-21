// 1. 创建一个新的axios实例
// 2. 请求拦截器，如果有token进行头部携带
// 3. 响应拦截器：1. 剥离无效数据  2. 处理token失效
// 4. 导出一个函数，调用当前的axsio实例发请求，返回值promise

import axios from "axios";
import { useUserStore } from "@/store/modules/userStore";
import router from "@/router/router";
export const baseURL = 'http://pcapi-xiaotuxian-front-devtest.itheima.net/'
const instance = axios.create({
    baseURL,
    timeout: 3000
})

instance.interceptors.request.use(config => {
    const user = useUserStore();

    let token = user.profile.token
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    // 拦截业务逻辑
    // 进行请求配置的修改
    // 如果本地又token就在头部携带
    // 1. 获取用户信息对象
    return config
}, error => {

    return Promise.reject(error)
})


instance.interceptors.response.use(response => {
    return response.data
}, error => {
    const { clearUserInfo } = useUserStore()
    if (error.response && error.response.status === 401) {
        //401 token失效


        // 1. 清空无效用户信息
        clearUserInfo({})
        // 当前路由地址
        // 2. 跳转到登录页
        // 3. 跳转需要传参（当前路由地址）给登录页码
        // 组件里头：`/user?a=10` $route.path === /user  $route.fullPath === /user?a=10
        // js模块中：router.currentRoute.value.fullPath 就是当前路由地址，router.currentRoute 是ref响应式数据
        const fullPath = encodeURIComponent(router.currentRoute.value.fullPath)
        // encodeURIComponent 转换uri编码，防止解析地址出问题
        router.push('/login?redirectUrl=' + fullPath)
    }
    return Promise.reject(error)
})

export default function request(url, method = "get", submit) {
    return instance({
        url, method,
        [method.toLocaleLowerCase() === 'get' ? 'params' : 'data']: submit
    })
}