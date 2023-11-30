<template>
    <div class="checkout-address">
        <div class="text">
            <div class="text">
                <div v-if="!defaultAddress" class="none">您需要先添加收货地址才可提交订单。</div>
                <ul v-if="defaultAddress">
                    <li><span>收<i />货<i />人：</span>{{ defaultAddress.receiver }}</li>
                    <li><span>联系方式：</span>{{ Format(defaultAddress.contact) }}</li>
                    <li><span>收货地址：</span>{{ defaultAddress?.fullLocation.replace(/ /g, '') + defaultAddress.address }}</li>
                </ul>
                <a v-if="defaultAddress" href="javascript:;" @click="addAddress(defaultAddress)">修改地址</a>
            </div>
        </div>
        <div class="action">
            <XtxButton class="btn" @click="dialogVisible = true, selectedVal = null">切换地址</XtxButton>
            <XtxButton class="btn" @click="addAddress({})">添加地址</XtxButton>
        </div>
    </div>
    <addressEdit ref="addressEditRef" @on-success="onsuccessFnf"></addressEdit>

    <XtxxDialog title="切换地址" v-model="dialogVisible">
        <template #default>
            <div class="text item" v-for="item in list" :key="item.id" :class="{ active: selectedVal?.id === item.id }"
                @click="selectedVal = item">
                <ul>
                    <li><span>收<i />货<i />人：</span>{{ item.receiver }}</li>
                    <li><span>联系方式：</span>{{ item.contact }}</li>
                    <li><span>收货地址：</span>{{ item.fullLocation.replace(/ /g, '') + item.address }}</li>
                </ul>
            </div>
        </template>
        <template #footer>
            <XtxButton type="gray" style="margin-right:20px" @click="dialogVisible = false">取消</XtxButton>
            <XtxButton type="primary" @click="enter"> 确认</XtxButton>
        </template>
    </XtxxDialog>
</template>

<script setup>
import addressEdit from './address-edit.vue'
import { computed, ref } from "vue";
const props = defineProps({
    Address: {
        type: Array,
        default: () => [],
    },
});

const defaultAddress = ref(null);
const list = ref([])
list.value = props.Address;

const defaultss = props.Address.find((addr) => addr.isDefault === 0);
// 是否有默认地址
if (defaultss?.id) {
    defaultAddress.value = defaultss;

} else {
    defaultAddress.value = props.Address[0];
}

const Format = (str) => {
    return str.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2')
};
const emit = defineEmits(['change'])
const dialogVisible = ref(false);
// 默认地址ID传递
emit('change', defaultAddress.value && defaultAddress.value.id)

// 切换地址id传递
const selectedVal = ref(null)
const enter = () => {
    dialogVisible.value = false;
    if (!selectedVal.value) return
    defaultAddress.value = selectedVal.value
    emit('change', selectedVal.value.id)
}
const addressEditRef = ref(null)
const addAddress = (data) => {
    addressEditRef.value.open(data)
}

const onsuccessFnf = (fordata) => {
    // console.log(fordata);
    const index = props.Address.findIndex((addr) => addr.id === fordata.id);
    if (index > -1) {
        props.Address[index] = { ...fordata }
    } else {
        props.Address.unshift({ ...fordata });
    }
}
</script>

<style scoped lang="scss">
.xtx-dialog {
    .text {
        flex: 1;
        min-height: 90px;
        display: flex;
        align-items: center;

        &.item {
            border: 1px solid #f5f5f5;
            margin-bottom: 10px;
            cursor: pointer;

            &.active,
            &:hover {
                border-color: $xtxColor;
                background: lighten($xtxColor, 50%);
            }

            >ul {
                padding: 10px;
                font-size: 14px;
                line-height: 30px;
            }
        }
    }
}

.checkout-address {
    border: 1px solid #f5f5f5;
    display: flex;
    align-items: center;

    .text {
        flex: 1;
        min-height: 90px;
        display: flex;
        align-items: center;



        .none {
            line-height: 90px;
            color: #999;
            text-align: center;
            width: 100%;
        }

        >ul {
            flex: 1;
            padding: 20px;

            li {
                line-height: 30px;

                span {
                    color: #999;
                    margin-right: 5px;

                    >i {
                        width: 0.5em;
                        display: inline-block;
                    }
                }
            }
        }

        >a {
            color: $xtxColor;
            width: 160px;
            text-align: center;
            height: 90px;
            line-height: 90px;
            border-right: 1px solid #f5f5f5;
        }
    }

    .action {
        width: 420px;
        text-align: center;
        display: flex;
        justify-content: start;

        .btn {
            width: 140px;
            height: 46px;
            line-height: 44px;
            font-size: 14px;

            &:first-child {
                margin-right: 10px;
            }
        }
    }
}
</style>
