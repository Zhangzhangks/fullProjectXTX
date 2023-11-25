<template>
    <div class="goods-hot">
        <h3>{{ title }}</h3>
        <goodsItem v-for="item in goodsList" :key="item" :goods="item" />
    </div>
</template>
<script setup >
import { ref, reactive, computed } from 'vue'
import { findHotGoods } from '@/apis/product'
import goodsItem from '@/views/category/components/goods-item.vue';
import { useRoute } from 'vue-router';
const props = defineProps({
    type: {
        type: Number,
        default: 1
    }
})
const titleObj = { 1: '24小时热销榜', 2: '周热销榜', 3: '总热销榜' }
const title = computed(() => {
    return titleObj[props.type]
})
const goodsList = ref([])
const route = useRoute()
findHotGoods({ id: route.params.id, type: props.type }).then(res => {
    goodsList.value = res.result
})
</script>


<style lang='scss' scoped>
.goods-hot {
    h3 {
        height: 70px;
        background: $helpColor;
        color: #fff;
        font-size: 18px;
        line-height: 70px;
        padding-left: 25px;
        margin-bottom: 10px;
        font-weight: normal;
    }

    :deep(.goods-item) {
        background: #fff;
        width: 100%;
        margin-bottom: 10px;

        img {
            width: 200px;
            height: 200px;
        }

        p {
            margin: 0 10px;
        }

        &:hover {
            transform: none;
            box-shadow: none;
        }
    }
}
</style>