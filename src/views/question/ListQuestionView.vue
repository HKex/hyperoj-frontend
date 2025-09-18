<template>
  <div id="ListQuestionView">
    <h2>题目浏览</h2>
    <a-form :model="searchParam" layout="inline" @submit="doSearch">
      <a-form-item label="标题" field="title" style="min-width: 240px">
        <a-input
          v-model="searchParam.title"
          placeholder="请输入你想搜索的题目标题..."
        />
      </a-form-item>
      <a-form-item label="标签" field="tags" style="min-width: 240px">
        <a-input-tag
          v-model="searchParam.tags"
          placeholder="请输入你想搜索的标签..."
        />
      </a-form-item>
      <a-form-item>
        <a-button type="primary" @click="doSearch">搜索</a-button>
      </a-form-item>
    </a-form>
    <a-divider size="0" />
    <a-table
      :ref="tableRef"
      :columns="columns"
      :data="datalist"
      :pagination="{
        showTotal: true,
        total: total,
        pageSize: searchParam.pageSize,
        current: searchParam.current,
      }"
      @page-change="onPageChange"
    >
      <template #tags="{ record }">
        <a-space>
          <a-tag
            v-for="(tag, index) in record.tags"
            :key="index"
            :color="getRandomTagColor()"
            >{{ tag }}
          </a-tag>
        </a-space>
      </template>
      <template #passRate="{ record }">
        <a-space>
          {{ calPassRate(record.acceptedNum, record.submitNum) }}%
        </a-space>
      </template>
      <template #operator="{ record }">
        <a-space>
          <a-button status="success" @click="toQuestion(record)">查看</a-button>
        </a-space>
      </template>
    </a-table>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watchEffect } from "vue";
import {
  QuestionControllerService,
  QuestionQueryRequest,
} from "../../../generated";
import message from "@arco-design/web-vue/es/message";
import { useRouter } from "vue-router";

const columns = [
  {
    title: "题号",
    dataIndex: "id",
  },
  {
    title: "标题",
    dataIndex: "title",
  },
  {
    title: "标签",
    dataIndex: "tags",
    slotName: "tags",
  },
  {
    title: "提交数",
    dataIndex: "submitNum",
  },
  {
    title: "通过数",
    dataIndex: "acceptedNum",
  },
  {
    title: "通过率",
    dataIndex: "passRate",
    slotName: "passRate",
  },
  {
    title: "用户ID",
    dataIndex: "userId",
  },
  {
    title: "创建时间",
    dataIndex: "createTime",
  },
  {
    slotName: "operator",
  },
];

const datalist = ref([]);
const total = ref(0);
const router = useRouter();
const tableRef = ref();
const searchParam = ref<QuestionQueryRequest>({
  title: "",
  tags: [],
  pageSize: 10,
  current: 1,
});

/**
 * 查询题目列表
 */
const getQuestionVOList = async () => {
  const res = await QuestionControllerService.listQuestionVoByPageUsingPost(
    searchParam.value
  );
  if (res.code === 0) {
    console.log(res);
    datalist.value = res.data.records;
    total.value = res.data.records.length;
  } else {
    message.error("查询失败：", res.message);
  }
};

/**
 * 分页切换
 * @param page
 */
const onPageChange = (page: number) => {
  searchParam.value = {
    ...searchParam.value,
    current: page,
  };
};

/**
 * 监听分页参数，改变时重新调用
 */
watchEffect(() => {
  getQuestionVOList();
});

/**
 * 页面加载时操作
 */
onMounted(() => {
  getQuestionVOList();
});

const tagColors = [
  "red",
  "orangered",
  "orange",
  "gold",
  "lime",
  "green",
  "cyan",
  "blue",
  "arcoblue",
  "purple",
  "pinkpurple",
  "magenta",
  "gray",
];

// 随机获取颜色的函数
const getRandomTagColor = () => {
  const randomIndex = Math.floor(Math.random() * tagColors.length);
  return tagColors[randomIndex];
};

const calPassRate = (acceptedNum, submitNum) => {
  if (
    submitNum === 0 ||
    acceptedNum === 0 ||
    submitNum === null ||
    acceptedNum === null
  ) {
    return 0;
  }
  return ((acceptedNum / submitNum) * 100).toFixed(2);
};

/**
 * 跳转到做题页面
 * @param question
 */
const toQuestion = (question) => {
  router.push({
    name: "题目详情",
    params: {
      id: question.id,
    },
  });
};

/**
 * 搜索
 */
const doSearch = () => {
  // 重置分页
  searchParam.value = {
    ...searchParam.value,
    current: 1,
  };
};
</script>

<style scoped>
#ListQuestionView {
  max-width: 1280px;
  margin: 0 auto;
}
</style>
