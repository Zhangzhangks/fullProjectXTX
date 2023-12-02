import { createRouter, createWebHashHistory } from "vue-router";
import { useUserStore } from "@/store/modules/userStore";
import { h } from "vue";
import { RouterView } from "vue-router";
const callback = () => import("@/views/login/components/callback.vue");
const product = () => import("@/views/goods/index.vue");
const category = () => import("@/views/category/subcategory.vue");
const cart = () => import("@/views/cart/index.vue");
const pay = () => import("@/views/member/pay/pay.vue");

const router = createRouter({
    history: createWebHashHistory(),

    routes: [
        {
            path: "/",
            component: () => import("@/views/Layout.vue"),
            children: [
                { path: "", component: () => import("@/views/home/index.vue") },
                {
                    path: "category/:id",
                    component: () => import("@/views/category/index.vue"),
                },
                { path: "category/sub/:id", component: category },
                { path: "product/:id", component: product },
                { path: "product/:id", component: product },
                { path: "cart", component: cart },
                {
                    path: "/member",
                    redirect: "",
                    component: () => import("@/views/member/layout.vue"),
                    children: [
                        {
                            path: "",
                            component: () => import("@/views/member/home/index.vue"),
                        },

                        {
                            path: 'order', component: { render: () => h(RouterView) },
                            children: [
                                { path: '', component: () => import("@/views/member/user/order.vue") },
                                { path: ':orderId(\\d+)', component: () => import('@/views/member/user/orderDetail.vue') },

                            ]
                        },

                    ],
                },
                {
                    path: "member/checkout",
                    component: () => import("@/views/member/order/index.vue"),
                },
                { path: "member/pay", component: pay },
                {
                    path: "/pay/callback",
                    component: () => import("@/views/member/pay/callback.vue"),
                },
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
    if (!token && to.path.startsWith("/member")) {
        console.log(to.fullPath);
        return next("/login?redirectUrl=" + encodeURIComponent(to.fullPath));
    }
    next();
});
export default router;
