<template>
  <div class="home-container">
    <!-- 英雄区域 -->
    <section class="welcome-section">
      <div class="welcome-content">
        <h1 class="welcome-title">Hyper<span class="accent">OJ</span></h1>
        <p class="welcome-subtitle">提升编程技能的在线评测平台</p>
        <div class="welcome-actions">
          <a-button
            type="primary"
            size="large"
            @click="navigateTo('/question/list')"
          >
            开始刷题
            <icon-arrow-right style="margin-left: 8px" />
          </a-button>
          <a-button type="secondary" size="large" @click="navigateTo('/about')">
            了解更多
          </a-button>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import { IconArrowRight } from "@arco-design/web-vue/es/icon";
// 路由和状态管理
const router = useRouter();

// 导航方法
const navigateTo = (path: string) => {
  router.push(path);
};
</script>

<style scoped>
.home-container {
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 20px;
}

/* 欢迎区域 */
.welcome-section {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  padding: 80px 0;
  gap: 40px;
}

.welcome-content {
  flex: 1;
  min-width: 300px;
}

.welcome-title {
  font-size: 48px;
  font-weight: 700;
  margin-bottom: 20px;
  color: #1d2129;
}

.welcome-title .accent {
  color: #165dff;
}

.welcome-subtitle {
  font-size: 18px;
  color: #4e5969;
  margin-bottom: 32px;
  max-width: 500px;
}

.welcome-actions {
  display: flex;
  gap: 16px;
}
</style>
