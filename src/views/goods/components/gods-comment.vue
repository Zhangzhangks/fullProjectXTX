<template>
    <div class="goods-comment" v-if="commentInfo">


        <div class="head">
            <div class="data">
                <p><span>{{ commentInfo.salesCount }}</span><span>人购买</span></p>
                <p><span>{{ commentInfo.praisePercent }}</span><span>好评率</span></p>
            </div>
            <div class="tags">
                <div class="dt">大家都在说：</div>
                <div class="dd">
                    <a :class="{ active: currentIndex === i }" v-for="(item, i) in commentInfo.tags" href="javascript:;"
                        @click="changeTags(item.title, i)">
                        {{ item.title }}{{ (item.tagCount) }}</a>
                </div>
            </div>
        </div>
        <div class="sort">
            <span>排序：</span>
            <span>排序：</span>
            <a @click="changeSort(null)" href="javascript:;" :class="{ active: reqParams.sortField === null }">默认</a>
            <a @click="changeSort('praiseCount')" href="javascript:;"
                :class="{ active: reqParams.sortField === 'praiseCount' }">最热</a>
            <a @click="changeSort('createTime')" href="javascript:;"
                :class="{ active: reqParams.sortField === 'createTime' }">最新</a>

        </div>
        <!-- 列表 -->
        <div class="list" v-if="commentList">
            <div class="item" v-for="item in commentList" :key="item.id">
                <div class="user">
                    <img :src="item.member.avatar">
                    <span>{{ sliceStr(item.member.nickname) }}</span>
                </div>
                <div class="body">
                    <div class="score">
                        <i class="iconfont icon-wjx01" v-for="i in item.score"></i>
                        <i class="iconfont icon-wjx02" v-for="i in 5 - item.score"></i>
                        <span class="attr" v-for="sub in item.orderInfo.specs">{{ sub.name }}:{{ sub.nameValue }}</span>
                    </div>
                    <div class="text">{{ item.content }}</div>
                    <GoodsCommentImage v-if="item.pictures.length" :pictures="item.pictures" />
                    <div class="time">
                        <span>{{ item.createTime }}</span>
                        <span class="zan"><i class="iconfont icon-dianzan"></i>{{ item.praiseCount }}</span>
                    </div>
                </div>
            </div>
        </div>

        <div class="zks" v-if="total">
            <XtxPagination :total="86" :currentPage="reqParams.page" :pageSize="reqParams.pageSize"
                @changePage="changePage" />


            <!-- <el-pagination background v-model:current-page="currentPage2" v-model:page-size="pageSize2"
                :page-sizes="[10, 20, 30, 50]" :disabled="disabled" layout="sizes, prev, pager, next" :total="total"
                @size-change="handleSizeChange" @current-change="handleCurrentChange" /> -->
        </div>
    </div>
</template>
<script setup>
import { findCommentInfoByGoods, findCommenList } from '@/apis/product'
import { ref, inject, computed, reactive, watch } from 'vue'
import GoodsCommentImage from './goods-content-image.vue'
const goods = inject('goods')
const commentInfo = ref(null)


//图片索引
const currentIndex = ref(0)
// 商品评价头部
findCommentInfoByGoods(goods.value.id).then(res => {
    // console.log(res.result);
    res.result.tags.unshift({
        tagCount: res.result.evaluateCount,
        title: "全部评价"
    }, {
        tagCount: res.result.hasPictureCount,
        title: "有图"
    })
    commentInfo.value = res.result
})


const total = ref(null)

// 筛选条件准备
const reqParams = reactive({
    page: 1,
    pageSize: 10,
    hasPicture: null,
    tag: null,
    sortField: null
})
const changePage = (page) => {
    reqParams.page = page
}
/* 饿了么
const handleSizeChange = (val) => {
    console.log(`${val} items per page`)
    reqParams.pageSize = val;
}
const handleCurrentChange = (val) => {
    console.log(`current page: ${val}`)
    reqParams.page = val
}
const changeSort = (play) => {
    reqParams.sortField = play
    reqParams.page = 1
}
*/


// 切换筛选条件
const changeTags = (title, i) => {
    currentIndex.value = i
    if (title === '有图') {
        reqParams.hasPicture = true
        reqParams.tag = null
    } else if (title === '全部评价') {
        reqParams.hasPicture = null
        reqParams.tag = null
    }
    else {
        reqParams.hasPicture = null
        reqParams.tag = title
    }
    reqParams.page = 1

}

const commentList = ref([])
watch(reqParams, () => {
    // 分页评论列表
    findCommenList(goods.value.id, reqParams).then(res => {
        // console.log(res.result);
        commentList.value = res.result.items
        total.value = res.result.counts
    })
}, { immediate: true, })

function sliceStr(str) {
    return `${str.slice(0, 1)}****${str.slice(str.length - 1)}`
}
</script>
<style scoped lang="scss">
.goods-comment {
    .head {
        display: flex;
        padding: 30px 0;

        .data {
            width: 340px;
            display: flex;
            padding: 20px;

            p {
                flex: 1;
                text-align: center;

                span {
                    display: block;

                    &:first-child {
                        font-size: 32px;
                        color: $priceColor;
                    }

                    &:last-child {
                        color: #999;
                    }
                }
            }
        }

        .tags {
            flex: 1;
            display: flex;
            border-left: 1px solid #f5f5f5;

            .dt {
                font-weight: bold;
                width: 100px;
                text-align: right;
                line-height: 42px;
            }

            .dd {
                flex: 1;
                display: flex;
                flex-wrap: wrap;

                >a {
                    width: 132px;
                    height: 42px;
                    margin-left: 20px;
                    margin-bottom: 20px;
                    border-radius: 4px;
                    border: 1px solid #e4e4e4;
                    background: #f5f5f5;
                    color: #999;
                    text-align: center;
                    line-height: 40px;

                    &:hover {
                        border-color: $xtxColor;
                        background: lighten($xtxColor, 50%);
                        color: $xtxColor;
                    }

                    &.active {
                        border-color: $xtxColor;
                        background: $xtxColor;
                        color: #fff;
                    }
                }
            }
        }
    }

    .sort {
        height: 60px;
        line-height: 60px;
        border-top: 1px solid #f5f5f5;
        border-bottom: 1px solid #f5f5f5;
        margin: 0 20px;
        color: #666;

        >span {
            margin-left: 20px;
        }

        >a {
            margin-left: 30px;

            &.active,
            &:hover {
                color: $xtxColor;
            }
        }
    }
}

.list {
    padding: 0 20px;

    .item {
        display: flex;
        padding: 25px 10px;
        border-bottom: 1px solid #f5f5f5;

        .user {
            width: 160px;

            img {
                width: 40px;
                height: 40px;
                border-radius: 50%;
                overflow: hidden;
            }

            span {
                padding-left: 10px;
                color: #666;
            }
        }

        .body {
            flex: 1;

            .score {
                line-height: 40px;

                .iconfont {
                    color: #ff9240;
                    padding-right: 3px;
                }

                .attr {
                    padding-left: 10px;
                    color: #666;
                }
            }
        }

        .text {
            color: #666;
            line-height: 24px;
        }

        .time {
            color: #999;
            display: flex;
            justify-content: space-between;
            margin-top: 5px;
        }
    }
}

.zks {
    display: flex;
    justify-content: center;
    padding: 30px;
}
</style>