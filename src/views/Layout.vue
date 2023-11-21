<template>
    <!-- 顶部通栏 -->
    <appNavBar></appNavBar>
    <!-- 头部组件 -->
    <appHeader></appHeader>
    <!-- 内容容器 -->
    <div class="app-body" style="height: 600px;">
        <router-view></router-view>
    </div>
    <!-- 底部组件 -->
    <AppFooter></AppFooter>
</template>
<script setup >
import appNavBar from '@/components/app-navBar.vue';
import appHeader from '@/components/app-header.vue';
import AppFooter from '@/components/app-footer.vue'
</script>


<style lang='less' scoped></style>