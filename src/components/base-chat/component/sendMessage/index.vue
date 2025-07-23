<template>
  <div class="chat-messageBox">
    <div :class="styles['chat-messageBox-message']">{{ props?.message }}</div>
    <div
      :class="[styles['chat-messageBox-avatar'], 'iconfont', 'icon-user']"
    ></div>
  </div>
</template>

<script setup lang="ts">
  import styles from '../../chat.module.css'
  // 初始化 markdown
  const props = defineProps<{
    message: string
  }>()
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
