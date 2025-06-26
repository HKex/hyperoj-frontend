<template>
  <div id="addQuestionView">
    <h2>创建题目</h2>
    <a-form :model="form" label-align="left" @submit="handleSubmit">
      <a-form-item field="title" label="标题">
        <a-input v-model="form.title" placeholder="请输入题目名" />
      </a-form-item>
      <a-form-item field="tags" label="标签">
        <a-input-tag v-model="form.tags" placeholder="请输入标签" allow-clear />
      </a-form-item>
      <a-form-item field="content" label="内容">
        <MDEditor :value="form.content" :handle-change="onContentChange" />
      </a-form-item>
      <a-form-item field="answer" label="答案">
        <MDEditor :value="form.answer" :handle-change="onAnswerChange" />
      </a-form-item>
      <a-form-item field="judgingConfig" label="设置">
        <a-space direction="vertical">
          <a-form-item field="TL" label="时间限制">
            <a-input-number
              v-model="form.judgeConfig.timeLimit"
              placeholder="请输入时间限制"
              mode="button"
              size="large"
              style="min-width: 480px"
              min="0"
            />
          </a-form-item>
          <a-form-item field="ML" label="空间限制">
            <a-input-number
              v-model="form.judgeConfig.memoryLimit"
              placeholder="请输入空间限制"
              mode="button"
              size="large"
              style="min-width: 480px"
              min="0"
            />
          </a-form-item>
          <a-form-item field="SL" label="栈空间限制">
            <a-input-number
              v-model="form.judgeConfig.stackLimit"
              placeholder="请输入栈空间限制"
              mode="button"
              size="large"
              style="min-width: 480px"
              min="0"
            />
          </a-form-item>
        </a-space>
      </a-form-item>
      <a-form-item label="用例配置" :content-flex="false">
        <a-form-item
          v-for="(judgingCaseItem, index) of form.judgeCase"
          :field="`form.judgeCase[${index}].input`"
          :label="`判例-${index}`"
          :key="index"
          no-style="no-style"
        >
          <a-space direction="vertical" style="min-width: 480px">
            <a-form-item
              :field="`form.judgeCase[${index}].input`"
              :label="`输入用例-${index}`"
              :key="index"
            >
              <a-input
                v-model="judgingCaseItem.input"
                placeholder="请输入Input"
              />
            </a-form-item>
            <a-form-item
              :field="`form.judgeCase[${index}].output`"
              :label="`输出用例-${index}`"
              :key="index"
            >
              <a-input
                v-model="judgingCaseItem.output"
                placeholder="请输入Output"
              />
            </a-form-item>
            <a-button @click="caseDelete" status="danger">删除</a-button>
          </a-space>
        </a-form-item>
        <div style="margin-top: 32px">
          <a-button @click="caseAdd" type="outline" status="success"
            >新增测试用例
          </a-button>
        </div>
      </a-form-item>
      <div style="margin-top: 16px" />
      <a-form-item>
        <a-button type="primary" style="min-width: 200px" @click="doSubmit"
          >提交
        </a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script setup lang="ts">
import { reactive, Ref } from "vue";
import MDEditor from "@/components/MDEditor.vue";
import {
  QuestionAddRequest,
  QuestionControllerService,
} from "../../../generated";
import message from "@arco-design/web-vue/es/message";

const form = reactive<Ref<QuestionAddRequest>>({
  title: "",
  content: "",
  answer: "",
  judgeCase: [
    {
      input: "",
      output: "",
    },
  ],
  judgeConfig: {
    timeLimit: 1000,
    memoryLimit: 1000,
    stackLimit: 1000,
  },
  tags: [],
});

/**
 * 内容改变
 * @param value
 */
const onContentChange = (value: string) => {
  form.content = value;
};
const onAnswerChange = (value: string) => {
  form.answer = value;
};

/**
 * 提交
 */
const doSubmit = async () => {
  const res = await QuestionControllerService.addQuestionUsingPost(form);
  if (res.code === 0) {
    message.success("添加成功");
  } else {
    message.error("添加失败" + res.message);
  }
};

/**
 * 新增测试用例
 */
const caseAdd = () => {
  form.judgeCase.push({
    input: "",
    output: "",
  });
};

/**
 * 删除测试用例
 * @param index
 */
const caseDelete = (index: number) => {
  form.judgeCase.splice(index, 1);
};
</script>

<style scoped>
#addQuestionView {
}
</style>
