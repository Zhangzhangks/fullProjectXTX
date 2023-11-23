<template>
    <div class="container">
        <div class="home-entry">
            <!-- 左侧分类 -->
            <homeCategory />
            <!-- 轮播图 -->
            <homeBanners />
        </div>
    </div>
    <!-- 新鲜好物 -->
    <homeNew></homeNew>
    <!-- 人气推荐 -->
    <homeHot></homeHot>
    <!-- 热门品牌 -->
    <homeBrand></homeBrand>
    <!-- 商品区块 -->
    <homeProduct></homeProduct>
    <!-- <最新专题 -->
    <homeSpecial>

    </homeSpecial>
</template>
<script setup >

import homeCategory from './components/home-category.vue';
import homeBanners from './components/home-banners.vue';
import homeNew from './components/home-new.vue';
import homeHot from './components/home-hot.vue';
import homeBrand from './components/home-brand.vue'
import homeProduct from './components/home-product.vue';
import homeSpecial from './components/home-special.vue'
</script>


<style lang='scss' scoped></style>
