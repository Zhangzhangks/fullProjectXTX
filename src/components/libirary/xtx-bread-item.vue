<template>
    <div class="xtx-bread-item">
        <RouterLink v-if="to" :to="to">
            <slot />
        </RouterLink>
        <span v-else>
            <slot />
        </span>
    </div>
</template>
<script setup >
import { ref, reactive } from 'vue'
const props = defineProps({
    to: {
        type: [String, Object],
        default: ''
    }
})
</script>


<style lang='less' scoped></style>