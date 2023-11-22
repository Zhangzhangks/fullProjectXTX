<template>
    <div class="home-banner">
        <XtxCarousel :banners="bannerList" autoplay :interval="2000"> </XtxCarousel>
        <!-- <el-carousel height="500px" loop :autoplay="true" :interval="2000" trigger="click">
            <el-carousel-item v-for="item in bannerList" :key="item.id">
                <router-link :to="item.hrefUrl">
                    <img :src="item.imgUrl" alt="">
                </router-link>
            </el-carousel-item>
        </el-carousel> -->
    </div>
</template>
<script setup >
import { findBanner } from '@/apis/home'
import { ref } from 'vue'
const bannerList = ref([])
findBanner().then(res => {
    console.log(res.result, '轮播图');
    bannerList.value = res.result
})

</script>


<style lang='scss' scoped>
// 滚动窗口底部的指示器

:deep(.el-carousel__indicator--horizontal .el-carousel__button) {
    width: 12px;
    height: 12px;
    background: #f2f2f2;
    border: 1px solid #ffffff;
    border-radius: 50%;
    opacity: 0.8;
    border: none !important;
}

// 活跃指示器
:deep(.el-carousel__indicator--horizontal.is-active .el-carousel__button) {
    width: 30px;
    height: 10px;
    background: #f59a23;
    // background: #ffffff;
    border-radius: 40px;
    border: none !important;
    opacity: 1;
}

// 指示器位置
:deep(.el-carousel__indicators--horizontal) {
    position: relative;
    bottom: 32px;
    left: 100%;
}

.home-banner {
    width: 1240px;
    height: 500px;
    position: absolute;
    left: 0;
    top: 0;
    z-index: 98
}

.xtx-carousel {
    :deep(.carousel-btn.prev) {
        left: 270px;
    }

    :deep(.carousel-indicator) {
        padding-left: 250px;
    }
}
</style>