<template>
  <div class="order-detail-page" v-if="order">
    <!-- 操作栏 -->
    <detailAction :order="order" />
    <!-- 步骤条 组件xtx-steps.vue -->
    <detailStep :order="order"></detailStep>

    <!-- 物流栏 -->
    <!-- <Suspense> 组件会触发三个事件：pending、resolve 和 fallback。pending 事件是在进入挂起状态时触发。
      resolve 事件是在 default 插槽完成获取新内容时触发。fallback 事件则是在 fallback 插槽的内容显示时触发。 -->
    <Suspense @pending="zkspeding" @resolve="zksresolve" @fallback="zksfallback">
      <!-- 具有深层异步依赖的组件 -->
      <detailLogistics v-if="[3, 4, 5].includes(order.orderState)" :order="order"> </detailLogistics>
      <!-- 在 #fallback 插槽中显示 “正在加载中” -->
      <template #fallback>
        <div class="loading">
          <img src="@/assets/images/loading.gif" alt="">
        </div>
      </template>
    </Suspense>

    <!-- 订单商品信息 -->
    <detailInfo :order="order"></detailInfo>
  </div>
</template>
<script setup >
import detailStep from './components/detail-step.vue'
import detailAction from './components/detail-action.vue';
import detailLogistics from './components/detail-logistics.vue';
import detailInfo from './components/detail-info.vue';
import { ref, onErrorCaptured } from 'vue'
import { findOrderDetail, } from '@/apis/order.js'
import { useRoute } from 'vue-router';
const route = useRoute()
const order = ref('')

findOrderDetail(route.params.orderId).then(res => {
  order.value = res.result
})

const zkspeding = () => {
  console.log('val', '等待中');
}
const zksresolve = () => {
  console.log('val', '已完成');
}
const zksfallback = () => {
  console.log('val', '加载中');
}
onErrorCaptured(() => {
  console.log('遇到错误');
})
</script>



<style lang='scss' scoped>
.order-detail-page {
  height: 100%;
  background-color: #fff;
}

.loading {
  height: 20%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>