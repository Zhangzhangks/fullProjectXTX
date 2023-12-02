<template>
    <div class="xtx-pagination">

        <a href="javascript:;" :class="{ disabled: currentPage <= 1 }" @click="changePage(-1)">上一页</a>
        <span v-if="pagerFn.start > 1">...</span>

        <a href="javascript:;" :class="{ active: currentPage === item }" @click="clickPage(item)"
            v-for="item in pagerFn.btnArr" :key="item">{{ item }}</a>

        <span v-if="pagerFn.end < page">...</span>
        <a href="javascript:;" :class="{ disabled: currentPage >= page }" @click="changePage(1)">下一页</a>

    </div>
</template>
<script setup>
import { ref, reactive, computed, toRefs, watch } from "vue";

const emit = defineEmits(['changePage'])
const props = defineProps({
    total: {
        type: Number,
        default: 100,
    },
    currentPage: {
        type: Number,
        default: 1,
    },
    pageSize: {
        type: Number,
        default: 10,
    },
    count: { typeof: Number, default: 5 },
});
const total = ref('');

const currentPage = ref('');
const pageSize = ref('');
let count = null;

watch(props, () => {

    total.value = props.total;
    currentPage.value = props.currentPage;
    pageSize.value = props.pageSize;
    count = props.count;
}, { immediate: true });


// 多少页
const page = Math.ceil(total.value / pageSize.value);

const pagerFn = computed(() => {
    // 按钮数组
    const btnArr = [];
    //1. 理想情况下 3 4 [5] 6 7
    let offset = Math.floor(count / 2);
    let start = currentPage.value - offset;

    let end = start + count - 1;
    //2. 起始页为 [1]2,3,4,5
    if (start < 1) {
        start = 1;
        end = count + start - 1 > page ? page : count + start - 1;
    }
    //3. 末尾页为6 7 8 9 [10]
    if (end > page) {
        end = page;
        // 避免这种情况   3
        start = end - count + 1 < 0 ? 1 : end - count + 1;
    }
    for (let i = start; i <= end; i++) {
        btnArr.push(i);
    }
    return { start, end, btnArr };
})

const changePage = (step) => {
    currentPage.value += step;
    if (currentPage.value < 1) currentPage.value = 1;
    else if (currentPage.value > page) currentPage.value = page;
    emit('changePage', currentPage.value)
};
const clickPage = (item) => {
    currentPage.value = item
    emit('changePage', currentPage.value)
}

</script>
<style scoped lang="scss">
.xtx-pagination {
    display: flex;
    justify-content: center;
    padding: 30px;

    >a {
        display: inline-block;
        padding: 5px 10px;
        border: 1px solid #e4e4e4;
        border-radius: 4px;
        margin-right: 10px;

        &:hover {
            color: $xtxColor;
        }

        &.active {
            background: $xtxColor;
            color: #fff;
            border-color: $xtxColor;
        }

        &.disabled {
            cursor: not-allowed;
            opacity: 0.4;

            &:hover {
                color: #333;
            }
        }
    }

    >span {
        margin-right: 10px;
    }
}
</style>
