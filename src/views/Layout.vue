<template>
    <!-- 顶部通栏 -->
    <appNavBar></appNavBar>
    <!-- 头部组件 -->
    <appHeader></appHeader>
    <appStickyHeaderNav />
    <!-- 内容容器 -->
    <!-- App.vue -->
    <div class="app-body">
        <router-view></router-view>
    </div>
    <!-- 底部组件 -->
    <AppFooter></AppFooter>
</template>
<script setup >
import appNavBar from '@/components/app-navBar.vue';
import appHeader from '@/components/app-header.vue';
import AppFooter from '@/components/app-footer.vue'
import appStickyHeaderNav from '@/components/app-sticky-header-nav.vue';
import { useCategoryStore } from '@/store/modules/categoryStore.js'
import { onMounted } from 'vue';

const { getAllCategory } = useCategoryStore();
onMounted(() => {
    getAllCategory();
})
</script>


<style lang='less' scoped></style>