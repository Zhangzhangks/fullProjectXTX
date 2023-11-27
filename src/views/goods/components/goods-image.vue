<template>
    <div class="goods-image">
        <div class="large" :style="[{ backgroundImage: `url(${images[currIndex]})` },
        { backgroundPosition: `${positionX}px ${positionY}px` }]" v-show="!isOutside"></div>
        <div class="middle" ref="target">
            <img :src="images[currIndex]" alt="">
            <div class="layer" v-show="!isOutside" :style="{ left: left + 'px', top: top + 'px' }"> </div>
        </div>
        <ul class="small">
            <li v-for="(img, i) in images" :key="img" :class="{ active: i === currIndex }">
                <img :src="img" alt="" @click="currIndex = i">
            </li>
        </ul>
    </div>
</template>
<script setup>
import { reactive, ref, watch } from 'vue'
import { useMouseInElement } from '@vueuse/core'

const props = defineProps({
    images: { type: Array, default: () => [] }
})

const currIndex = ref(0)
const left = ref(0)
const top = ref(0)

const positionX = ref(0)
const positionY = ref(0)
// 图片跟随移动逻辑
const target = ref('')
const { elementX, elementY, isOutside } = useMouseInElement(target)
//1. 监听鼠标在盒子内的变化
watch([elementX, elementY, isOutside], () => {

    if (isOutside.value) return;
    if (elementX.value < 100) { left.value = 0 }
    if (elementX.value >= 300) { left.value = 200 }
    if (elementY.value < 100) { top.value = 0 }
    if (elementY.value >= 300) { top.value = 200 }

    if (elementX.value > 100 && elementX.value < 300) {
        left.value = elementX.value - 100
    }
    // 纵向
    if (elementY.value > 100 && elementY.value < 300) {
        top.value = elementY.value - 100
    }
    positionX.value = -left.value * 2
    positionY.value = -top.value * 2
}, { immediate: true })
</script>
<style scoped lang="scss">
.goods-image {
    width: 480px;
    height: 400px;
    position: relative;
    display: flex;
    z-index: 500;

    .large {
        position: absolute;
        top: 0;
        left: 412px;
        width: 400px;
        height: 400px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        background-repeat: no-repeat;
        background-size: 800px 800px;
        background-color: #f8f8f8;

    }

    .middle {
        width: 400px;
        height: 400px;
        background: #f5f5f5;
        position: relative;
        cursor: move;

        .layer {
            width: 200px;
            height: 200px;
            background: rgba(0, 0, 0, .2);
            left: 0;
            top: 0;
            position: absolute;
        }
    }

    .small {
        width: 80px;

        li {
            width: 68px;
            height: 68px;
            margin-left: 12px;
            margin-bottom: 15px;
            cursor: pointer;

            &:hover,
            &.active {
                border: 2px solid $xtxColor;
            }
        }
    }
}
</style>