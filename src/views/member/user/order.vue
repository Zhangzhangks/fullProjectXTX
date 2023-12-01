<template>
  <router-link to="/member/order/26">订单详情</router-link>

  <XtxTabs v-model="activeName">

    <XtxTabsPanel label="选项卡0" name="first0">
      我是内容0
    </XtxTabsPanel>


    <XtxTabsPanel :label="`选项卡${item}`" :name="`first${item}`" v-for="item in 3" :key="item">
      我是内容{{ item }}
    </XtxTabsPanel>

    <XtxTabsPanel label="选项卡4" name="first4">
      我是内容4
    </XtxTabsPanel>
  </XtxTabs>
</template>
<script setup >
import XtxTabsPanel from '@/components/xtx-tabs-panel.vue';
import { ref, reactive } from 'vue'
const activeName=ref('first0')
</script>


<style lang='scss' scoped></style>