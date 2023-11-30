import { createRouter, createWebHashHistory } from "vue-router";
import { useUserStore } from "@/store/modules/userStore";
const callback = import("@/views/login/components/callback.vue");
const product = import("@/views/goods/index.vue");
const category = import("@/views/category/subcategory.vue");
const cart = import("@/views/cart/index.vue");
const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: "/",
            component: () => import("@/views/Layout.vue"),
            children: [
                { path: "", component: () => import("@/views/home/index.vue") },
                {
                    path: "/category/:id",
                    component: () => import("@/views/category/index.vue"),
                },
                { path: "/category/sub/:id", component: category },
                { path: "/product/:id", component: product },
                { path: "/product/:id", component: product },
                { path: "/cart", component: cart },
                { path: '/member/checkout', component: () => import('@/views/member/order/index.vue') },
                { path: '/member/pay', component: () => import('@/views/member/pay/pay.vue') }
            ],
        },
        {
            path: "/login",
            component: () => import("@/views/login/index.vue"),
        },
        { path: "/login/callback", component: callback },
    ],
    scrollBehavior() {
        return { top: 0 };
    },
});

router.beforeEach((to, from, next) => {
    const userStore = useUserStore();
    const token = userStore.profile.token || "";
    if (!token && to.path.startsWith('/member')) {
        console.log(to.fullPath);
       return next('/login?redirectUrl='+encodeURIComponent(to.fullPath));
    }
    next()
});
export default router;
