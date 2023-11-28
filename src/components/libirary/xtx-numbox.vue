<template>
    <div class="xtx-numbox">
        <div class="label">
            {{ label }}
        </div>
        <div class="numbox">
            <a href="javascript:;" @click="changeNum(-1)">-</a>
            <input type="text" readonly :value="modelValue">
            <a href="javascript:;" @click="changeNum(1)">+</a>
        </div>
    </div>
</template>
<script setup>
import { watch } from 'vue';

const props = defineProps({
    label: {
        type: String
    },
    modelValue: {
        type: Number,
        default: 1
    },
    min: {
        type: Number,
        default: 1
    },
    max: {
        type: Number,
        default: 100
    }
})
const emit = defineEmits(['update:modelValue', 'change'])

const changeNum = (step) => {

    const newval = props.modelValue + step


    if (newval < props.min) return
    if (newval > props.max) return
    emit('update:modelValue', newval)

    emit('change', newval)
}

</script>
<style scoped lang="scss">
.xtx-numbox {
    display: flex;
    align-items: center;

    .label {
        width: 60px;
        color: #999;
        padding-left: 10px;
    }

    .numbox {
        width: 120px;
        height: 30px;
        border: 1px solid #e4e4e4;
        display: flex;

        >a {
            width: 29px;
            line-height: 28px;
            text-align: center;
            background: #f8f8f8;
            font-size: 16px;
            color: #666;

            &:first-of-type {
                border-right: 1px solid #e4e4e4;
            }

            &:last-of-type {
                border-left: 1px solid #e4e4e4;
            }
        }

        >input {
            width: 60px;
            padding: 0 5px;
            text-align: center;
            color: #666;
        }
    }
}
</style>