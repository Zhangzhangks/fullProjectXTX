<template>
    <div class='sub-sort'>
        <div class="sort">
            <a href="javascript:;" :class="{ active: sortParams.sortField === null }"
                @click="changeSortParmas(null)">默认排序</a>
            <a href="javascript:;" :class="{ active: sortParams.sortField === 'publishTime' }"
                @click="changeSortParmas('publishTime')">最新商品</a>
            <a href="javascript:;" :class="{ active: sortParams.sortField === 'orderNum' }"
                @click="changeSortParmas('orderNum')">最高人气</a>
            <a href="javascript:;" :class="{ active: sortParams.sortField === 'evaluateNum' }"
                @click="changeSortParmas('evaluateNum')">评论最多</a>
            <a href="javascript:;" @click="changeSortParmas('price')">
                价格排序
                <i class="arrow up"
                    :class="{ active: sortParams.sortField === 'price' && sortParams.sortMethod === 'asc' }" />
                <i class="arrow down"
                    :class="{ active: sortParams.sortField === 'price' && sortParams.sortMethod === 'desc' }" />
            </a>
        </div>
        <div class="check">
            <XtxCheckbox @change="changeCheck" v-model="sortParams.inventory">仅显示有货商品</XtxCheckbox>

            <XtxCheckbox @change="changeCheck" v-model=sortParams.onlyDiscount>仅显示特惠商品</XtxCheckbox>
        </div>
    </div>
</template>
<script setup >

import { ref, reactive } from 'vue'
// 1. 根据后台需要的参数定义数据对象
// 2. 根据数据对象，绑定组件（复选框，排序按钮）
// 3. 在操作排序组件的时候，需要反馈给数据对象
// sortField====>publishTime,orderNum,price,evaluateNum
// sortMethod====>asc为正序 desc为倒序
const sortParams = reactive({
    inventory: false,
    onlyDiscount: false,
    sortField: null,
    sortMethod: null
})
const emit = defineEmits(['changeSortParmas'])
const changeSortParmas = (filed) => {
    if (filed === 'price') {
        sortParams.sortField = filed;
        if (sortParams.sortMethod === null) {
            sortParams.sortMethod = 'desc'
        } else {
            sortParams.sortMethod = sortParams.sortMethod === 'desc' ? 'asc' : 'desc'
        }
    }
    else {
        if (filed === sortParams.sortField) return
        sortParams.sortField = filed;
        sortParams.sortMethod = null
    }
    emit('changeSortParmas', sortParams)
}
const changeCheck = (e) => {

    emit('changeSortParmas', sortParams)
}

</script>
<style scoped lang='scss'>
.sub-sort {
    height: 80px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .sort {
        display: flex;

        a {
            height: 30px;
            line-height: 28px;
            border: 1px solid #e4e4e4;
            padding: 0 20px;
            margin-right: 20px;
            color: #999;
            border-radius: 2px;
            position: relative;
            transition: all .3s;

            &.active {
                background: $xtxColor;
                border-color: $xtxColor;
                color: #fff;
            }

            .arrow {
                position: absolute;
                border: 5px solid transparent;
                right: 8px;

                &.up {
                    top: 3px;
                    border-bottom-color: #bbb;

                    &.active {
                        border-bottom-color: $xtxColor;
                    }
                }

                &.down {
                    top: 15px;
                    border-top-color: #bbb;

                    &.active {
                        border-top-color: $xtxColor;
                    }
                }
            }
        }
    }

    .check {
        .xtx-checkbox {
            margin-left: 20px;
            color: #999;
        }
    }
}
</style>