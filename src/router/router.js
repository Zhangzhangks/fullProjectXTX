import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: '/', component: () => import('@/views/Layout.vue'),
            children: [
                { path: '', component: () => import('@/views/home/index.vue') },
                { path: '/category/:id', component: () => import('@/views/category/index.vue') },
                { path: '/category/sub/:id', component: () => import('@/views/category/subcategory.vue') },
                { path: '/product/:id', component: () => import('@/views/goods/index.vue') },
            ]
        },
        { path: '/login', component: () => import('@/views/login/index.vue') }
    ],
    scrollBehavior() {
        return { top: 0 }
    }
})


export default router