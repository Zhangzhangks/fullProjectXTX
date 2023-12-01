<template>
    <div class="member-home" v-if="goods.length>0">
        <!-- 概览 -->
      <homeOverview></homeOverview>
            <!-- 收藏 -->
            <MemberHomePanel title="我的收藏">
             <template  v-for="item in goods" >
                 <GoodsItem :goods="item"> </GoodsItem>
             </template>
            </MemberHomePanel>
            <MemberHomePanel title="我的足迹">
               <template  v-for="item in goods" >
                     <GoodsItem :goods="item"> </GoodsItem>
                 </template>
            </MemberHomePanel>
        <!-- 猜你喜欢 -->
        <GoodsRelevant></GoodsRelevant>
    </div>
</template>
<script setup >
import { ref } from 'vue'
import GoodsRelevant from '@/views/goods/components/good-relevant.vue'
import MemberHomePanel from './components/home-panel.vue'
import homeOverview from './components/home-overview.vue'
import GoodsItem from '@/views/category/components/goods-item.vue'
import { findCollect } from '@/apis/member'
import axios from 'axios'
import request from '@/utils/request'
const goods=ref([])
const goods2 = ref([])

request('/member/zks', 'post', ({
    page: 1,
    pageSize: 10,
    type:1
})).then(res => {
    // console.log(res.data);
})
// axios.get('http://exampleMockzks.com',).then(res => {
//     goods2.value = res.data.data
//     // console.log(res.data.data);
// })



// 调用模拟的接口
const collectGoods = ref([])
findCollect({
    page: 1,
    pageSize: 4
}).then(res => {
    console.log(res);
    goods.value=res.result.items
    // collectGoods.value = data.result.items
})


</script>


<style lang='scss' scoped>
:deep(.xtx-carousel) .carousel-btn.prev {
    left: 2px !important;
}

:deep(.xtx-carousel) .carousel-btn.next {
    right: 2px !important;
}
</style>