<template>
    <div class="xtx-confirm">
        <div class="wrapper" v-if="visible">
            <div class="header">
                <h3>{{ title }}</h3>
                <a href="JavaScript:;" class="iconfont icon-close-new" @click="cancel"></a>
            </div>
            <div class="body">
                <i class="iconfont icon-warning"></i>
                <span>{{ message }}</span>
            </div>
            <div class="footer">
                <XtxButton size="mini" type="gray" @click="cancel">取消</XtxButton>
                <XtxButton size="mini" type="primary" @click="confirm">确认</XtxButton>
            </div>
        </div>
    </div>
</template>
<script setup>
import 'animate.css';
import { onMounted, ref } from 'vue';

const props = defineProps({
    title: {
        type: String,
        default: ''
    },
    message: {
        type: String,
        default: ''
    },
    confirmCallback: {
        type: Function, default: () => { }
    },
    cancelCallback: {
        type: Function, default: () => { }
    }
})
const visible = ref(false);
const cancel = () => {

    props.cancelCallback();
}
const confirm = () => {
    props.confirmCallback();
}
onMounted(() => {
    visible.value = true;

})
</script>
<style scoped lang="scss">
.xtx-confirm {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 8888;
    background: rgba(0, 0, 0, .5);

    .wrapper {
        width: 400px;
        background: #fff;
        border-radius: 4px;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);

        .header,
        .footer {

            height: 50px;
            line-height: 50px;
            padding: 0 20px;
        }

        .body {
            padding: 20px 40px;
            font-size: 16px;

            .icon-warning {
                color: $priceColor;
                margin-right: 3px;
                font-size: 16px;
            }
        }

        .footer {
            display: flex;
            justify-content: flex-end;
            align-items: center;


            .xtx-button {
                margin-left: 20px;
            }
        }

        .header {
            position: relative;

            h3 {
                font-weight: normal;
                font-size: 18px;
            }

            a {
                position: absolute;
                right: 15px;
                top: 15px;
                font-size: 20px;
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