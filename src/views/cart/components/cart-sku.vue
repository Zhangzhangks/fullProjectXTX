<template>
    <div class="cart-sku" ref="target">
        <div class="attrs" @click="toggle">
            <span class="ellipsis">{{ attrs }}</span>
            <i class="iconfont icon-angle-down"></i>
        </div>
        <div class="layer" v-if="visible">
            <div class="loading" v-if="loading"></div>
            <XtxSku :skuId="skuId" @change="injectSku" :goods="goods" v-else></XtxSku>
            <XtxButton v-if="goods" size="mini" type="primary" style="margin-left: 60px;" @click="submit">确认</XtxButton>
        </div>
    </div>
</template>
<script setup>
import { onClickOutside } from '@vueuse/core'
import { getSpecsAndSkus } from '@/apis/cart'
import { ref } from 'vue';
const props = defineProps({
    attrs: {
        type: Object,
        default: () => ({})
    },
    skuId: {
        type: String,
        default: ''
    }
});

const target = ref(null);
const visible = ref(false);
const goods = ref({})
const loading = ref(false)
// 打开
const open = () => {
    loading.value = true;
    visible.value = true;
    getSpecsAndSkus(props.skuId).then(res => {
        // console.log(res);
        loading.value = false;
        goods.value = res.result
    })
}

// 关闭
const close = () => {
    visible.value = false;
}
// 切换
const toggle = () => {
    visible.value ? close() : open();
}
// 点击外部关闭
onClickOutside(target, (event) => close())

// 选择SKU时候触发
const currSku = ref(null)
const injectSku = (sku) => {
    currSku.value = sku
}
const submit = () => {
    console.log(goods.value);
    // 给购物车组件数据的前提：有sku信息，sku信息完整，sku中的skuId不能现有props.skuId一样
    if (currSku.value && currSku.value.skuId && currSku.value.skuId !== props.skuId) {
        emit('change', currSku.value)
        close()
    }
}
</script>
<style scoped lang="scss">
.cart-sku {
    height: 28px;
    border: 1px solid #f5f5f5;
    padding: 0 6px;
    position: relative;
    margin-top: 10px;
    display: inline-block;

    .attrs {
        line-height: 24px;
        display: flex;

        span {
            max-width: 230px;
            font-size: 14px;
            color: #999;
        }

        i {
            margin-left: 5px;
            font-size: 14px;
        }
    }

    .layer {
        position: absolute;
        left: -1px;
        top: 40px;
        z-index: 10;
        width: 400px;
        border: 1px solid $xtxColor;
        box-shadow: 2px 2px 4px lighten($xtxColor, 50%);
        background: #fff;
        border-radius: 4px;
        font-size: 14px;
        padding: 20px;

        &::before {
            content: "";
            width: 12px;
            height: 12px;
            border-left: 1px solid $xtxColor;
            border-top: 1px solid $xtxColor;
            position: absolute;
            left: 12px;
            top: -8px;
            background: #fff;
            transform: scale(.8, 1) rotate(45deg);
        }

        .loading {
            height: 224px;
            background: url(../../../assets/images/loading.gif) no-repeat center;
        }
    }
}
</style>