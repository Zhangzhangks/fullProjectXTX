<template>
    <XtxBread>
        <XtxBreadItem to="/">首页</XtxBreadItem>
        <Transition mode="out-in" enter-active-class="animate__animated animate__lightSpeedInRight"
            leave-active-class=" animate_animated animate__backOutDown">
            <XtxBreadItem :key="subCategory.top.id" v-if="subCategory.top" :to="`/category/${subCategory.top.id}`">{{
                subCategory.top.name }}
            </XtxBreadItem>
        </Transition>
        <Transition mode="out-in" enter-active-class="animate__animated animate__lightSpeedInRight"
            leave-active-class=" animate_animated animate__fadeOutDown">
            <XtxBreadItem :key="subCategory.sub.id" v-if="subCategory.top">{{ subCategory.sub.name }}</XtxBreadItem>
        </Transition>
    </XtxBread>
</template>

<script setup>
import { useCategoryStore } from '@/store/modules/categoryStore';

import { storeToRefs } from 'pinia';
import { computed } from 'vue';
import { useRoute } from 'vue-router';
const { list } = storeToRefs(useCategoryStore())
const route = useRoute();

const subCategory = computed(() => {
    let cate = {};
    list.value.forEach(item => {
        if (item.children) {
            let sub = item.children.find(item => item.id === route.params.id);
            if (sub) {
                cate.top = { id: item.id, name: item.name };
                cate.sub = { id: sub.id, name: sub.name }
            }
        }

    })
    return cate
})

</script>
<style scoped lang="less"></style>