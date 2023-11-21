import { defineStore, storeToRefs } from "pinia";
import { reactive, ref, toRefs } from "vue";

export const useUserStore = defineStore(
    "user",
    () => {
        const data = reactive({     // 用户信息
            profile: {
                id: "",
                avatar: "",
                nickname: "s",
                account: "ss",
                mobile: "",
                token: "s",
            },
        });
        const { profile } = toRefs(data);

        const clearUserInfo = (obj) => {
            profile.value = obj;
        };
        return { profile, clearUserInfo };
    },
    { persist: true }
);
