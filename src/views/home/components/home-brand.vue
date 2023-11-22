<template>
    <HomePanel title="热门品牌" sub-title="国际经典 品质保证">
        <template v-slot:right>
            <a href="javascript:;" :class="{ disabled: index === 0 }" class="iconfont icon-angle-left prev"
                @click="index = 0"></a>
            <a href="javascript:;" :class="{ disabled: index === 1 }" class="iconfont icon-angle-right next"
                @click="index = 1"></a>
        </template>
        <div class="box" ref="targetref">
            <Transition name="fade">
                <ul class="list" v-if="brandList.length" :style="[{ transform: `translateX(-${index * 1240}px)` }]">
                    <li v-for="i in brandList" :key="i">
                        <RouterLink to="/">
                            <img v-lazy="i.picture" alt="">
                        </RouterLink>
                    </li>

                </ul>
                <div class="xtxSketelon" v-else>
                    <XtxSkeleton width="240px" height="345px" aniamted v-for="i in 5"></XtxSkeleton>
                </div>
            </Transition>
        </div>

    </HomePanel>
</template>

<script setup>
import HomePanel from './home-pannel.vue'
import { ref, watchEffect } from 'vue'
import { findBrand } from '@/apis/home'
import XtxSkeleton from '@/components/libirary/xtx-skeleton.vue';
import { lazyData } from '@/hooks/lazy-data'
const index = ref(0);
const brandList = ref([])
const targetref = ref('')
const result = lazyData(targetref, () => findBrand(10))
const stop = watchEffect(() => {
    brandList.value = result.value;
    if (brandList.value.length > 0) {
        stop()
    }
})
</script>

<style scoped lang='scss'>
.home-panel {
    background: #f5f5f5
}

.iconfont {
    width: 20px;
    height: 20px;
    background: #ccc;
    color: #fff;
    display: inline-block;
    text-align: center;
    margin-left: 5px;
    background: $xtxColor;

    &::before {
        font-size: 12px;
        position: relative;
        top: -2px
    }

    &.disabled {
        background: #ccc;
        cursor: not-allowed;
    }
}

.box {
    display: flex;
    width: 100%;
    height: 345px;
    overflow: hidden;
    padding-bottom: 40px;

    .list {
        width: 200%;
        display: flex;
        transition: all 1s;

        li {
            margin-right: 10px;
            width: 240px;

            &:nth-child(5n) {
                margin-right: 0;
            }

            img {
                width: 240px;
                height: 305px;
            }
        }
    }
}
</style>