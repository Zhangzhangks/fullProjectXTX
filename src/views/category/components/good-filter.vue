<template>
    <!-- 筛选区 -->
    <div class="sub-filter" v-if="filterData && !loadding">
        <div class="item">
            <div class="head">品牌：</div>
            <div class="body">

                <a href="javascript:;" :class="{ active: filterData.brands.selectedBrand === item.id }"
                    @click="changeBrand(item.id)" v-for="item in filterData.brands" :key="item.id">
                    {{ item.name }}</a>
            </div>
        </div>
        <div class="item" v-for="item in filterData.saleProperties" :key="item.id">
            <div class="head">{{ item.name }}:</div>
            <div class="body">
                <a href="javascript:;" :class="{ active: item.selectedProp === sub.id }" v-for="sub in item.properties"
                    @click="changeProps(item, sub.id)" :key="sub.id">
                    {{ sub.name }}</a>
            </div>
        </div>

    </div>
    <div class="sub-filter" v-else>
        <XtxSkeleton class="item" width="800px" height="40px" />
        <XtxSkeleton class="item" width="800px" height="40px" />
        <XtxSkeleton class="item" width="600px" height="40px" />
        <XtxSkeleton class="item" width="600px" height="40px" />
        <XtxSkeleton class="item" width="600px" height="40px" />
    </div>
</template>
<script setup>
import { findSubCategoryFilter } from '@/apis/category'
import XtxSkeleton from '@/components/libirary/xtx-skeleton.vue';
import { emitChangeFn } from 'element-plus';
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';
const route = useRoute()
const filterData = ref('')
const loadding = ref(false)

const emit = defineEmits(['filterChange',])
watch(() => route.params.id, (newval) => {
    if (newval && route.path === `/category/sub/${newval}`) {
        loadding.value = true
        findSubCategoryFilter(newval).then(res => {
            res.result.brands.selectedBrand = null
            res.result.brands.unshift({
                id: null,
                name: '全部'
            })
            res.result.saleProperties.forEach(item => {
                item.selectedProp = null
                item.properties.unshift({
                    id: null,
                    name: '全部'
                })
            })
            loadding.value = false
            // console.log(res.result);
            filterData.value = res.result   // 筛选数据
        })
    }
}, { immediate: true })


// 重新拼凑一个对象 参考数据  [{brandId:'',attrs:[{groupName:'颜色'},{proertyName:'蓝色'}]}]
const getFilterName = () => {
    const obj = {
        brandId: '',
        attrs: []
    }
    obj.brandId = filterData.value.brands.selectedBrand;
    filterData.value.saleProperties.forEach(item => {
        if (item.selectedProp) {
            obj.attrs.push({
                groupName: item.name,
                proertyName: item.properties.find(sub => sub.id === item.selectedProp).name
            })
        }
    }
    )

    return obj
}



const changeBrand = (id) => {
    if (filterData.value.brands.selectedBrand === id) return
    filterData.value.brands.selectedBrand = id;
    let filed = getFilterName()
    emit('filterChange', filed)
}
const changeProps = (item, id) => {
    if (item.selectedProp === id) return

    item.selectedProp = id
    let filed = getFilterName()
    emit('filterChange', filed)
}
</script>
<style scoped lang='scss'>
// 筛选区
.sub-filter {
    background: #fff;
    padding: 25px;

    .item {
        display: flex;
        line-height: 40px;

        .head {
            width: 80px;
            color: #999;
        }

        .body {
            flex: 1;

            a {
                margin-right: 36px;
                transition: all .3s;
                display: inline-block;

                &.active,
                &:hover {
                    color: $xtxColor;
                }
            }
        }
    }

    .xtx-skeleton {
        padding: 10px 0;
    }
}
</style>