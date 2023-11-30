import { useIntervalFn } from '@vueuse/core'

import dayjs from 'dayjs'
import { computed, onUnmounted, ref } from 'vue';
export default function useCountdown() {
    const timer = ref('')
    const FormatTime = computed(() => {
        return dayjs.unix(timer.value).format('mm 分:ss 秒')
    })
    const { pause, resume } = useIntervalFn(() => {
        timer.value--;
        if (timer.value <= 0) {
            pause();
            timer.value = 0;
        }
    }, 1000)

    const start = (val) => {
        timer.value = val;
        resume();
    }
    onUnmounted(() => {
        timer.value = '';
        pause()
    })
    return { FormatTime, start }
}
