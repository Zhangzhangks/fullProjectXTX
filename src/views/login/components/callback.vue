<template>
    <loginHeader>联合登录</loginHeader>
    <section class="container" v-if="isBind">
        <div class="unbind">
            <div class="loading"></div>
        </div>
    </section>
    <section class="container" v-else>
        <nav class="tab">
            <a @click="hasAccount = true" :class="{ active: hasAccount }" href="javascript:;">
                <i class="iconfont icon-bind" />
                <span>已有小兔鲜账号，请绑定手机</span>
            </a>
            <a @click="hasAccount = false" :class="{ active: !hasAccount }" href="javascript:;">
                <i class="iconfont icon-edit" />
                <span>没有小兔鲜账号，请完善资料</span>
            </a>
        </nav>
        <div class="tab-content" v-if="hasAccount">
            <CallbackBind :unionId="unionId" />
        </div>
        <div class="tab-content" v-else>
            <CallbackPatch :unionId="unionId" />
        </div>
    </section>

    <loginFooter />
</template>
<script setup>
import loginFooter from './login-footer.vue';
import loginHeader from './loginHeader.vue';
import CallbackBind from './callbackBind/callbackBind.vue'
import CallbackPatch from './callBackPatch/callBackPatch.vue'
import { ref } from 'vue';
import { userQQLogin } from '@/apis/user'
import Message from '@/components/libirary/message'
import { useUserStore } from '@/store/modules/userStore';
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';
const { redirectUrl } = storeToRefs(useUserStore())
const userSotre = useUserStore()
const hasAccount = ref(true)
const isBind = ref(true)
const router = useRouter()
// 1. 准备下信息：unionId(openId) qq头像 昵称
const unionId = ref(null)
if (QC.Login.check()) {
    // 检查QQ是否登录
    QC.Login.getMe((openId, accessToken) => {
        unionId.value = openId
        // console.log(openId, accessToken);
        userQQLogin(openId).then(res => {
            console.log(res);
            userSotre.profile = res.result;
            router.push({ path: redirectUrl.value })
            Message({ type: 'success', text: 'qq登录成功' })
        }).catch(e => {
            isBind.value = false
        })
    })
}
</script>

<style scoped lang='scss'>
.container {
    padding: 25px 0;
    position: relative;
    height: 730px;

    .unbind {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        padding: 25px 0;
        z-index: 99;

        .loading {
            height: 100%;
            background: #fff url(@/assets/images/load.gif) no-repeat center / 100px 100px;
        }
    }
}


.tab {
    background: #fff;
    height: 80px;
    padding-top: 40px;
    font-size: 18px;
    text-align: center;

    a {
        color: #666;
        display: inline-block;
        width: 350px;
        line-height: 40px;
        border-bottom: 2px solid #e4e4e4;

        i {
            font-size: 22px;
            vertical-align: middle;
        }

        span {
            vertical-align: middle;
            margin-left: 4px;
        }

        &.active {
            color: $xtxColor;
            border-color: $xtxColor;
        }
    }
}

.tab-content {
    min-height: 600px;
    background: #fff;
}
</style>