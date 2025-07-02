<template>
  <div id="ListQuestionSubmitView">
    <h2>题目提交记录</h2>
    <a-form :model="searchParam" layout="inline" @submit="doSearch">
      <a-form-item label="语言" field="language" style="min-width: 240px">
        <a-select
          v-model="searchParam.language"
          placeholder="请选择你想搜索的语言..."
          allow-clear
        >
          <a-option>Java</a-option>
        </a-select>
      </a-form-item>
      <a-form-item label="状态" field="status" style="min-width: 240px">
        <a-input
          v-model="searchParam.status"
          placeholder="请输入你想搜索的状态..."
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
    </a-table>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watchEffect } from "vue";
import {
  QuestionSubmitControllerService,
  QuestionSubmitQueryRequest,
} from "../../../generated";
import message from "@arco-design/web-vue/es/message";
import { useRouter } from "vue-router";

const columns = [
  {
    title: "题号",
    dataIndex: "id",
  },
  {
    title: "语言",
    dataIndex: "language",
  },
  {
    title: "状态",
    dataIndex: "status",
  },
  {
    title: "问题ID",
    dataIndex: "questionId",
  },
  {
    title: "用户ID",
    dataIndex: "userId",
  },
  {
    title: "创建时间",
    dataIndex: "createTime",
  },
];

const datalist = ref([]);
const total = ref(0);
const router = useRouter();
const tableRef = ref();
const searchParam = ref<QuestionSubmitQueryRequest>({
  language: "",
  status: "",
  questionId: "",
  pageSize: 10,
  current: 1,
});

/**
 * 查询题目列表
 */
const getQuestionSubmitVOList = async () => {
  const res =
    await QuestionSubmitControllerService.listQuestionByPageUsingPost1(
      searchParam.value
    );
  if (res.code === 0) {
    console.log(res);
    datalist.value = res.data.records;
    total.value = res.data.total;
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
  getQuestionSubmitVOList();
});

/**
 * 页面加载时操作
 */
onMounted(() => {
  getQuestionSubmitVOList();
});

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
#ListQuestionSubmitView {
  max-width: 1280px;
  margin: 0 auto;
}
</style>
