<template>
    <XtxxDialog title="取消订单" v-model="visibleDialog">
        <!-- 组件内容 -->
        <div class="cancel-info">
            <p>取消订单后，本单享有的优惠可能会一并取消，是否继续？</p>
            <p class="tip">请选择取消订单的原因（必选）：</p>
            <div class="btn">
                <a @click="curText = item" v-for="item in cancelReason" :key="item" href="javascript:;"
                    :class="{ active: curText === item }">
                    {{ item }}
                </a>
            </div>
        </div>
        <!-- 按钮操作 -->
        <template #footer>
            <XtxButton type="gray" @click="visibleDialog = false" style="margin-right:20px">取消</XtxButton>
            <XtxButton type="primary" @click="submit">确认</XtxButton>
        </template>
    </XtxxDialog>
</template>

<script setup>
import { ref } from 'vue'
import message from '@/components/libirary/message.js'
import { cancelReason } from '@/apis/constant.js'
import { cancelOrder } from '@/apis/order.js'
const visibleDialog = ref(false)
const open = (val) => {

    visibleDialog.value = true;
    order.value = val
}
const order = ref('')
const curText = ref('')
const submit = () => {
    // 关闭弹窗
    visibleDialog.value = false;
    cancelOrder(order.value.id, curText.value).then(res => {
        order.value.orderState = 6
        return message({
            type: 'success',
            text: '取消成功'
        })
    })
}
defineExpose({
    open
})
</script>


<style scoped lang="scss">
.xtx-dialog {
    :deep(.wrapper) {
        width: 620px;
    }
}

.cancel-info {
    p {
        font-size: 16px;
        line-height: 35px;

        &.tip {
            color: #999;
        }
    }

    .btn {
        padding-top: 21px;
        display: flex;
        flex-wrap: wrap;

        a {
            width: 256px;
            height: 45px;
            line-height: 45px;
            text-align: center;
            background-color: #ffffff;
            border: 1px solid #e4e4e4;
            margin-right: 20px;
            margin-bottom: 20px;
            color: #666;

            &:nth-child(2n) {
                margin-right: 0;
            }

            &:hover,
            &.active {
                background-color: #e3f9f4;
                border-color: $xtxColor;
            }
        }
    }
}
</style>