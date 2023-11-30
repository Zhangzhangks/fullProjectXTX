<template>
  <XtxxDialog title="切换地址" v-model="dialogVisible">
    <template #default>
      <div class="xtx-form">
        <div class="xtx-form-item">
          <div class="label">收货人：</div>
          <div class="field">
            <input
              v-model="formData.receiver"
              class="input"
              placeholder="请输入收货人"
            />
          </div>
        </div>
        <div class="xtx-form-item">
          <div class="label">手机号：</div>
          <div class="field">
            <input
              v-model="formData.contact"
              class="input"
              placeholder="请输入手机号"
            />
          </div>
        </div>
        <div class="xtx-form-item">
          <div class="label">地区：</div>
          <div class="field">
            <xtxCity
              :fullLocation="formData.fullLocation"
              @emitFullLocation="changeCty"
            />
          </div>
        </div>
        <div class="xtx-form-item">
          <div class="label">详细地址：</div>
          <div class="field">
            <input
              v-model="formData.address"
              class="input"
              placeholder="请输入详细地址"
            />
          </div>
        </div>
        <div class="xtx-form-item">
          <div class="label">邮政编码：</div>
          <div class="field">
            <input
              v-model="formData.postalCode"
              class="input"
              placeholder="请输入邮政编码"
            />
          </div>
        </div>
        <div class="xtx-form-item">
          <div class="label">地址标签：</div>
          <div class="field">
            <input
              v-model="formData.addressTags"
              class="input"
              placeholder="请输入地址标签，逗号分隔"
            />
          </div>
        </div>
      </div>
    </template>
    <template #footer>
      <XtxButton
        type="gray"
        style="margin-right: 20px"
        @click="dialogVisible = false"
        >取消</XtxButton
      >
      <XtxButton type="primary" @click="enterfn"> 确认</XtxButton>
    </template>
  </XtxxDialog>
</template>
<script setup>
import { addAddress, editAddress } from "@/apis/order";

import { reactive, ref } from "vue";
const dialogVisible = ref(false);
// 打开函数
const open = (data) => {
  if (data.id) {
    for (const key in data) {
      formData[key] = data[key];
    }
  } else {
    for (const key in formData) {
      if (key === "isDefault") {
        formData["isDefault"] = 1;
      } else {
        formData[key] = "";
      }
    }
  }
  dialogVisible.value = true;
};

// 表单数据
const formData = reactive({
  receiver: "",
  contact: "",
  provinceCode: "",
  cityCode: "",
  countyCode: "",
  address: "",
  postalCode: "",
  addressTags: "  ",
  isDefault: 1,
  fullLocation: "请选择",
  id: null,
});

const changeCty = (data) => {
  formData.provinceCode = data.provincecode;
  formData.cityCode = data.citycode;
  formData.countyCode = data.countrycode;
  formData.fullLocation = data.fullLocation;
};

const emit = defineEmits("[change]");

const enterfn = () => {
  dialogVisible.value = false;
  if (formData.id) {
    editAddress(formData).then((res) => {
      emit("on-success", formData);
    });
  } else {
    addAddress(formData).then((res) => {
      formData.id = res.result.id;
      emit("on-success", formData);
    });
  }
};
defineExpose({
  open,
});
</script>
<style scoped lang="scss">
.xtx-dialog {
  :deep(.wrapper) {
    width: calc(100% - 200px);

    .body {
      font-size: 14px;
    }
  }
}

.xtx-form {
  padding: 0;

  input {
    outline: none;

    &::placeholder {
      color: #ccc;
    }
  }
}

.xtx-city {
  width: 320px;

  :deep(.select) {
    height: 50px;
    line-height: 48px;
    display: flex;
    padding: 0 10px;
    justify-content: space-between;

    .placeholder {
      color: #ccc;
    }

    i {
      color: #ccc;
      font-size: 18px;
    }

    .value {
      font-size: 14px;
    }
  }

  :deep(.option) {
    top: 49px;
  }
}
</style>
