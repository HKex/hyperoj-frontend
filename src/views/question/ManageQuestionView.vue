<template>
  <div id="ManageQuestionView">
    <h2>题目管理</h2>
    <a-table
      :ref="tableRef"
      :columns="columns"
      :data="datalist"
      :pagination="{
        showTotal: true,
        total: total,
        pageSize: pageParam.pageSize,
        current: pageParam.pageNum,
      }"
    >
      <template #operator="{ record }">
        <a-space>
          <a-button status="success" @click="doUpdate(record)">修改</a-button>
          <a-button status="danger" @click="doDelete(record)">删除</a-button>
        </a-space>
      </template>
    </a-table>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { Question, QuestionControllerService } from "../../../generated";
import message from "@arco-design/web-vue/es/message";
import { useRouter } from "vue-router";

const columns = [
  {
    title: "id",
    dataIndex: "id",
  },
  {
    title: "标题",
    dataIndex: "title",
  },
  {
    title: "内容",
    dataIndex: "content",
  },
  {
    title: "标签",
    dataIndex: "tags",
  },
  {
    title: "答案",
    dataIndex: "answer",
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
    title: "用户ID",
    dataIndex: "userId",
  },
  {
    title: "创建时间",
    dataIndex: "createTime",
  },
  {
    title: "操作",
    slotName: "operator",
  },
];

const datalist = ref([]);
const total = ref(0);
const pageParam = ref({
  pageSize: 10,
  pageNum: 1,
});
const router = useRouter();
const tableRef = ref();

/**
 * 查询题目列表
 */
const getQuestionVOList = async () => {
  const res = await QuestionControllerService.listQuestionVoByPageUsingPost(
    pageParam.value
  );
  if (res.code === 0) {
    console.log(res);
    datalist.value = res.data.records;
    total.value = res.data.total;
  } else {
    message.error("查询失败：", res.message);
  }
};

const doUpdate = (question: Question) => {
  router.push({
    path: "/question/update",
    query: {
      id: question.id,
    },
  });
};

const doDelete = async (question: Question) => {
  const res = await QuestionControllerService.deleteQuestionUsingPost({
    id: question.id,
  });
  if (res.code === 0) {
    message.success("删除成功");
    //更新数据
    getQuestionVOList();
  } else {
    message.error("删除失败：", res.message);
  }
};

/**
 * 页面加载时操作
 */
onMounted(() => {
  getQuestionVOList();
});
</script>

<style scoped>
#addQuestionView {
}
</style>
