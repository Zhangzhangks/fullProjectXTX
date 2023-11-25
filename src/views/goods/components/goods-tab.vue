<template>
    <div class="goods-tabs">
        <nav>
            <a :class="{ active: activeName === 'detail' }" href="javascript:;" @click="clickTab('detail')">商品详情</a>
            <a :class="{ active: activeName === 'comment' }" href="javascript:;"
                @click="clickTab('comment')">商品评价<span>(500+)</span></a>
        </nav>

        <!-- 这个位置显示对应的组件 GoodsDetail 或者 GoodsComment -->
        <keep-alive>
            <component :is="activeName === 'detail' ? Goodsdetail : GoodsComment" />
        </keep-alive>

    </div>
</template>
<script setup >
import { ref, reactive } from 'vue'
import GoodsComment from './gods-comment.vue'
import Goodsdetail from './goods-detail.vue'
const activeName = ref('detail')
const clickTab = (i) => {
    activeName.value = i
}
</script>


<style lang='scss' scoped>
.goods-tabs {
    min-height: 600px;
    background: #fff;

    nav {
        height: 70px;
        line-height: 70px;
        display: flex;
        border-bottom: 1px solid #f5f5f5;

        a {
            padding: 0 40px;
            font-size: 18px;
            position: relative;

            >span {
                color: $priceColor;
                font-size: 16px;
                margin-left: 10px;
            }

            &:first-child {
                border-right: 1px solid #f5f5f5;
            }

            &.active {
                &::before {
                    content: "";
                    position: absolute;
                    left: 40px;
                    bottom: -1px;
                    width: 72px;
                    height: 2px;
                    background: $xtxColor;
                }
            }
        }
    }
}
</style>