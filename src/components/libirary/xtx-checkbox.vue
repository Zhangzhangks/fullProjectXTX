<template>
    <div class="xtx-checkbox" @click="changeChecked">
        <i v-if="checked" class="iconfont icon-checked"></i>
        <i v-else class="iconfont icon-unchecked"></i>
        <span v-if="$slots.default">
            <slot />
        </span>
    </div>
</template>
<script setup>
import { watch, ref } from 'vue';
import { useVModel } from '@vueuse/core'

// vue/core写法
// const props = defineProps({
//     modelValue: { type: Boolean, default: false }
// })
// const emit = defineEmits(['update:modelValue'])
// // 使用useVModel实现双向数据绑定v-model指令
// // 1. 使用props接收modelValue
// // 2. 使用useVModel来包装props中的modelValue属性数据
// // 3. 在使用checked.value就是使用父组件数据
// // 4. 在使用checked.value = '数据' 赋值，触发emit('update:modelvalue', '数据')
// const checked = useVModel(props, 'modelValue', emit)//又接值又传值
// const changeChecked = () => {
//     emit('change', checked.value)
//     const temp = !checked.value;

//     checked.value = temp  //拿取最新的值


// }


const props = defineProps({
    modelValue: {
        type: Boolean,
        default: false
    }
})
const checked = ref(false)
const emit = defineEmits(['update:modelValue', 'change']);

const changeChecked = () => {
    checked.value = !checked.value;
    emit('update:modelValue', checked.value);
    emit('change', checked.value)
}


</script>
<style scoped lang="scss">
.xtx-checkbox {
    display: inline-block;
    margin-right: 2px;

    .icon-checked {
        color: $xtxColor;

        ~span {
            color: $xtxColor;
        }
    }

    i {
        position: relative;
        top: 1px;
    }

    span {
        margin-left: 2px;
    }
}
</style>