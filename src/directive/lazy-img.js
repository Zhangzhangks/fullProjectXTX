import { useIntersectionObserver } from '@vueuse/core'
import defaulting from '@/assets/images/200.png'
export default {
    install(app) {
        app.directive('lazy', {
            mounted(el, binding) {
                const { stop } = useIntersectionObserver(
                    el, ([{ isIntersecting }], observerElement) => {
                        if (isIntersecting) {

                            // console.log(observerElement, '被观察这');
                            // console.log(binding.value);
                            el.src = binding.value;

                            el.onerror = function () {
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