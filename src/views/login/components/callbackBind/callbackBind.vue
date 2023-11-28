<template>
    <div class="xtx-form" v-if="qqData">
        <div class="user-info">
            <img :src="qqData.figureurl_1" alt="" />
            <p>{{ qqData.nickname }} 欢迎来小兔鲜，完成绑定后可以QQ账号一键登录哦~</p>
        </div>
        <div class="xtx-form-item">
            <div class="field">
                <i class="icon iconfont icon-phone"></i>
                <input class="input" v-model="form.mobile" type="text" placeholder="绑定的手机号" />
            </div>
            <div class="error"></div>
        </div>
        <div class="xtx-form-item">
            <div class="field">
                <i class="icon iconfont icon-code"></i>
                <input class="input" v-model="form.code" type="text" placeholder="短信验证码" />
                <span class="code" @click="send">发送验证码</span>
            </div>
            <div class="error"></div>
        </div>
        <a href="javascript:;" class="submit" @click="submit">立即绑定</a>
    </div>
</template>

<script setup>
import { reactive, ref } from 'vue';
import { userQQBind, userQQBindLogin } from '@/apis/user'
import { useUserStore } from '@/store/modules/userStore';
import { storeToRefs } from 'pinia';
import Message from '@/components/libirary/message'
const userStore = useUserStore()
const { redirectUrl } = storeToRefs(userStore)
// 1. 准备下信息：unionId(openId) qq头像 昵称
// 2. 完成表单校验
// 3. 发送验证吗（校验，定义api，调用，完成倒计时）
// 4. 进行绑定（绑定成功就是登录成功）
const props = defineProps({
    unionId: {
        type: String,
        default: ''
    },
})
const qqData = ref('')
if (QC.Login.check()) {
    // QC.api(api, paras, fmt, method)
    QC.api('get_user_info', { params: { unionId: props.unionId } }, 'json', 'get').success(res => {
        // console.log(res);
        qqData.value = res.data
    })
}
const form = reactive({
    mobile: '',
    code: ''
})
const send = () => {
    userQQBind(form.mobile).then(res => {
    })
}
const submit = async () => {
    userQQBindLogin({ unionId: props.unionId, mobile: form.mobile, code: form.code }).then(res => {
        userStore.profile = res.result;
        // console.log(res);
        router.push({ path: redirectUrl.value })

        Message({ type: 'success', text: '登陆成功', showClose: true })
    }).catch(e => {
        Message({ type: 'error', text: e.response.data.message, showClose: true })

    })
}
</script>

<style scoped lang='scss'>
.user-info {
    width: 320px;
    height: 70px;
    margin: 0 auto;
    display: flex;
    background: #f2f2f2;
    align-items: center;
    padding: 0 10px;
    margin-bottom: 25px;

    img {
        background: #f2f2f2;
        width: 50px;
        height: 50px;
    }

    p {
        padding-left: 10px;
    }
}

.code {
    position: absolute;
    right: 0;
    top: 0;
    line-height: 50px;
    width: 80px;
    color: #999;

    &:hover {
        cursor: pointer;
    }
}
</style>