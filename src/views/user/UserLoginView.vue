<template>
  <div id="userLoginView">
    <h2>请登录</h2>
    <a-form
      style="max-width: 480px; margin: 0 auto"
      label-align="left"
      layout="horizontal"
      auto-label-width
      :model="form"
      @submit="handleSubmit"
    >
      <a-form-item field="userAccount" label="账号">
        <a-input v-model="form.userAccount" placeholder="请输入账号" />
      </a-form-item>
      <a-form-item field="userPassword" tooltip="密码不得少于八位" label="密码">
        <a-input-password
          v-model="form.userPassword"
          placeholder="请输入密码"
        />
      </a-form-item>
      <a-form-item>
        <a-col style="justify-content: space-between">
          <a-button type="primary" html-type="submit" style="width: 120px"
            >登录
          </a-button>
          <a-button
            type="secondary"
            html-type="button"
            style="width: 120px"
            @click="toRegisterPage"
          >
            注册
          </a-button>
        </a-col>
      </a-form-item>
    </a-form>
  </div>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import { UserControllerService, UserLoginRequest } from "../../../generated";
import message from "@arco-design/web-vue/es/message";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

const router = useRouter();
const store = useStore();

/**
 * 表单数据
 */
const form = reactive({
  userAccount: "",
  userPassword: "",
} as UserLoginRequest);
/**
 * 表单提交
 * @param data
 */
const handleSubmit = async () => {
  const res = await UserControllerService.userLoginUsingPost(form);
  // 登录成功跳转主页
  if (res.code === 0) {
    await store.dispatch("user/getLoginUser");
    router.push({
      path: "/",
      replace: true,
    });
  } else {
    message.error("登录失败，" + res.message);
  }
};

/**
 * 去注册
 */
const toRegisterPage = () => {
  router.push({
    path: "/user/register",
  });
};
</script>
