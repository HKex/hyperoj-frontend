<template>
  <div class="home-container">
    <div class="home-layout">
      <!-- 左列：主要内容 -->
      <div class="main-content">
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
              <a-button
                type="secondary"
                size="large"
                @click="navigateTo('/about')"
              >
                了解更多
              </a-button>
            </div>
          </div>
        </section>
      </div>

      <!-- 右列：日历 -->
      <div class="sidebar-content">
        <div class="calendar-section">
          <h3 class="calendar-title">签到日历</h3>
          <a-calendar
            v-model:value="currentDate"
            :fullscreen="false"
            class="checkin-calendar"
          />
          <div class="checkin-info">
            <p class="checkin-desc">每日签到可获得积分奖励</p>
            <a-button type="primary" size="small" class="checkin-btn">
              今日签到
            </a-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { IconArrowRight } from "@arco-design/web-vue/es/icon";

// 路由和状态管理
const router = useRouter();

// 日历相关
const currentDate = ref(new Date());

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

.home-layout {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 40px;
  align-items: start;
  min-height: 80vh;
}

/* 左列：主要内容 */
.main-content {
  display: flex;
  flex-direction: column;
}

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

/* 右列：日历 */
.sidebar-content {
  position: sticky;
  top: 20px;
}

.calendar-section {
  background: #fff;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border: 1px solid #e5e6eb;
}

.calendar-title {
  font-size: 18px;
  font-weight: 600;
  color: #1d2129;
  margin-bottom: 16px;
  text-align: center;
}

.checkin-calendar {
  margin-bottom: 20px;
}

.checkin-info {
  text-align: center;
  padding-top: 16px;
  border-top: 1px solid #e5e6eb;
}

.checkin-desc {
  font-size: 14px;
  color: #4e5969;
  margin-bottom: 12px;
}

.checkin-btn {
  width: 100%;
}

/* 响应式设计 */
@media (max-width: 480px) {
  .home-container {
    padding: 0 16px;
  }

  .calendar-section {
    padding: 16px;
  }

  .welcome-title {
    font-size: 28px;
  }

  .welcome-subtitle {
    font-size: 16px;
  }
}
</style>
