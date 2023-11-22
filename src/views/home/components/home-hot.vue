<template>
    <HomePanel title="人气推荐" sub-title="人气爆款 不容错过">
        <template #default>
            <div class="hot" ref="hotref">
                <Transition name="fade">
                    <ul class=" goods-list" v-if="goods.length">
                        <li v-for="item in goods" :key="item.id">
                            <RouterLink to="/">
                                <img :src="item.picture" alt="">
                                <p class="name">{{ item.title }}</p>
                                <p class="desc">{{ item.alt }}</p>
                            </RouterLink>
                        </li>
                    </ul>
                    <homeSkeleton v-else />
                </Transition>
            </div>
        </template>
    </HomePanel>
</template>

<script setup>
import { ref, watchEffect } from 'vue'
import HomePanel from './home-pannel.vue'
import { findHot } from '@/apis/home'
import homeSkeleton from './home-skeleton.vue';
import { lazyData } from '@/hooks/lazy-data'
const goods = ref([])
const hotref = ref(null)
const result = lazyData(hotref, findHot)

let zks = ref(0)
setInterval(() => {
    zks.value += 1
}, 100)
const stop = watchEffect(() => {
    goods.value = result.value;
    if (goods.value.length > 0) {
        // 当不再需要此侦听器时:
        stop()
    }
})

</script>

<style scoped lang='scss'>
.goods-list {
    display: flex;
    justify-content: space-between;
    height: 426px;

    li {
        width: 306px;
        height: 406px;
        @include hoverShadow();

        img {
            width: 306px;
            height: 306px;
        }

        p {
            font-size: 22px;
            padding-top: 12px;
            text-align: center;
        }

        .desc {
            color: #999;
            font-size: 18px;
        }
    }
}
</style>