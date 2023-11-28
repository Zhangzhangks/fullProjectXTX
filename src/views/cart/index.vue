<template>
    <div class="xtx-cart-page">
        <div class="container">
            <XtxBread>
                <XtxBreadItem to="/">首页</XtxBreadItem>
                <XtxBreadItem>购物车</XtxBreadItem>
            </XtxBread>
            <div class="cart">
                <table>
                    <thead>
                        <tr>
                            <th width="120">
                                <XtxCheckbox :modelValue="isCheckAll" @change="changeCheckAll" />
                                <span>全选</span>
                            </th>
                            <th width="400">商品信息</th>
                            <th width="220">单价</th>
                            <th width="180">数量</th>
                            <th width="180">小计</th>
                            <th width="140">操作</th>
                        </tr>
                    </thead>
                    <!-- 有效商品 -->
                    <tbody>
                        <tr>
                            <td colspan="6">
                                <template v-if="effectCount.length === 0">
                                    <div class="cart-none">
                                        <img src="@/assets/images/none.png" alt="" />
                                        <p>购物车内暂时没有商品</p>
                                        <div class="btn">
                                            <XtxButton type="primary" @click="$router.push('/')">继续逛逛</XtxButton>
                                        </div>
                                    </div>
                                </template>
                            </td>
                        </tr>
                        <tr v-for="i in effectCount" :key="i">
                            <td>

                                <XtxCheckbox :modelValue="i.selected"
                                    @change="(selected) => sigleCheck({ skuId: i.skuId, selected: selected })" />
                            </td>
                            <td>
                                <div class="goods">
                                    <RouterLink to="/"><img :src="i.picture" alt=""></RouterLink>
                                    <div>
                                        <p class="name ellipsis">{{ i.name }}</p>
                                        <!-- 选择规格组件 -->
                                        <cartsku :attrs="i.attrsText" :skuId="i.skuId"></cartsku>
                                    </div>
                                </div>
                            </td>
                            <td class="tc">
                                <p>&yen;{{ i.price }}</p>
                                <p v-if="i.price - i.nowPrice > 0">
                                    比加入时降价 <span class="red">&yen;{{ i.price - i.nowPrice
                                    }}</span>
                                </p>
                            </td>
                            <td class="tc">
                                <XtxNumbox :modelValue="i.count"
                                    @change="(count) => sigleCheck({ skuId: i.skuId, count: count })" :max="i.stock" />
                            </td>
                            <td class="tc">
                                <p class="f16 red">&yen;{{ (i.count * i.price).toFixed(2) }}</p>
                            </td>
                            <td class="tc">
                                <p><a href="javascript:;">移入收藏夹</a></p>
                                <p><a class="green" href="javascript:;" @click="deleteCart(i.skuId)">删除</a></p>
                                <p><a href="javascript:;">找相似</a></p>
                            </td>
                        </tr>

                    </tbody>

                    <!-- 无效商品 -->
                    <tbody v-if="UneffectCount.length > 0">
                        <tr>
                            <td colspan="6">
                                <h3 class="tit">失效商品</h3>
                            </td>
                        </tr>
                        <tr v-for="i in UneffectCount" :key="i">
                            <td>
                                <XtxCheckbox :modelValue="i.selected"
                                    @change="(selected) => sigleCheck({ skuId: i.skuId, selected: selected })" />
                            </td>
                            <td>
                                <div class="goods">
                                    <RouterLink to="/"><img :src="i.picture" alt=""></RouterLink>
                                    <div>
                                        <p class="name ellipsis">{{ i.name }}</p>
                                        <p class="attr">{{ i.attrsText }}</p>
                                    </div>
                                </div>
                            </td>
                            <td class="tc">
                                <p>&yen;{{ i.price }}</p>
                            </td>
                            <td class="tc">{{ i.count }}</td>
                            <td class="tc">
                                <p>&yen;{{ i.count * i.price }}</p>
                            </td>
                            <td class="tc">
                                <p><a class="green" href="javascript:;" @click="deleteCart(i.skuId)">删除</a></p>
                                <p><a href="javascript:;">找相似</a></p>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <!-- 操作栏 -->
            <div class="action">
                <div class="batch">
                    <XtxCheckbox :modelValue="isCheckAll" @change="changeCheckAll">全选</XtxCheckbox>
                    <a href="javascript:;" @click="deleteMutiple">删除商品</a>
                    <a href="javascript:;">移入收藏夹</a>
                    <a href="javascript:;" @click="deleteMutipleUnvalid"> 清空失效商品</a>
                </div>
                <div class="total">
                    共 {{ validTotal }} 件商品，已选择 {{ selectedTotal }} 件，商品合计：
                    <span class="red">￥{{ selectedPrice.toFixed(2) }}</span>
                    <XtxButton type="primary">下单结算</XtxButton>
                </div>
            </div>
            <!-- 猜你喜欢 -->
            <GoodRelevant />
        </div>
    </div>
