<template>
  <div id="code-editor" ref="codeEditorRef" style="min-height: 400px"></div>
  {{ value }}
  <!--  <a-button @click="fillValue">填充</a-button>-->
</template>

<script setup lang="ts">
import * as monaco from "monaco-editor";
import { onMounted, ref, toRaw, withDefaults, defineProps } from "vue";

const codeEditorRef = ref();
const codeEditor = ref();
const value = ref("hello world");

const fillValue = () => {
  if (!codeEditor.value) {
    return;
  }
  toRaw(codeEditor.value).setValue("new val");
};

onMounted(() => {
  if (!codeEditorRef.value) {
    return;
  }
  codeEditor.value = monaco.editor.create(codeEditorRef.value, {
    value: value.value,
    language: "java",
    automaticLayout: true,
    readOnly: false,
    minimap: {
      enabled: true,
    },
    theme: "vs-dark",
    // lineNumbers: "off",
  });

  // 监听内容改变
  codeEditor.value.onDidChangeModelContent(() => {
    console.log(toRaw(codeEditor.value).getValue());
  });
});

/**
 * 定义组件属性类型
 */
interface Props {
  value: string;
  handleChange: (v: string) => void;
}

/**
 * 给组件指定初始值
 */
const props = withDefaults(defineProps<Props>(), {
  value: () => "",
  handleChange: (v: string) => {
    console.log(v);
  },
});
</script>
<style scoped></style>
