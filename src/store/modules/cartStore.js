import { defineStore } from "pinia";
import { reactive, ref, toRefs } from "vue";


export const useCartStore = defineStore('cart', () => {
    // 购物车状态
    const list = ref([])
    return { list }
},
    { persist: true })