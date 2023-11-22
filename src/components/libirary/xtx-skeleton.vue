<template>
    <div class="xtx-skeleton " :style="{ width: width, height: height }" :class="{ shan: aniamted }">
        <!-- 没有动画 -->
        <div class="box" :style="{ backgroundColor: bg }">
        </div>
    </div>
</template>

<script setup>
// 定义四个暴露属性
// 宽高 是否动画  背景颜色
const props = defineProps({
    width: {
        type: String,
        default: '60px'
    },
    height: {
        type: String,
        default: '180px'
    },
    aniamted: {
        type: Boolean,
        default: true
    },
    bg: {
        type: String,
        default: '#efefef'
    }
})



</script>
<style scoped lang="scss">
.xtx-skeleton {
    display: inline-block;
    position: relative;
    overflow: hidden;
    vertical-align: middle;

    .box {
        width: 100%;
        height: 100%;
        border-radius: 2px;
    }
}

.shan {
    &::after {
        position: absolute;
        content: '';
        top: 0;
        width: 50%;
        height: 100%;
        background: linear-gradient(to left,
                rgba(255, 255, 255, 0) 0,
                rgba(255, 255, 255, 0.3) 50%,
                rgba(255, 255, 255, 0) 100%);
        transform: skewX(-45deg);
        animation: move ease 1.5s infinite;
    }
}

@keyframes move {
    0% {
        left: -110%;
    }

    100% {
        left: 120%;
    }
}
</style>