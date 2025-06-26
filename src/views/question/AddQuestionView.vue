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
import { onMounted, reactive, ref, Ref } from "vue";
import MDEditor from "@/components/MDEditor.vue";
import { QuestionControllerService } from "../../../generated";
import message from "@arco-design/web-vue/es/message";
import { useRoute } from "vue-router";

const form = ref({
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

const route = useRoute();
//如果路径包含update，则表示更新
const isUpdate = route.path.includes("update");
/**
 * 加载数据
 */
const loadData = async () => {
  const id = route.query.id;
  if (!id) {
    return;
  }
  const res = await QuestionControllerService.getQuestionByIdUsingGet(id);
  if (res.code === 0) {
    form.value = res.data as any;
    //json 转js对象
    if (!form.value.judgeCase) {
      form.value.judgeCase = [
        {
          input: "",
          output: "",
        },
      ];
    } else {
      form.value.judgeCase = JSON.parse(res.data.judgeCase as any);
    }
    if (!form.value.judgeConfig) {
      form.value.judgeConfig = [
        {
          timeLimit: 1000,
          memoryLimit: 1000,
          stackLimit: 1000,
        },
      ];
    } else {
      form.value.judgeConfig = JSON.parse(res.data.judgeConfig as any);
    }
    if (!form.value.tags) {
      form.value.tags = [];
    } else {
      form.value.tags = JSON.parse(res.data.tags as any);
    }
  } else {
    message.error("加载失败" + res.message);
  }
};

onMounted(() => {
  loadData();
});

/**
 * 内容改变
 * @param value
 */
const onContentChange = (value: string) => {
  form.value.content = value;
};
const onAnswerChange = (value: string) => {
  form.value.answer = value;
};

/**
 * 提交
 */
const doSubmit = async () => {
  if (isUpdate) {
    //更新
    const res = await QuestionControllerService.updateQuestionUsingPost(
      form.value
    );
    if (res.code === 0) {
      message.success("更新成功");
    } else {
      message.error("更新失败" + res.message);
    }
  } else {
    //添加
    const res = await QuestionControllerService.addQuestionUsingPost(
      form.value
    );
    if (res.code === 0) {
      message.success("添加成功");
    } else {
      message.error("添加失败" + res.message);
    }
  }
};

/**
 * 新增测试用例
 */
const caseAdd = () => {
  form.value.judgeCase.push({
    input: "",
    output: "",
  });
};

/**
 * 删除测试用例
 * @param index
 */
const caseDelete = (index: number) => {
  form.value.judgeCase.splice(index, 1);
};
</script>

<style scoped>
#addQuestionView {
}
</style>
