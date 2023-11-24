<template>
    <div class="goods-sku">
        <dl v-for="item in goods.specs" :key="item.id">
            <dt>{{ item.name }}</dt>
            <dd>
                <template v-for="val in item.values" :key="val.name">
                    <!-- 图片类型规格 -->
                    <img v-if="val.picture" :class="{ selected: val.selected, disabled: val.disabled }"
                        @click="selectChange(item, val)" :src="val.picture" :title="val.name">
                    <!-- 文字类型规格 -->
                    <span :class="{ selected: val.selected, disabled: val.disabled }" @click="selectChange(item, val)"
                        v-else>{{ val.name }}</span>
                </template>
            </dd>
        </dl>
    </div>
</template>
<script setup name='goodSku'>
import { onMounted, reactive, ref, toRefs } from 'vue'
import powerSet from '@/vender/powerSet'

// 商品数据
const splider = '★'
const props = defineProps({
    skuId: { type: String, default: '' },
    goods: { type: Object, default: () => ({}) }
})
const emit = defineEmits(['change'])
const { goods } = toRefs(props)
//1. 点击 商品可以切换选中状态
const selectChange = (item, val) => {
    if (val.disabled) return
    //1. 点击自己 切换状态
    if (val.selected) {
        val.selected = false
    }
    //2. 干掉所有人然后自己选中
    else {
        item.values.forEach(ele => {
            ele.selected = false
        });
        val.selected = true
    }
    // 点击时更新禁用状态
    let pathMap = getSku()
    clickGetSku(goods.value.specs, getSku())


    // 传递给父组件的sku信息
    const selectedArr = getSelect(props.goods.specs).filter(v => v)
    if (selectedArr.length === props.goods.specs.length) {
        const skuIds = pathMap[selectedArr.join(splider)]
        const sku = props.goods.skus.find(sku => sku.id === skuIds[0])
        if (sku) {
            // 传递
            emit('change', {
                skuId: sku.id,
                price: sku.price,
                oldPrice: sku.oldPrice,
                inventory: sku.inventory,
                specsText: sku.specs.reduce((p, n) => `${p} ${n.name}:${n.valueName}`, '').trim() //去除首的空字符串
            })
        }
    }
    else {
        emit('change', {})
    }
}
/**
1.获取当前选中的值的数组
[黑色', undefined, undefined]
2.遍历按钮
先遍历的是每一种规格， 取出当前选中的值数组。
    再遍历的是每一一个按钮，
    2.1已经选中，忽略判断禁用状态
2.2如果未选，拿着按钮的值按顺序套入，得到套入后的数组，过滤
没有值的选项，加入入★进行拼接成key, 去路径字典中查找，没有
查到禁用。
 */
//   点击生成数组
const getSelect = (specs) => {
    let arr = []
    specs.forEach(item => {
        let temp = item.values.find(val => val.selected)
        arr.push(temp ? temp.name : undefined)
    })
    return arr
}

// 点击时更新禁用状态
const clickGetSku = (specs, powerobj) => {
    specs.forEach((val, i) => {
        let selectarr = getSelect(specs)
        val.values.forEach((item) => {
            // // 已经选中的按钮不用判断
            if (item.selected) return
            // // 未选中的替换对应的值
            selectarr[i] = item.name;

            // // 过滤无效值得到key
            const key = selectarr.filter(item => item !== undefined).join(splider);
            // 设置禁用状态
            if (powerobj[key]) {
                item.disabled = false
            } else {
                item.disabled = true
            }
        })
    })
}

// sku的生成
const getSku = () => {
    const powerobj = {}
    //1.根据库存生成有效的sku
    const effectiveSku = goods.value.skus.filter(item => item.inventory > 0)
    effectiveSku.forEach(item => {
        const skuMap = item.specs.map(item => item.valueName);
        // console.log(skuMap);
        let skuArr = powerSet(skuMap);//根据幂算法生成多少种可能
        // console.log(skuArr);
        // ['黑色']
        // ['20cm']
        // (2)['黑色', '20cm']
        // ['中国']
        // (2)['黑色', '中国']
        // (2)['20cm', '中国']
        // (3)['黑色', '20cm', '中国']
        // 遍历
        skuArr.forEach(ele => {
            let key = ele.join(splider);
            //3.生成key然后添加到路径字典
            // console.log(zks);
            if (powerobj[key]) {
                powerobj[key].push(item.id)
            } else {
                powerobj[key] = [item.id]
            }
        })
    })
    return powerobj
}

// 初始化更新禁用状态
const updateDisabled = (specs, powerobj) => {
    specs.forEach(val => {
        val.values.forEach(item => {
            if (powerobj[item.name]) {
                item.disabled = false
            } else {
                item.disabled = true
            }
        })
    })
}
updateDisabled(goods.value.specs, getSku())


// 默认选中
if (props.skuId) {
    const initDefaultSelect = () => {
        let sku = goods.value.skus.find(item => item.id === props.skuId);
        goods.value.specs.forEach((item, i) => {
            item.values.forEach((val) => val.selected = val.name === sku.specs[i].valueName)
        })
    }
    initDefaultSelect();
}



</script>


<style scoped lang="scss">
@mixin sku-state-mixin () {
    border: 1px solid #e4e4e4;
    margin-right: 10px;
    cursor: pointer;

    &.selected {
        border-color: $xtxColor;
    }

    &.disabled {
        opacity: 0.6;
        border-style: dashed;
        cursor: not-allowed;
    }
}

.goods-sku {
    padding-left: 10px;
    padding-top: 20px;

    dl {
        display: flex;
        padding-bottom: 20px;
        align-items: center;

        dt {
            width: 50px;
            color: #999;
        }

        dd {
            flex: 1;
            color: #666;

            >img {
                width: 50px;
                height: 50px;
                @include sku-state-mixin ();
            }

            >span {
                display: inline-block;
                height: 30px;
                line-height: 28px;
                padding: 0 20px;
                @include sku-state-mixin ();
            }
        }
    }
}
</style>