</template>
<script setup>
import GoodRelevant from '@/views/goods/components/good-relevant.vue';
import { useCartStore } from '@/store/modules/cartStore'
import { storeToRefs } from 'pinia';
import XtxNumbox from '@/components/libirary/xtx-numbox.vue';
import cartsku from './components/cart-sku.vue'
const { sigleCheck, deleteCart, changeCheckAll, mutipleDel } = useCartStore();
const { selectedTotal, UneffectCount, selectedPrice, effectCount, validTotal, isCheckAll } = storeToRefs(useCartStore())
const deleteMutiple = () => {
    effectCount.value.filter(item => item.selected).forEach(ele => {
        mutipleDel(ele.skuId)
    });
}
const deleteMutipleUnvalid = () => {
    UneffectCount.value.filter(item => item.selected).forEach(ele => {
        mutipleDel(ele.skuId)
    });
}
</script>
<style scoped lang="scss">
.tc {
    text-align: center;

    .xtx-numbox {
        margin: 0 auto;
        width: 120px;
    }
}

.red {
    color: $priceColor;
}

.green {
    color: $xtxColor
}

.f16 {
    font-size: 16px;
}

.goods {
    display: flex;
    align-items: center;

    img {
        width: 100px;
        height: 100px;
    }

    >div {
        width: 280px;
        font-size: 16px;
        padding-left: 10px;

        .attr {
            font-size: 14px;
            color: #999;
        }
    }
}

.action {
    display: flex;
    background: #fff;
    margin-top: 20px;
    height: 80px;
    align-items: center;
    font-size: 16px;
    justify-content: space-between;
    padding: 0 30px;



    .xtx-checkbox {
        color: #999;
    }

    .batch {
        a {
            margin-left: 20px;
        }
    }

    .red {
        font-size: 18px;
        margin-right: 20px;
        font-weight: bold;
    }
}

.tit {
    color: #666;
    font-size: 16px;
    font-weight: normal;
    line-height: 50px;
}

.xtx-cart-page {
    .cart {
        background: #fff;
        color: #666;

        table {
            border-spacing: 0;
            border-collapse: collapse;
            line-height: 24px;

            th,
            td {
                padding: 10px;
                border-bottom: 1px solid #f5f5f5;

                .cart-none {
                    display: flex;
                    justify-content: center;
                    flex-direction: column;
                    align-items: center;
                    text-align: center;
                    padding: 150px 0;
                    background: #fff;

                    img {
                        width: 180px;
                    }

                    p {
                        color: #999999;
                        padding: 20px 0;
                    }
                }

                &:first-child {
                    text-align: left;
                    padding-left: 30px;
                    color: #999;
                }
            }

            th {
                font-size: 16px;
                font-weight: normal;
                line-height: 50px;
            }
        }
    }
}
</style>