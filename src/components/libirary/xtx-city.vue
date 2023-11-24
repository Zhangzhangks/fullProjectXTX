<template>
    <div class="xtx-city" ref="target">
        <div class="select" @click="toggle" :class="{ active: show }">
            <span class="placeholder" v-if="props.fullLocation === ''">请选择配送地址</span>
            <span class="value" v-else>{{ props.fullLocation }}</span>
            <i class="iconfont icon-angle-down"></i>
        </div>
        <div class="option" v-if="show">
            <div class="loading" v-if="loading"></div>
            <template v-else>
                <span class="ellipsis" v-for="i in CityDataList" :key="i.code" @click="changeData((i))">{{ i.name }}</span>
            </template>
        </div>
    </div>
</template>
<script setup>
import axios from 'axios'
import { onClickOutside } from '@vueuse/core'
import { computed, reactive, ref } from 'vue';
const target = ref('')

const props = defineProps({
    fullLocation: {
        type: String,
        default: ''
    }
})
onClickOutside(target, () => {
    close()
})
const emit = defineEmits('[emitFullLocation]')
const show = ref(false);
const cityData = ref([])
const loading = ref(false)
const open = () => {

    for (const key in cityList) {
        cityList[key] = ''
    }
    show.value = true;
    loading.value = true
    getCityData().then(res => {
        cityData.value = res;
        loading.value = false;
    });

}
const close = () => {
    show.value = false;

}
const toggle = () => {
    show.value ? close() : open()
}

// 获取城市数据
// 1. 数据在哪里？https://yjy-oss-files.oss-cn-zhangjiakou.aliyuncs.com/tuxian/area.json
// 2. 何时获取？打开城市列表的时候，做个内存中缓存
// 3. 怎么使用数据？定义计算属性，根据点击的省份城市展示
const getCityData = () => {
    // 这个位置可能有异常操作，封装成promise
    return new Promise((resolve, reject) => {
        if (window.cityData) {
            // 有缓存
            resolve(window.cityData)
        } else {
            // 无缓存
            const url = 'https://yjy-oss-files.oss-cn-zhangjiakou.aliyuncs.com/tuxian/area.json'
            axios.get(url).then(res => {
                window.cityData = res.data
                resolve(window.cityData)
            })
        }
    })
}

const CityDataList = computed(() => {
    let list = cityData.value;
    if (cityList.provincecode && cityList.provincename) {
        list = list.find(item => item.code === cityList.provincecode).areaList
    }
    if (cityList.citycode && cityList.cityname) {
        list = list.find(item => item.code === cityList.citycode).areaList
    }
    return list
})

let cityList = reactive({
    provincecode: '',
    provincename: '',
    citycode: '',
    cityname: '',
    countrycode: '',
    countryname: '',
    fullLocation: ''
})

const changeData = (i) => {
    if (i.level === 0) {
        cityList.provincecode = i.code
        cityList.provincename = i.name
    } else if (i.level === 1) {
        cityList.citycode = i.code
        cityList.cityname = i.name
    } else {
        cityList.countrycode = i.code
        cityList.countryname = i.name
        cityList.fullLocation = ` ${cityList.provincename}  ${cityList.cityname}  ${cityList.countryname}`
        close();
        emit('emitFullLocation', cityList)
    }

}
</script>
<style scoped lang="scss">
.xtx-city {
    display: inline-block;
    position: relative;
    z-index: 400;

    .select {
        border: 1px solid #e4e4e4;
        height: 30px;
        padding: 0 5px;
        line-height: 28px;
        cursor: pointer;

        &.active {
            background: #fff;
        }

        .placeholder {
            color: #999;
        }

        .value {
            color: #666;
            font-size: 12px;
        }

        i {
            font-size: 12px;
            margin-left: 5px;
        }
    }

    .option {
        width: 542px;
        border: 1px solid #e4e4e4;
        position: absolute;
        left: 0;
        top: 29px;
        background: #fff;
        min-height: 30px;
        line-height: 30px;
        display: flex;
        flex-wrap: wrap;
        padding: 10px;

        .loading {
            height: 290px;
            width: 100%;
            background: url(@/assets/images/loading.gif) no-repeat center;
        }

        >span {
            width: 130px;
            text-align: center;
            cursor: pointer;
            border-radius: 4px;
            padding: 0 3px;

            &:hover {
                background: #f5f5f5;
            }
        }
    }
}
</style>