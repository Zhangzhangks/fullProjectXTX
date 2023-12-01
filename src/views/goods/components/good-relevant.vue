<template>
    <div class="goods-relevant">
        <div class="header">
            <i class="icon" />
            <span class="title">{{ props.goodsId ? '同类商品推荐' : '猜你喜欢' }}</span>
        </div>

        <XtxCarousel :banners="getGoodsList" style="height:380px" auto-play></XtxCarousel>
    </div>
</template>

<script setup>
import { findRelGoods } from '@/apis/product'
import XtxCarousel from '@/components/libirary/xtx-carousel.vue';
import { onMounted, ref } from 'vue';
const getGoodsList = ref([])
const props = defineProps(['goodsId'])
findRelGoods(props.goodsId).then(res => {

    const length = Math.ceil(res.result.length / 4)
    res.result.forEach((item, i) => {
        getGoodsList.value.push(res.result.slice(i * length, i * length + 4))
    })
    getGoodsList.value = getGoodsList.value.filter(item => item.length > 0)
})

</script>

<style scoped lang='scss'>
.goods-relevant {
    background: #fff;
    min-height: 460px;
    margin-top: 20px;

    .header {
        height: 80px;
        line-height: 80px;
        padding: 0 20px;

        .title {
            font-size: 20px;
            padding-left: 10px;
        }

        .icon {
            width: 16px;
            height: 16px;
            display: inline-block;
            border-top: 4px solid $xtxColor;
            border-right: 4px solid $xtxColor;
            box-sizing: border-box;
            position: relative;
            transform: rotate(45deg);

            &::before {
                content: "";
                width: 10px;
                height: 10px;
                position: absolute;
                left: 0;
                top: 2px;
                background: lighten($xtxColor, 40%);
            }
        }
    }
}

:deep(.xtx-carousel) {
    height: 380px;

    .carousel {
        &-indicator {
            bottom: 30px;

            span {
                &.active {
                    background: $xtxColor;
                }
            }
        }

        &-btn {
            top: 110px;
            opacity: 1;
            background: rgba(0, 0, 0, 0);
            color: #ddd;

            i {
                font-size: 30px;
            }
        }
    }
}
</style>