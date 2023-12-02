<template>
    <div class="xtx-dialog" :class="{ fade: modelValue }" ref="target" v-show="modelValue">
        <div class="wrapper" :class="{ fade: modelValue }">
            <div class="header">
                <h3>{{ title }}</h3>
                <a href="JavaScript:;" @click="close" class="iconfont icon-close-new"></a>
            </div>
            <div class="body">
                <slot></slot>
            </div>
            <div class="footer">
                <slot name="footer"></slot>
            </div>
        </div>

    </div>
</template>
<script setup>
import { onClickOutside } from '@vueuse/core';
import { ref, onMounted } from 'vue'
const props = defineProps({
    title: {
        type: String,
        default: ''
    },
    modelValue: {
        typeof: Boolean,
        default: false
    }

})
const emit = defineEmits(['update:modelValue'])
const target = ref('')


//1.打开
const open = () => {
    emit('update:modelValue', true)
}
// 关闭
const close = () => {
    emit('update:modelValue', false)
}
// 切换
const toggle = () => {
    props.modelValue ? close() : open()
}
// 电机外部
onClickOutside(target, () => { close() })

</script>
<style scoped lang="scss">
.xtx-dialog {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 8887;
    background: rgba(0, 0, 0, 0);

    &.fade {
        transition: all 0.4s;
        background: rgba(0, 0, 0, .5);
    }

    .wrapper {
        width: 600px;
        background: #fff;
        border-radius: 4px;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -60%);
        opacity: 0;

        &.fade {
            transition: all 0.4s;
            transform: translate(-50%, -50%);
            opacity: 1;
        }

        .body {
            padding: 20px 40px;
            font-size: 16px;
            max-height: calc(100vh - 300px);
            overflow: auto;

            .icon-warning {
                color: $priceColor;
                margin-right: 3px;
                font-size: 16px;
            }
        }

        .footer {
            text-align: center;
            padding: 10px 0 30px 0;
            display: flex;
            justify-content: center;
        }

        .header {
            position: relative;
            height: 70px;
            line-height: 70px;
            padding: 0 20px;
            border-bottom: 1px solid #f5f5f5;

            h3 {
                font-weight: normal;
                font-size: 18px;
            }

            a {
                position: absolute;
                right: 25px;
                top: 25px;
                font-size: 24px;
                width: 20px;
                height: 20px;
                line-height: 20px;
                text-align: center;
                color: #999;

                &:hover {
                    color: #666;
                }
            }
        }
    }
}
</style>