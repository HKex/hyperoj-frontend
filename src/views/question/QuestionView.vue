<template>
  <div id="QuestionView">
    <h2>题目浏览</h2>
    <a-row :gutter="[24, 24]">
      <a-col :md="12" :xs="24">
        <a-tabs default-active-key="detail">
          <a-tab-pane key="detail" title="题目">
            <a-tag
              v-for="(tag, index) of question?.tags"
              :key="index"
              :color="getTagColor(index)"
              style="margin-bottom: 10px"
              >{{ tag }}
            </a-tag>
            <a-card v-if="question">
              <MDViewer :value="question?.content || ''" />
              <a-descriptions
                title="限制条件"
                :column="{ xs: 1, ms: 3, lg: 3 }"
              >
                <a-descriptions-item label="时间限制"
                  >{{ question.judgeConfig.timeLimit ?? 0 }} ms
                </a-descriptions-item>
                <a-descriptions-item label="空间限制"
                  >{{ question.judgeConfig.memoryLimit ?? 0 }} MB
                </a-descriptions-item>
              </a-descriptions>
            </a-card>
          </a-tab-pane>
          <a-tab-pane key="comment" title="评论">
            {{ question }}
          </a-tab-pane>
          <a-tab-pane key="answer" title="题解"> 答案无法显示。</a-tab-pane>
        </a-tabs>
      </a-col>
      <a-col :md="12" :xs="24">
        <a-card>
          <template #extra>
            <span class="label">
              <icon-code-square
                style="vertical-align: middle; margin-right: 5px"
              />
              语言:
            </span>
            <a-select
              v-model="form.language"
              style="width: 120px"
              :trigger-props="{ autoFitPopupMinWidth: true }"
            >
              <a-option value="cpp">C++</a-option>
              <a-option value="java">Java</a-option>
              <a-option value="go">Go</a-option>
            </a-select>

            <a-button type="primary" style="min-width: 200px" @click="doSubmit"
              >提交代码
            </a-button>
          </template>
          <a-divider size="0" />
          <CodeEditor
            :value="form.code as string"
            :language="form.language"
            :handle-change="changeCode"
          />
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>

<script setup lang="ts">
import { onMounted, withDefaults, defineProps, ref } from "vue";
import {
  QuestionControllerService,
  QuestionSubmitAddRequest,
  QuestionSubmitControllerService,
  QuestionVO,
} from "../../../generated";
import message from "@arco-design/web-vue/es/message";
import CodeEditor from "@/components/CodeEditor.vue";
import MDViewer from "@/components/MDViewer.vue";

const question = ref<QuestionVO>();
const form = ref<QuestionSubmitAddRequest>({
  language: "java",
  code: "",
});

/**
 * 提交代码
 */
const doSubmit = async () => {
  if (!question.value?.id) {
    return;
  }
  // console.log(form.value);
  const res = await QuestionSubmitControllerService.doQuestionSubmitUsingPost({
    ...form.value,
    questionId: question.value.id,
  });
  if (res.code === 0) {
    message.success("提交成功");
  } else {
    message.error("提交失败：", res.message);
  }
};

interface Props {
  id: string;
}

const props = withDefaults(defineProps<Props>(), {
  id: () => "",
});

/**
 * 查询题目
 */
const loadData = async () => {
  const res = await QuestionControllerService.getQuestionVoByIdUsingGet(
    props.id as any
  );
  if (res.code === 0) {
    question.value = res.data;
  } else {
    message.error("查询失败：", res.message);
  }
};

/**
 * 页面加载时操作
 */
onMounted(() => {
  loadData();
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
];

// 获取颜色的函数
const getTagColor = (index: number) => {
  const colorIndex = index % tagColors.length;
  return tagColors[colorIndex];
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
 * 代码改变
 * @param v
 */
const changeCode = (v: string) => {
  form.value.code = v;
};
</script>

<style scoped></style>
