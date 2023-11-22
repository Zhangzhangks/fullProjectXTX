<template>
    <div class="home-new">
        <homePannel title="新鲜好物" sub-title="新鲜出炉 品质靠谱">
            <template #right>
                <XtxMore path="/" />
            </template>
            <template #default>
                <div ref="target" style="position: relative;height: 426px;">
                    <Transition name="fade">
                        <!-- 面板内容 -->
                        <ul class="goods-list" v-if="goods.length">
                            <li v-for="item in goods" :key="item.id">
                                <RouterLink :to="`/product/${item.id}`">
                                    <img v-lazy="item.picture" alt="">
                                    <p class="name ellipsis">{{ item.name }}</p>
                                    <p class="price">&yen;{{ item.price }}</p>
                                </RouterLink>
                            </li>

                        </ul>
                        <homeSkeleton bg="#f0f9f4" v-else />
                    </Transition>
                </div>
            </template>
        </homePannel>

    </div>
</template>
<script setup>
import { ref } from 'vue'
import homePannel from './home-pannel.vue'
import { findNew } from '@/apis/home'
import homeSkeleton from './home-skeleton.vue';
import { lazyData } from '@/hooks/lazy-data'
const goods = ref([])
const target = ref('')

const result = lazyData(target, findNew)
goods.value = result.value
</script>
<style scoped lang="scss">
.goods-list {
    display: flex;
    justify-content: space-between;
    height: 406px;

    li {
        width: 306px;
        height: 406px;
        background: #f0f9f4;
        @include hoverShadow();

        img {
            width: 306px;
            height: 306px;
        }

        p {
            font-size: 22px;
            padding: 12px 30px 0 30px;
            text-align: center;
        }

        .price {
            color: $priceColor;
        }
    }
}
</style>