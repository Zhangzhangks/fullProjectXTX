import { defineStore } from "pinia";
import { ref } from "vue";
import { findAllCategory } from "@/apis/category";
import { topCategory } from "@/apis/constant";


export const useCategoryStore = defineStore('category', () => {
    // 分类信息集合
    const list = ref(topCategory.map(item => ({ name: item })))

    const getAllCategory = async () => {
        const res = await findAllCategory();
        console.log(res, '分类商品');
        list.value = res.result;
        list.value.forEach(item => item.open = false)
    }

    const show = (id) => {
        let currentcategory = list.value.find(item => item.id === id);
        currentcategory.open = true
    }
    const hide = (id) => {
        let currentcategory = list.value.find(item => item.id === id);
        currentcategory.open = false
    }



    return { list, getAllCategory, hide, show }
})