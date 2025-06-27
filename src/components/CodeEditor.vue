<template>
  <div id="code-editor" ref="codeEditorRef" style="min-height: 800px"></div>
  <!--  <a-button @click="fillValue">填充</a-button>-->
</template>

<script setup lang="ts">
import * as monaco from "monaco-editor";
import { onMounted, ref, toRaw, withDefaults, defineProps, watch } from "vue";

const codeEditorRef = ref();
const codeEditor = ref();
const value = ref("hello world");

onMounted(() => {
  if (!codeEditorRef.value) {
    return;
  }
  codeEditor.value = monaco.editor.create(codeEditorRef.value, {
    value: value.value,
    language: props.language,
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
    props.handleChange(toRaw(codeEditor.value).getValue());
    console.log(toRaw(codeEditor.value).getValue());
  });
});

/**
 * 定义组件属性类型
 */
interface Props {
  value: string;
  language?: string;
  handleChange: (v: string) => void;
}

/**
 * 给组件指定初始值
 */
const props = withDefaults(defineProps<Props>(), {
  value: () => "",
  language: () => "java",
  handleChange: (v: string) => {
    console.log(v);
  },
});

/**
 * 监听属性变化
 */
watch(
  () => props.language,
  () => {
    console.log(props.language);
    monaco.editor.setModelLanguage(
      toRaw(codeEditor.value).getModel(),
      props.language
    );
  }
);
</script>
<style scoped></style>
