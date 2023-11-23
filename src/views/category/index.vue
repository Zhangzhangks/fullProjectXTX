<template>
    <div class="top-category">
        <div class="container">
            <!-- 面包屑 -->
            <XtxBread>
                <XtxBreadItem :to="{ path: '/' }">首页</XtxBreadItem>
                <Transition mode="out-in" enter-active-class="animate__animated  animate__backInRight"
                    leave-active-class="animate__animated animate__backOutRight">
                    <XtxBreadItem :key="topCategory.id">{{ topCategory.name }}</XtxBreadItem>
                </Transition>
            </XtxBread>

            <!-- element-plus面包屑 -->
            <!-- <div class="zks">
                <el-breadcrumb :separator-icon="ArrowRight">
                    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                    <el-breadcrumb-item>美食</el-breadcrumb-item>
                </el-breadcrumb>
            </div> -->

            <!-- 轮播图 -->
            <XtxCarousel :banners="sliders" v-if="sliders" style="height:500px" />
            <!-- 所有二级分类 -->
            <div class="sub-list" v-if="topCategory && topCategory.children">
                <h3>全部分类</h3>
                <ul>
                    <li v-for="i in topCategory.children.slice(0, 5)" :key="i.id">
                        <a href="javascript:;">
                            <img :src="i.picture">
                            <p>{{ i.name }}</p>
                        </a>
                    </li>
                </ul>
            </div>
            <!-- 不同分类商品 -->
            <!-- 分类关联商品 -->
            <!-- 分类关联商品 -->
            <template v-if="subList && subList.id">
                <div class="ref-goods" v-for="item in subList.children" :key="item.id">

                    <div class="head">
                        <h3>- {{ item.name }} -</h3>
                        <p class="tag">{{ item.desc }}</p>
                        <XtxMore :path="`/category/sub/${item.id}`" />
                    </div>
                    <div class="body">
                        <goodItems v-for="goods in item.goods" :key="goods.id" :goods="goods" />
                    </div>

                </div>
            </template>

        </div>
    </div>
</template>
<script setup>
import 'animate.css';
import goodItems from './components/goods-item.vue'
import { findBanner } from '@/apis/home'
import { findTopCategory } from '@/apis/category'
import { computed, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useCategoryStore } from '@/store/modules/categoryStore'
import { storeToRefs } from 'pinia';
// 轮播图
const sliders = ref([])
const subList = ref([])
findBanner().then(data => {
    sliders.value = data.result
})
const route = useRoute();
const { list } = storeToRefs(useCategoryStore());

// 顶级类目的获取
const topCategory = computed(() => {
    let cate = {};
    let item = list.value.find(item => item.id === route.params.id);
    if (item) cate = item
    return cate
})
// 监听路由参数的改变重新发起请求
watch(() => route.params.id, (id) => {
    if (id && route.path === `/category/${id}`) {
        findTopCategory(id).then(res => {
            subList.value = res.result;
            // console.log(subList.value, '一级类目的');
        })
    }
}, { immediate: true })


</script>
<style scoped lang="scss">
.top-category {
    h3 {
        font-size: 28px;
        color: #666;
        font-weight: normal;
        text-align: center;
        line-height: 100px;
    }

    .sub-list {
        margin-top: 20px;
        background-color: #fff;

        ul {
            display: flex;
            padding: 0 32px;
            flex-wrap: wrap;

            li {
                width: 168px;
                height: 160px;

                a {
                    text-align: center;
                    display: block;
                    font-size: 16px;

                    img {
                        width: 100px;
                        height: 100px;
                    }

                    p {
                        line-height: 40px;
                    }

                    &:hover {
                        color: $xtxColor;
                    }
                }
            }
        }
    }
}

.ref-goods {
    background-color: #fff;
    margin-top: 20px;
    position: relative;

    .head {
        .xtx-more {
            position: absolute;
            top: 20px;
            right: 20px;
        }

        .tag {
            text-align: center;
            color: #999;
            font-size: 20px;
            position: relative;
            top: -20px;
        }
    }

    .body {
        display: flex;
        justify-content: flex-start;
        flex-wrap: wrap;
        padding: 0 65px 30px;
    }
}
</style>