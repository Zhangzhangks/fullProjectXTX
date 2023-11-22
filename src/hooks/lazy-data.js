// 数据的懒加载

import { useIntersectionObserver } from '@vueuse/core'
import { ref } from 'vue'
export const lazyData = (target, apiFn) => {
    const data = ref([])
    const { stop } = useIntersectionObserver(
        target,
        ([{ isIntersecting }]) => {
            if (isIntersecting) {
                stop()
                apiFn().then(res => {
                    data.value = res.result
                })
            }
        }
    )

    return data
}

