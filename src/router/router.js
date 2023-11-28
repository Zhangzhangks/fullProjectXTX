import { createRouter, createWebHashHistory } from 'vue-router'
const callback = import('@/views/login/components/callback.vue')
const product = import('@/views/goods/index.vue')
const category = import('@/views/category/subcategory.vue')
const cart = import('@/views/cart/index.vue')
const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: '/', component: () => import('@/views/Layout.vue'),
            children: [
                { path: '', component: () => import('@/views/home/index.vue') },
                { path: '/category/:id', component: () => import('@/views/category/index.vue') },
                { path: '/category/sub/:id', component: category },
                { path: '/product/:id', component: product },
                { path: '/product/:id', component: product },
                { path: '/cart', component: cart }
            ]
        },
        {
            path: '/login', component: () => import('@/views/login/index.vue'),
        },
        { path: '/login/callback', component: callback }
    ],
    scrollBehavior() {
        return { top: 0 }
    }
})


export default router