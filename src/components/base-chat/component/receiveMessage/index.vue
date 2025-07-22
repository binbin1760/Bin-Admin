<template>
  <div class="chat-messageBox">
    <div
      :class="[styles['chat-messageBox-avatar'], 'iconfont', 'icon-ai-avatar']"
    ></div>
    <div
      v-if="props?.message"
      v-html="html"
      :class="styles['chat-messageBox-message']"
    ></div>
    <n-spin
      v-else
      size="small"
    />
  </div>
</template>

<script setup lang="ts">
  import MarkDownIt from 'markdown-it'
  import 'highlight.js/styles/atom-one-dark.css'
  import markdownItHighlightjs from 'markdown-it-highlightjs'
  import markdownItCodeCopy from 'markdown-it-code-copy'
  import styles from '../../chat.module.css'
  import { NSpin } from 'naive-ui'
  // 初始化 markdown
  const md = new MarkDownIt({})
  md.use(markdownItHighlightjs)
  md.use(markdownItCodeCopy, {
    buttonClass: 'copy-code-button ',
    element:
      "<span style='font-size:14px' class='copy-code-button'>复制</span>",
    onSuccess: (code: string) => {
      console.log('复制成功', code)
    },
    onError: () => {
      console.log('复制失败')
    }
  })
  const props = defineProps<{
    message: string
  }>()

  const html = ref<string>('')

  watch(
    () => props.message,
    (newVal) => {
      html.value = md.render(newVal)
    },
    { immediate: true }
  )
</script>
<style scoped lang="less">
  .chat-messageBox {
    border-radius: 2px;
    padding: 2px;
    display: flex;
    align-items: start;
    gap: 12px;
    box-sizing: content-box;
    margin-top: 16px;
    padding: 12px;
  }
</style>
