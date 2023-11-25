<template>
    <div class="account-box">
        <div class="toggle">
            <a @click="isMsgLogin = false" href="javascript:;" v-if="isMsgLogin">
                <i class="iconfont icon-user"></i> 使用账号登录
            </a>
            <a @click="isMsgLogin = true" href="javascript:;" v-else>
                <i class="iconfont icon-msg"></i> 使用短信登录
            </a>
        </div>

        <div class="form">
            <template v-if="!isMsgLogin">
                <div class="form-item">
                    <div class="input">
                        <el-form ref="ruleFormRef" :rules="rules" :model="form" class="demo-ruleForm" status-icon>
                            <el-form-item prop="account">
                                <el-input style="height: 36px;" placeholder="请输入账号" v-model="form.account">
                                    <template #prefix>
                                        <el-icon class="el-input__icon"
                                            style="width: 34px;height: 34px;background-color: #cfcdcd;">
                                            <User style="width: 18px;height: 18px;color: #fff;" />
                                        </el-icon>
                                    </template>
                                </el-input>
                            </el-form-item>
                            <el-form-item prop="password">
                                <el-input style="height: 36px;" placeholder="请输入密码" v-model="form.password">
                                    <template #prefix>
                                        <el-icon class="el-input__icon"
                                            style="width: 34px;height: 34px;background-color: #cfcdcd;">
                                            <Lock style="width: 18px;height: 18px;color: #fff;" />
                                        </el-icon>
                                    </template>
                                </el-input>
                            </el-form-item>
                        </el-form>
                    </div>
                </div>

            </template>


            <template v-else>
                <div class="form-item">
                    <div class="input">
                        <el-form ref="ruleFormRef" :rules="rules" :model="form" class="demo-ruleForm" status-icon>
                            <el-form-item prop="mobile">
                                <el-input style="height: 36px;" placeholder="请输入手机号" v-model="form.mobile">
                                    <template #prefix>
                                        <el-icon class="el-input__icon"
                                            style="width: 34px;height: 34px;background-color: #cfcdcd;">
                                            <User style="width: 18px;height: 18px;color: #fff;" />
                                        </el-icon>
                                    </template>
                                </el-input>
                            </el-form-item>
                            <el-form-item prop="code">
                                <el-input style="height: 36px;" v-model="form.code" placeholder="请输入验证码">
                                    <template #prefix>
                                        <el-icon class="el-input__icon"
                                            style="width: 34px;height: 34px;background-color: #cfcdcd;">

                                            <Message style="width: 18px;height: 18px;color: #fff;" />
                                        </el-icon>
                                    </template>
                                    <template #append>
                                        <el-button type="primary">发送验证码</el-button>
                                    </template>
                                </el-input>
                            </el-form-item>
                        </el-form>
                    </div>
                </div>

            </template>
            <div class="form-item" style="margin-top: 80px;">
                <div class="agree">
                    <XtxCheckbox v-model="form.isAgree" />
                    <span>我已同意</span>
                    <a href="javascript:;">《隐私条款》</a>
                    <span>和</span>
                    <a href="javascript:;">《服务条款》</a>
                </div>
            </div>
            <a href="javascript:;" class="btn" @click="login">登录</a>
        </div>
        <div class="action">
            <img src="https://qzonestyle.gtimg.cn/qzone/vas/opensns/res/img/Connect_logo_7.png" alt="">
            <div class="url">
                <a href="javascript:;">忘记密码</a>
                <a href="javascript:;">免费注册</a>
            </div>
        </div>
    </div>
</template>
<script setup>
import Message from '@/components/libirary/message.js'
import { reactive, ref, watch } from 'vue';
import { checkMobile, checkPassword, checkCode, checkAccount } from '@/vender/schema'

const rules = reactive({
    account: [
        { required: true, message: '请输入账号', trigger: 'blur' },
        { validator: checkAccount, trigger: 'blur' }
    ],
    password: [
        { required: true, message: '请输入密码', trigger: 'blur' },
        { validator: checkPassword, trigger: 'blur' }
    ],
    mobile: [
        { required: true, message: '请输入手机号', trigger: 'blur' },
        { validator: checkMobile, trigger: 'blur' }
    ],
    code: [
        { required: true, message: '请输入验证码', trigger: 'blur' },
        { validator: checkCode, trigger: 'blur' }
    ],


})

// 是否短信登录
const isMsgLogin = ref(false)
// 表单信息对象
const form = reactive({
    isAgree: false,
    account: '',
    password: '',
    mobile: '',
    code: ''
})
const ruleFormRef = ref('')

const login = () => {
    Message({ type: 'success', text: '我是山' })
    ruleFormRef.value.validate(result => {
        if (result) {

        } console.log(result);
    })
}

watch(isMsgLogin, (val) => {
    ruleFormRef.value.resetFields()

})
</script>
<style scoped lang="scss">
:deep(.el-input__wrapper) {
    padding: 0;
}

// 账号容器
.account-box {
    .toggle {
        padding: 15px 40px;
        text-align: right;

        a {
            color: $xtxColor;

            i {
                font-size: 14px;
            }
        }
    }

    .form {
        padding: 0 40px;

        &-item {


            .input {
                position: relative;
                height: 36px;

                >i {
                    width: 34px;
                    height: 34px;
                    background: #cfcdcd;
                    color: #fff;
                    position: absolute;
                    left: 1px;
                    top: 1px;
                    text-align: center;
                    line-height: 34px;
                    font-size: 18px;
                }

                input {
                    padding-left: 44px;
                    border: 1px solid #cfcdcd;
                    height: 36px;
                    line-height: 36px;
                    width: 100%;

                    &.error {
                        border-color: $priceColor;
                    }

                    &.active,
                    &:focus {
                        border-color: $xtxColor;
                    }
                }

                .code {
                    position: absolute;
                    right: 1px;
                    top: 1px;
                    text-align: center;
                    line-height: 34px;
                    font-size: 14px;
                    background: #f5f5f5;
                    color: #666;
                    width: 90px;
                    height: 34px;
                    cursor: pointer;
                }
            }

            >.error {
                position: absolute;
                font-size: 12px;
                line-height: 28px;
                color: $priceColor;

                i {
                    font-size: 14px;
                    margin-right: 2px;
                }
            }
        }

        .agree {
            a {
                color: #069;
            }
        }

        .btn {
            display: block;
            width: 100%;
            height: 40px;
            color: #fff;
            text-align: center;
            line-height: 40px;
            background: $xtxColor;

            &.disabled {
                background: #cfcdcd;
            }
        }
    }

    .action {
        padding: 20px 40px;
        display: flex;
        justify-content: space-between;
        align-items: center;

        .url {
            a {
                color: #999;
                margin-left: 10px;
            }
        }
    }
}
</style>