<template>
    <div class='xtx-carousel' v-if="banners" @mouseenter="toggleTimer(true)" @mouseleave="toggleTimer(false)">
        <ul class="carousel-body">
            <li class="carousel-item " v-for="(item, index) in banners" :key="item"
                :class="{ fade: index === currentIndex }">

                <router-link :to="item.hrefUrl" v-if="item.imgUrl">
                    <img :src="item.imgUrl" alt="">
                </router-link>

                <!-- 商品列表 -->
                <div v-else class="slider">
                    <RouterLink v-for="goods in item" :key="goods.id" :to="`/product/${goods.id}`">
                        <img :src="goods.picture" alt="">
                        <p class="name ellipsis">{{ goods.name }}</p>
                        <p class="price">&yen;{{ goods.price }}</p>
                    </RouterLink>
                </div>
            </li>
        </ul>
        <!-- 上一张 -->
        <a href="javascript:;" class="carousel-btn prev" @click="toggle(-1)">
            <i class="iconfont icon-angle-left"></i></a>
        <!-- 下一张 -->
        <a href="javascript:;" class="carousel-btn next" @click="toggle(1)">
            <i class="iconfont icon-angle-right">

            </i></a>
        <!-- 指示器 -->
        <div class="carousel-indicator">
            <!-- active -->
            <h2>{{ currentIndex }}</h2>
            <span v-for="(item, index) in banners" :key="index" @click="currentIndex = index"
                :class="{ active: index === currentIndex }"></span>
        </div>
    </div>
</template>

<script name="XtxCarousel" setup>
import { onUnmounted, ref, toRefs, watch } from 'vue';

const props = defineProps({
    banners: { type: Array, default: () => [] },
    autoplay: { type: Boolean, default: false },
    interval: { type: Number, default: 2000 }
})
// 控制图片显示
const currentIndex = ref(0)
const { banners } = toRefs(props);

// 自动轮播
let timer = (null);

const autoPlayFn = () => {
    clearInterval(timer);
    timer = setInterval(() => {
        toggle(1)
    }, props.interval)
}
watch(() => props.autoplay, (val) => {
    if (val) {
        autoPlayFn()
    } else {
        clearInterval(timer)
    }
}, { immediate: true });

// 暂停开始定时器
const toggleTimer = (flag) => {
    if (flag) {
        clearInterval(timer);
        timer = null
    } else {
        autoPlayFn()
    }
}
onUnmounted(() => {
    clearInterval(timer);
    timer = null
})

// 切换图片
const toggle = (step) => {
    currentIndex.value += step;
    if (currentIndex.value > banners.value.length - 1) return currentIndex.value = 0
    if (currentIndex.value < 0) currentIndex.value = banners.value.length - 1
    // console.log(currentIndex.value);
}
</script>
<style scoped lang="scss">
.xtx-carousel {
    width: 100%;
    height: 100%;
    min-width: 300px;
    min-height: 150px;
    position: relative;

    .carousel {
        &-body {
            width: 100%;
            height: 100%;
        }

        &-item {
            width: 100%;
            height: 100%;
            position: absolute;
            left: 0;
            top: 0;
            opacity: 0;
            transition: opacity 0.5s linear;

            &.fade {
                opacity: 1;
                z-index: 1;
            }

            img {
                width: 100%;
                height: 100%;
            }
        }

        &-indicator {
            position: absolute;
            left: 0;
            bottom: 20px;
            z-index: 2;
            width: 100%;
            text-align: center;

            span {
                display: inline-block;
                width: 12px;
                height: 12px;
                background: rgba(0, 0, 0, 0.2);
                border-radius: 50%;
                cursor: pointer;

                ~span {
                    margin-left: 12px;
                }

                &.active {
                    background: #fff;
                }
            }
        }

        &-btn {
            width: 44px;
            height: 44px;
            background: rgba(0, 0, 0, .2);
            color: #fff;
            border-radius: 50%;
            position: absolute;
            top: 228px;
            z-index: 2;
            text-align: center;
            line-height: 44px;
            opacity: 0;
            transition: all 0.5s;

            &.prev {
                left: 20px;
            }

            &.next {
                right: 20px;
            }
        }
    }

    &:hover {
        .carousel-btn {
            opacity: 1;
        }
    }
}

// 轮播商品
.slider {
    display: flex;
    justify-content: space-around;
    padding: 0 40px;

    >a {
        width: 240px;
        text-align: center;

        img {
            padding: 20px;
            width: 230px !important;
            height: 230px !important;
        }

        .name {
            font-size: 16px;
            color: #666;
            padding: 0 40px;
        }

        .price {
            font-size: 16px;
            color: $priceColor;
            margin-top: 15px;
        }
    }
}
</style>
