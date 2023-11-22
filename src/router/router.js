import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: '/', component: () => import('@/views/Layout.vue'),
            children: [
                { path: '', component: () => import('@/views/home/index.vue') },
                { path: '/category/:id', component: () => import('@/views/category/topcategoy.vue') },
                { path: '/category/sub/:id', component: () => import('@/views/category/subcategory.vue') },
            ]
        },

    ],
    scrollBehavior() {
        return { top: 0 }
    }
})


export default router