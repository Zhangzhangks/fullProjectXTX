import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: '/', component: () => import('@/views/Layout.vue'),
            children: [
                { path: '', component: () => import('@/views/home/index.vue') }
            ]
        },

    ]
})


export default router