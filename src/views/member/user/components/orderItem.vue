<template>
    <div class="order-item">
        <div class="head">
            <span>下单时间:{{ order.createTime }}</span>
            <span>订单编号{{ order.id }}</span>
            <span class="down-time" v-if="order.orderState === 1">
                <i class="iconfont icon-down-time"></i>
                <b>付款截止：{{ FormatTime }}</b>
            </span>
            <!-- 已完成 已取消 -->
            <a v-if="[5, 6].includes(order.orderState)" href="javascript:;" class="del" @click="delteOrder(order)">删除</a>
        </div>


        <div class="body">
            <div class="column goods">
                <ul>
                    <li v-for=" i in order.skus " :key="i.id">
                        <router-link class="image" :to="`/product/${i.skuId}`">
                            <img :src="i.image" />
                        </router-link>
                        <div class="info">
                            <p class="name ellipsis-2">{{ i.name }}</p>
                            <p class="attr ellipsis">
                                <span>{{ i.attrsText }}</span>

                            </p>
                        </div>
                        <div class="price">¥{{ i.curPrice }}</div>
                        <div class="count">x{{ i.quantity }}</div>
                    </li>
                </ul>
            </div>
            <div class="column state">
                <p>{{ orderStatus[order.orderState].label }}</p>
                <!-- 待收货：查看物流 -->
                <!-- 待评价：评价商品 -->
                <!-- 已完成：查看评价 -->
                <p v-if="order.orderState === 3"><a href="javascript:;" class="green"
                        @click="watchlogistics(order)">查看物流</a></p>

                <p v-if="order.orderState === 4"><a href="javascript:;" class="green">评价商品</a></p>
                <p v-if="order.orderState === 5"><a href="javascript:;" class="green">查看评价</a></p>
            </div>
            <div class="column amount">
                <p class="red">¥{{ order.totalMoney }}</p>
                <p>（含运费：¥{{ order.postFee }}）</p>
                <p>在线支付</p>
            </div>
            <div class="column action">
                <!-- 待支付：立即付款，查看详情，取消订单 -->
                <!-- 待发货：查看详情，再次购买 -->
                <!-- 待收货：确认收货，查看详情，再次购买 -->
                <!-- 待评价：查看详情，再次购买，申请售后 -->
                <!-- 已完成：查看详情，再次购买，申请售后 -->
                <!-- 已取消：查看详情 -->
                <XtxButton v-if="order.orderState === 1" type="primary" size="small">立即付款</XtxButton>
                <XtxButton v-if="order.orderState === 3" type="primary" size="small" @click="useConfirmOrder(order)">确认收货
                </XtxButton>
                <p>
                    <router-link :to="`/member/order/${order.id}`">查看详情</router-link>
                </p>
                <p v-if="order.orderState === 1" @click="cancelOrder(order)"><a href="javascript:;">取消订单</a></p>
                <p v-if="[2, 3, 4, 5].includes(order.orderState)"><a
                        @click="$router.push(`/member/checkout?orderId=${order.id}`)" href="javascript:;">再次购买</a></p>
                <p v-if="[4, 5].includes(order.orderState)"><a href="javascript:;">申请售后</a></p>
            </div>
        </div>
    </div>
</template>
<script setup >
import { orderStatus } from '@/apis/constant.js'
import useCountdown from '@/views/member/pay/countdown.js'
const { FormatTime, start } = useCountdown()
const props = defineProps({
    order: {
        type: Array,
        default: () => {
            return []
        }
    }
})
start(props.order.countdown)

const emit = defineEmits(['cancelOrder', 'delOrder', 'confirmOrder', 'logisticsEmits'])
// 取消
const cancelOrder = (order) => {
    emit('cancelOrder', order)
}
// 删除
const delteOrder = (order) => {
    emit('delOrder', order)
}

// 确认收货
// 封装逻辑-确认收货
const useConfirmOrder = (item) => {
    // item 就是你要确认收货的订单
    emit('confirmOrder', item)
}
const watchlogistics = (order) => {

    emit('logisticsEmits', order)
}
</script>
<style lang="scss" scoped>
.order-item {
    margin-bottom: 20px;
    border: 1px solid #f5f5f5;

    .head {
        height: 50px;
        line-height: 50px;
        background: #f5f5f5;
        padding: 0 20px;
        overflow: hidden;

        span {
            margin-right: 20px;

            &.down-time {
                margin-right: 0;
                float: right;

                i {
                    vertical-align: middle;
                    margin-right: 3px;
                }

                b {
                    vertical-align: middle;
                    font-weight: normal;
                }
            }
        }

        .del {
            margin-right: 0;
            float: right;
            color: #999;
        }
    }

    .body {
        display: flex;
        align-items: stretch;

        .column {
            border-left: 1px solid #f5f5f5;
            text-align: center;
            padding: 20px;

            >p {
                padding-top: 10px;
            }

            &:first-child {
                border-left: none;
            }

            &.goods {
                flex: 1;
                padding: 0;
                align-self: center;

                ul {
                    li {
                        border-bottom: 1px solid #f5f5f5;
                        padding: 10px;
                        display: flex;

                        &:last-child {
                            border-bottom: none;
                        }

                        .image {
                            width: 70px;
                            height: 70px;
                            border: 1px solid #f5f5f5;
                        }

                        .info {
                            width: 220px;
                            text-align: left;
                            padding: 0 10px;

                            p {
                                margin-bottom: 5px;

                                &.name {
                                    height: 38px;
                                }

                                &.attr {
                                    color: #999;
                                    font-size: 12px;

                                    span {
                                        margin-right: 5px;
                                    }
                                }
                            }
                        }

                        .price {
                            width: 100px;
                        }

                        .count {
                            width: 80px;
                        }
                    }
                }
            }

            &.state {
                width: 120px;

                .green {
                    color: $xtxColor;
                }
            }

            &.amount {
                width: 200px;

                .red {
                    color: $priceColor;
                }
            }

            &.action {
                width: 140px;

                a {
                    display: block;

                    &:hover {
                        color: $xtxColor;
                    }
                }
            }
        }
    }
}
</style>