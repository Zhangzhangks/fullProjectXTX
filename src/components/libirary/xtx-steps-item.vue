<template>
    <!-- 装载是内容 -->
    <div class="xtx-steps-item ">
        <slot />
    </div>
</template>
<script>
export default {
    name: 'XtxStepsItem',
    props: {
        title: {
            type: String,
            default: ''
        },
        desc: {
            type: String,
            default: ''
        }
    }
}
</script>