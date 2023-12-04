<template>
    <div class="detail-action">
        <div class="state">
            <span class="iconfont icon-order-unpay"></span>
            <p>{{ orderStatus[order.orderState].label }}</p>
        </div>
        <div class="info">
            <p>订单编号：{{ order.id }}</p>
            <p>下单时间:{{ order.createTime }}</p>
        </div>
        <div class="btn">
            <!-- 待付款 -->
            <template v-if="order.orderState === 1">
                <XtxButton @click="$router.push('/member/pay?id=' + order.id)" type="primary" size="small">立即付款</XtxButton>
                <XtxButton type="gray" size="small">取消订单</XtxButton>
            </template>
            <!-- 待发货 -->
            <template v-if="order.orderState === 2">
                <XtxButton type="primary" size="small" @click="aganeBuy(order)">再次购买
                </XtxButton>
            </template>
            <!-- 待收货 -->
            <template v-if="order.orderState === 3">
                <XtxButton type="primary" size="small">确认收货</XtxButton>
                <XtxButton type="primary" size="small" @click="aganeBuy(order)">再次购买
                </XtxButton>
            </template>
            <!-- 待评价 -->
            <template v-if="order.orderState === 4">
                <XtxButton type="primary" size="small" @click="aganeBuy(order)">再次购买
                </XtxButton>
                <XtxButton type="plain" size="small">评价商品</XtxButton>
                <XtxButton type="gray" size="small">申请售后</XtxButton>
            </template>
            <!-- 已完成 -->
            <template v-if="order.orderState === 5">
                <XtxButton type="primary" size="small" @click="aganeBuy(order)">再次购买
                </XtxButton>
                <XtxButton type="plain" size="small">查看评价</XtxButton>
                <XtxButton type="gray" size="small">申请售后</XtxButton>
            </template>
            <!-- 已取消 -->
        </div>
    </div>
</template>
<script setup>
import { orderStatus } from '@/apis/constant.js'
import { useRouter } from 'vue-router';
const props = defineProps({
    order: {
        type: Object,
        default() {
            return {}
        }

    }
})
const router = useRouter()
const aganeBuy = (order) => {

    router.push(`/member/checkout?orderId=${+ order.id}`)
}
</script>
<style scoped lang="scss">
.detail-action {
    height: 180px;
    width: 100%;
    display: flex;
    align-items: center;

    .state {
        width: 220px;
        text-align: center;

        .iconfont {
            font-size: 40px;
            color: $xtxColor;
        }

        p {
            font-size: 16px;
            color: #666;
            margin-bottom: 10px;
        }
    }

    .info {
        width: 240px;
        line-height: 30px;

        p {
            color: #999;
        }
    }

    .btn {
        flex: 1;
        text-align: right;
        margin-right: 100px;
        display: flex;
        justify-content: flex-end;

        .xtx-button {
            margin-left: 20px;
        }
    }
}
</style>