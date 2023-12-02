<template>
  <div class="member-order">
    <XtxTabs v-model="activeName" @tab-click="changeTab">
      <XtxTabsPanel :label="item.label" :name="item.name" v-for="item in orderStatus" :key="item">

      </XtxTabsPanel>
    </XtxTabs>
    <!-- 订单列表 -->
    <div class="order-list" v-if="!loading">
      <orderItem v-for="item in  orderList " :key="item.id" :order="item" @cancelOrder="cancelOrder"
        @confirmOrder="confirmOrder" @delOrder="delOrder" @logisticsEmits="logistics">
      </orderItem>
    </div>

    <div class="loading" v-else>
      <img src="@/assets/images/loading.gif" alt="">
    </div>
    <div class="none" v-if="!loading && orderList.length === 0">暂无数据</div>

    <!-- 取消订单 -->
    <orderCancel ref="cancelRef"></orderCancel>
    <!-- 查看物流 -->
    <logisticsComponent ref="confirmlogisticsRef"></logisticsComponent>

    <!-- 分页组件 -->
    <XtxPagination v-if="orderList.length > 0" :pageSize="reqParams.pageSize" :currentPage="reqParams.page" :total="total"
      @changePage="changePage"></XtxPagination>


  </div>
</template>
<script setup >
import logisticsComponent from './components/logistics.vue'
import orderCancel from './components/order-cancel.vue'
import orderItem from './components/orderItem.vue'
import { ref, reactive, watch } from 'vue'
import { orderStatus } from '@/apis/constant'
import confirm from '@/components/libirary/confirm'
import message from '@/components/libirary/message'
import { findOrderList, delteOrder, confirmOrderApi } from '@/apis/order'

const activeName = ref(orderStatus[0].name)
const total = ref('')
const reqParams = reactive({
  page: 1,
  pageSize: 5,
  orderState: 0
})
const orderList = ref([])
const loading = ref(false)
const changeTab = (tab, e) => {
  // console.log(name, e);
  reqParams.page = 1;
  reqParams.orderState = tab.index
  //1. tab切换加载显示效果
  ///2. 完成数据加载和无数据处理
  //3. 完成分页组件的显示
}
const changePage = (page) => {
  reqParams.page = page
}
// 筛选条件变化
watch(reqParams, () => {
  // 加载列表
  getOrderList()
}, { immediate: true })


const cancelRef = ref(null)
const cancelOrder = (order) => {
  cancelRef.value.open(order);
}
const delOrder = (order) => {
  confirm({
    title: '提示',
    message: '确定删除该订单？',
  }).then(res => {
    delteOrder([order.id]).then(res => {
      message({ type: 'success', text: '删除成功' })
      // 重新加载列表
      getOrderList()
    })
  })
    .catch(err => {
      message({ type: 'info', text: '已取消' })
    })
}
// 确认收货
const confirmOrder = (item) => {
  confirm({ message: '您确认收到货吗？确认后货款将会打给卖家。', title: '确认收货' }).then(() => {
    confirmOrderApi(item.id).then(() => {
      message({ text: '确认收货成功', type: 'success' })
      // 确认收货后状态变成 待评价
      item.orderState = 4
    })
  })
}

const confirmlogisticsRef = ref('')
// 查看物流
const logistics = (order) => {
  confirmlogisticsRef.value.open(order)
}
// 获取列表
function getOrderList() {
  loading.value = true
  findOrderList(reqParams).then(res => {
    loading.value = false
    orderList.value = res.result.items
    total.value = res.result.counts
  })
}
</script>


<style lang='scss' scoped>
.member-order {
  height: 100%;
  background-color: #fff;

  .order-list {
    background: #fff;
    padding: 20px;


  }

  .none {
    height: 400px;
    text-align: center;
    line-height: 400px;
    color: #999;
  }

  .loading {
    height: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
  }



}
</style>