<template>
    <div class="sub-category">
        <div class="container">
            <!-- 面包屑 -->
            <subBread />
            <!-- 筛选区 -->
            <goodFilter></goodFilter>
            <div class="goods-list">
                <!-- 排序 -->
                <subSort @changeSortParmas="changeSortParmas"></subSort>
                <!-- <ul v-infinite-scroll="getData" infinite-scroll-distance="-100px" :infinite-scroll-disabled="finished">
                    <li v-for="i in goodslist" :key="i.id">
                        <goodsItem :goods="i" />
                    </li>
                </ul> -->

                <!-- <div class="xtx-infinite-loading" ref="target">
                    <div class="loading" v-if="loading">
                        <span class="img"></span>
                        <span class="text">正在加载...</span>
                    </div>
                    <div class="none" v-if="finished">
                        <span class="img"></span>
                        <span class="text">亲，没有更多了</span>
                    </div>
                </div> -->
                <!-- 商品组件 -->
                <ul>
                    <li v-for="i in goodslist" :key="i.id">
                        <goodsItem :goods="i" />
                    </li>
                </ul>
                <XtxInfiniteLoading :loading="loading" :finished="finished" @infinite="getData" />
            </div>
        </div>
    </div>
</template>


<script setup >
import subBread from './components/sub-bread.vue';
import goodFilter from './components/good-filter.vue';
import { findSubCategoryGoods } from '@/apis/category'
import goodsItem from './components/goods-item.vue';
import subSort from './components/sub-sort.vue';
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';

const loading = ref(false);
const finished = ref(false);
const route = useRoute()
const goodslist = ref([]);
let reqParams = {
    page: 1,
    pageSize: 20,

}
const getData = async () => {
    loading.value = true;
    reqParams.categoryId = route.params.id
    let res = await findSubCategoryGoods(reqParams);
    console.log(222);
    if (res.result.items) {
        goodslist.value = [...goodslist.value, ...res.result.items];
    } else {
        // 加载完成 已加载全部数据
        console.log('22sss2');
        loading.value = false;
        return finished.value = true;
    }
    reqParams.page++;
    loading.value = false;
};

watch(() => route.params.id, (newval) => {
    if (newval && `/category/sub/${newval}` === route.path) {
        reqParams.page = 1;
        finished.value = false;
        goodslist.value = [];
    }
}, { immediate: true })

// 更改排序组件发请求
// 更改筛选条件发请求
const changeSortParmas = (field) => {
    console.log(3333);
    reqParams = { ...reqParams, ...field }
    reqParams.page = 1;
    finished.value = false;
    goodslist.value = [];
}
</script>

<style lang='scss' scoped>
.goods-list {
    background: #fff;
    padding: 0 25px;
    margin-top: 25px;

    ul {
        display: flex;
        flex-wrap: wrap;
        padding: 0 5px;

        li {
            margin-right: 20px;
            margin-bottom: 20px;

            &:nth-child(5n) {
                margin-right: 0;
            }
        }
    }
}

.xtx-infinite-loading {
    .loading {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 200px;

        .img {
            width: 50px;
            height: 50px;
            background: url(@/assets/images/load.gif) no-repeat center / contain;
        }

        .text {
            color: #999;
            font-size: 16px;
        }
    }

    .none {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 200px;

        .img {
            width: 200px;
            height: 134px;
            background: url(@/assets/images/none.png) no-repeat center / contain;
        }

        .text {
            color: #999;
            font-size: 16px;
        }
    }
}
</style>