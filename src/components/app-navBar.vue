<template>
    <nav class="app-topnav">
        <div class="container">
            <ul>
                <template v-if="profile?.token">
                    <li><a href="javascript:;"><i class="iconfont icon-user"></i>{{ profile.account }}</a></li>
                    <li><a href="javascript:;" @click="logout">退出登录</a></li>
                </template>
                <template v-else>
                    <li><a href="javascript:;" @click="router.push('/login')">请先登录</a></li>
                    <li><a href="javascript:;">免费注册</a></li>
                </template>
                <li>
                    <RouterLink to="/member/order" active-class="active">我的订单</RouterLink>
                </li>
                <li><a href="javascript:;">会员中心</a></li>
                <li><a href="javascript:;">帮助中心</a></li>
                <li><a href="javascript:;">关于我们</a></li>
                <li><a href="javascript:;"><i class="iconfont icon-phone"></i>手机版</a></li>
            </ul>
        </div>
    </nav>
</template>
<script  name= 'AppTopnav' setup>
import { useUserStore } from '@/store/modules/userStore';
import { storeToRefs } from 'pinia';
import { useCartStore } from '@/store/modules/cartStore'
import { useRouter } from 'vue-router';
const router = useRouter()
const UserStore = useUserStore()
const { profile } = storeToRefs(UserStore)

const { list } = storeToRefs(useCartStore())
const logout = function () {
    router.push('/login');
    UserStore.profile = {}
    list.value = []
}

</script>
<style scoped lang="scss">
.app-topnav {
    background: #333;

    ul {
        display: flex;
        height: 53px;
        justify-content: flex-end;
        align-items: center;

        li {
            a {
                padding: 0 15px;
                color: #cdcdcd;
                line-height: 1;
                display: inline-block;

                i {
                    font-size: 14px;
                    margin-right: 2px;
                }

                &:hover {
                    color: $xtxColor;
                }
            }

            ~li {
                a {
                    border-left: 2px solid #666;
                }
            }
        }
    }
}
</style>