<template>
    <div class='xtx-goods-page' v-if="goods">
        <div class="container">
            <!-- 面包屑 -->
            <XtxBread>
                <XtxBreadItem v-if="productListBread.length" to="/">首页</XtxBreadItem>
                <Transition mode="out-in" enter-active-class="animate__animated  animate__flash"
                    leave-active-class="animate__animated animate__backOutDown">
                    <XtxBreadItem v-if="productListBread.length" :to="`/category/${productListBread[0].id}`">{{
                        productListBread[0].name }}
                    </XtxBreadItem>
                </Transition>
                <Transition mode="out-in" enter-active-class="animate__animated  animate__rubberBand"
                    leave-active-class="animate__animated animate__backOutRight">
                    <XtxBreadItem v-if="productListBread.length" :to="`/category/sub/${productListBread[1].id}`">{{
                        productListBread[1].name }}
                    </XtxBreadItem>

                </Transition>
                <Transition mode="out-in" enter-active-class="animate__animated  animate__backInRight"
                    leave-active-class="animate__animated animate__backOutRight">
                    <XtxBreadItem v-if="productListBread.length">{{ productListBread[2].name }}</XtxBreadItem>
                </Transition>

            </XtxBread>
            <!-- 商品信息 -->
            <!-- 商品信息 -->
            <div class="goods-info">
                <div class="media">
                    <!-- 放大镜图 -->
                    <GoodsImage :images="goods.mainPictures"></GoodsImage>
                    <!-- 销售信息 -->
                    <goodsSale></goodsSale>

                </div>
                <div class="spec">
                    <!-- 商品配送信息 -->
                    <goodsName :goods="goods"></goodsName>
                    <!-- sku信息 -->
                    <XtxSku skuId="" @change="changeSku" :goods="goods"></XtxSku>
                    <XtxNumbox label="数量" v-model="num" :max="goods.inventory" />
                    <XtxButton style="margin-top:20px;" type="primary" size="middle">加入购物车</XtxButton>
                </div>
            </div>
            <!-- 商品推荐 -->
            <GoodsRelevant v-if="goods" />

            <!-- 商品详情 -->
            <div class="goods-footer">
                <div class="goods-article">
                    <!-- 商品+评价 -->
                    <div class="goods-tabs">
                        <goodsTab></goodsTab>
                    </div>
                    <!-- 注意事项 -->
                    <div class="goods-warn">
                        <goodWarn />
                    </div>
                </div>
                <!-- 24热榜+专题推荐 -->

                <!-- 24热榜+专题推荐 -->
                <div class="goods-aside">
                    <goodsHot :goodsId="goods.id" :type="1" />
                    <goodsHot :goodsId="goods.id" :type="2" />
                    <goodsHot :goodsId="goods.id" :type="3" />
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { useRoute } from 'vue-router';
import GoodsRelevant from './components/good-relevant.vue'
import GoodsImage from './components/goods-image.vue'
import goodsSale from './components/goods-sale.vue';
import goodsName from './components/goods-name.vue'
import goodsTab from './components/goods-tab.vue';
import goodsHot from './components/goods-hot.vue';
import goodWarn from './components/good.warn.vue';
import { findGoods } from '@/apis/product'
import { ref, computed, watch, nextTick, provide } from 'vue'
import XtxSku from '@/components/libirary/xtx-sku.vue';
import XtxButton from '@/components/libirary/xtx-button.vue';

const num = ref(1)
// 获取商品详情
const useGoods = () => {
    // 出现路由地址商品ID发生变化，但是不会重新初始化组件
    const goods = ref(null)
    const route = useRoute()
    watch(() => route.params.id, (newVal) => {
        if (newVal && `/product/${newVal}` === route.path) {
            findGoods(route.params.id).then(data => {
                // console.log(data, '商品详情');
                // 让商品数据为null让后使用v-if的组件可以重新销毁和创建
                goods.value = null
                nextTick(() => {
                    goods.value = data.result
                })
            })
        }
    }, { immediate: true })
    return goods
}
const goods = useGoods();

// 拿取面包屑数据
const productListBread = computed(() => {
    const cate = ref([])
    if (goods.value?.id) {
        goods.value.categories.forEach(item => {
            cate.value.push({
                id: item.id,
                name: item.name
            })
            cate.value.reverse();
        })
        cate.value.push({
            id: goods.value.id,
            name: goods.value.name
        })
    }
    return cate.value

})

provide('goods', goods)
const changeSku = (sku) => {
    if (sku.skuId) {
        goods.value.price = sku.price
        goods.value.oldPrice = sku.oldPrice
        goods.value.inventory = sku.inventory
    }
}
</script>


<style scoped lang='scss'>
.goods-info {
    min-height: 600px;
    background: #fff;
    display: flex;

    .media {
        width: 580px;
        height: 600px;
        padding: 30px 50px;
    }

    .spec {
        flex: 1;
        padding: 30px 30px 30px 0;
    }
}

.goods-footer {
    display: flex;
    margin-top: 20px;

    .goods-article {
        width: 940px;
        margin-right: 20px;
    }

    .goods-aside {
        width: 280px;
        min-height: 1000px;
    }
}

.goods-tabs {
    min-height: 600px;
    background: #fff;
}

.goods-warn {
    min-height: 600px;
    background: #fff;
    margin-top: 20px;
}
</style>