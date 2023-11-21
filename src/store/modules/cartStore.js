import { defineStore } from "pinia";
import { reactive, ref, toRefs } from "vue";


export const useUserStore = defineStore('user', () => {
    // 购物车状态
    const list = ref([])
    return { list }
},
    { persist: true })