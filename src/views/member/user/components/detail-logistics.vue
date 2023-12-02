<template>
    <div class="detail-logistics" v-if="logistics.list">
        <p>
            <span>{{ logistics.list[0].time }}</span>
            <span>{{ logistics.list[0].text }}</span>
        </p>
        <a href="javascript:;" @click="looklogistics">查看物流</a>
        <teleport to='#modal'>
            <logisticsComponent ref="confirmlogisticsRef"></logisticsComponent>
        </teleport>
    </div>
</template>
<script setup>
import logisticsComponent from './logistics.vue';
import { logisticsOrder } from '@/apis/order'
import { ref } from 'vue';
const props = defineProps({
    order: {
        type: Object,
        default: () => { }
    }
})
// 获取物流详情
const logistics = ref('')
await logisticsOrder(props.order.id).then(res => {
    console.log(res);
    logistics.value = res.result
})



const confirmlogisticsRef = ref('')
// 查看物流
const looklogistics = () => {
    confirmlogisticsRef.value.open(props.order)
}
</script>
<style scoped lang="scss">
.detail-logistics {
    height: 50px;
    display: flex;
    align-items: center;
    padding: 0 30px;
    background-color: #f5f5f5;
    margin: 30px 50px 0;

    >p {
        flex: 1;

        span {
            color: #999;

            &:first-child {
                margin-right: 30px;
            }
        }
    }

    >a {
        color: $xtxColor;
        text-align: center;
    }
}
</style>
