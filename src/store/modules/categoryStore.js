import { defineStore } from "pinia";
import { reactive, ref, toRefs } from "vue";


export const useUserStore = defineStore('user', () => {
    // 分类信息集合
    const list = ref([])

    return { list }
})