import { defineStore } from "pinia";
import { computed, reactive, ref, toRefs } from "vue";
import { useUserStore } from "@/store/modules/userStore";
import { getNewCartGoods } from '@/apis/cart'
import message from "@/components/libirary/message";
import confirm from '@/components/libirary/confirm';
export const useCartStore = defineStore(
    "cart",
    () => {
        // 本地：id skuId name picture price nowPrice count attrsText selected stock isEffective
        const UserStore = useUserStore();
        // 购物车状态
        const list = ref({});
        const sameGoodsInsert = (playload) => {
            // console.log(playload);
            //    是否登陆
            return new Promise((resolve, reject) => {
                if (UserStore.profile.token) {
                    //  登陆
                } else {
                    // 未登录
                    // 如果有相同的商品
                    const index = list.value.findIndex(
                        (item) => item.skuId === playload.skuId
                    );

                    if (index > -1) {
                        // 拿取数量
                        const count = list.value[index].count;
                        playload.count += count;
                        // 删除原来的
                        list.value.splice(index, 1);
                    }
                    list.value.unshift(playload);
                    resolve();
                }
            });
        };


        // 实时更新数据库内每个商品的信息
        const updateCart = (goods) => {
            // goods中字段有可能不完整，goods有的信息才去修改。
            // 1. goods中必需又skuId，才能找到对应的商品信息
            const updateGoods = list.value.find(item => item.skuId === goods.skuId)
            for (const key in goods) {
                if (goods[key] !== null && goods[key] !== undefined && goods[key] !== '') {
                    updateGoods[key] = goods[key]
                }
            }
        }
        // 进入组件后需要实时获取商品信息，例如是否过期，库存数量，商品价格等等
        const findCart = () => {
            return new Promise((resolve, reject) => {
                if (UserStore.profile.token) {
                } else {
                    const maplist = list.value.map(item => {
                        return getNewCartGoods(item.skuId)
                    })
                    Promise.all(maplist).then(res => {
                        // console.log(res);
                        // 注意:i索引与maplist的索引数据是一致的
                        res.forEach((item, i) => {
                            updateCart({ skuId: list.value[i].skuId, ...item.result })
                        });
                        resolve()
                        message({
                            type: 'success',
                            text: '更新购物车成功',
                            showClose: true,
                            duration: 1000
                        })
                    })
                }
            });
        }


        // 有效商品列表
        const effectCount = computed(() => {
            return list.value.filter(item => item.isEffective && item.stock > 0)
        })
        // 失效商品列表
        const UneffectCount = computed(() => {
            return list.value.filter(item => !item.isEffective || item.stock < 0)
        })
        // 有效商品总件数
        const validTotal = computed(() => {
            return effectCount.value.reduce((total, item) => {
                return total + item.count
            }, 0)
        })
        // 有效商品总金额
        const validTotalPrice = computed(() => {
            return effectCount.value.reduce((total, item) => {
                return (total + (item.nowPrice * 100) * item.count) / 100
            }, 0)
        })

        // 已选商品件数
        const selectedTotal = computed(() => {
            return effectCount.value.filter(item => item.selected).reduce((total, item) => {
                return total + item.count
            }, 0)
        })
        // 已选商品金额
        const selectedPrice = computed(() => {
            return effectCount.value.filter(item => item.selected).reduce((total, item) => {
                return total + item.count * item.price
            }, 0)
        })
        // 是否全选
        const isCheckAll = computed(() => {
            return effectCount.value.every(item => item.selected)
        })
        // 根据全选来改变选中
        const changeCheckAll = (val) => {
            return new Promise((resolve, reject) => {
                // 已登录
                if (UserStore.profile.token) {

                } else {
                    isCheckAll.value = val
                    effectCount.value.forEach(item => {
                        item.selected = val
                    })
                    resolve()
                }
            })

        }
        // 根据单选来改变全选 改变数量
        const sigleCheck = (playload) => {
            return new Promise((resolve, reject) => {
                // 已登录
                if (UserStore.profile.token) {

                } else {
                    updateCart(playload)
                }
                resolve()
            })
        }

        // 删除购物车
        const deleteCart = (skuId) => {
            confirm({ title: "温馨提示", message: "是否删除商品" }).then(() => {
                new Promise((resolve, reject) => {
                    if (UserStore.profile.token) {

                    } else {
                        const index = list.value.findIndex(item => item.skuId === skuId)
                        list.value.splice(index, 1)
                        resolve()
                    }
                })
                return message({
                    text: '删除成功',
                    type: 'success',
                })
            }).catch(e => {
                message({
                    text: '点击取消',
                    type: 'info',
                })
            })

        }
        const mutipleDel = (skuId) => {
            return new Promise((resolve, reject) => {
                // 已登录
                if (UserStore.profile.token) {

                } else {
                    const index = list.value.findIndex(item => item.skuId === skuId)
                    list.value.splice(index, 1)
                    resolve()
                }

            })
        }


        return { list, mutipleDel, deleteCart, changeCheckAll, sigleCheck, selectedPrice, isCheckAll, sameGoodsInsert, selectedTotal, UneffectCount, effectCount, findCart, effectCount, validTotalPrice, validTotal };
    },
    { persist: true }
);
