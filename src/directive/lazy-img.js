import { useIntersectionObserver } from '@vueuse/core'
import defaulting from '@/assets/images/200.png'
export default {
    install(app) {
        app.directive('lazy', {
            mounted(el, binding) {
                const { stop } = useIntersectionObserver(
                    el, ([{ isIntersecting }]) => {
                        if (isIntersecting) {
                            if (binding.value) {
                                el.src = binding.value;
                            } else {
                                el.src = defaulting
                            }
                            stop()
                        }
                    },
                )

            },
        })
    }
}