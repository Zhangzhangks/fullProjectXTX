<template>
    <div class="container" ref="productRef">
        <div class="home-product">
            <HomePanel :title="item.name" v-for="item in productList" :key="item.id">
                <template #right>
                    <div class="sub">
                        <RouterLink :to="`/category/sub/${item.id}`" v-for="sub in item.children.slice(0, 4)" :key="sub.id">
                            {{ sub.name }}
                        </RouterLink>

                    </div>
                    <XtxMore :path="`/category/${item.id}`" />
                </template>
                <div class="box">
                    <RouterLink class="cover" :to="`/category/${item.id}`">
                        <img v-lazy="item.picture" alt="">
                        <strong class="label">
                            <span>{{ item.saleInfo }}</span>
                        </strong>
                    </RouterLink>
                    <ul class="goods-list">
                        <li v-for="goods in item.goods" :key="goods.id">
                            <HomeGoods :goods="goods" />
                        </li>
                    </ul>
                </div>
            </HomePanel>
        </div>
    </div>
</template>

<script setup>
import HomePanel from './home-pannel.vue'
import HomeGoods from './home-goods.vue'
import { findGoods } from '@/apis/home'
import { lazyData } from '@/hooks/lazy-data';
import { ref, watchEffect } from 'vue';

const productRef = ref('');
const productList = ref([])
const result = lazyData(productRef, findGoods)
const stop = watchEffect(() => {
    // console.log(result.value, '产品区块');
    productList.value = result.value;
    if (productList.value.length > 0) {
        stop()
    }
})
</script>

<style scoped lang='scss'>
.home-product {
    background: #fff;
    height: 2900px;

    .sub {
        margin-bottom: 2px;

        a {
            padding: 2px 12px;
            font-size: 16px;
            border-radius: 4px;

            &:hover {
                background: $xtxColor;
                color: #fff;
            }

            &:last-child {
                margin-right: 80px;
            }
        }
    }

    .box {
        display: flex;

        .cover {
            width: 240px;
            height: 610px;
            margin-right: 10px;
            position: relative;

            img {
                width: 100%;
                height: 100%;
                object-fit: cover;
            }

            .label {
                width: 188px;
                height: 66px;
                display: flex;
                font-size: 18px;
                color: #fff;
                line-height: 66px;
                font-weight: normal;
                position: absolute;
                left: 0;
                top: 50%;
                transform: translate3d(0, -50%, 0);

                span {
                    text-align: center;

                    &:first-child {
                        width: 76px;
                        background: rgba(0, 0, 0, .9);
                    }

                    &:last-child {
                        flex: 1;
                        background: rgba(0, 0, 0, .7);
                    }
                }
            }
        }

        .goods-list {
            width: 990px;
            display: flex;
            flex-wrap: wrap;

            li {
                width: 240px;
                height: 300px;
                margin-right: 10px;
                margin-bottom: 10px;

                &:nth-last-child(-n+4) {
                    margin-bottom: 0;
                }

                &:nth-child(4n) {
                    margin-right: 0;
                }
            }
        }
    }
}
</style>