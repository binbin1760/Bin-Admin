<template>
  <div class="chat-side-title">{{ props?.title }}</div>
</template>

<script setup lang="ts">
  const props = defineProps<{
    title: string
  }>()
</script>
<style scoped lang="less">
  .chat-side-title {
    width: 100%;
    max-height: 3rem;
    overflow: hidden;
    text-align: center;
    text-overflow: ellipsis;
    padding: 4px;
    cursor: pointer;
    box-sizing: border-box;
    border-radius: 2px;
    font-size: var(--fontSize-main-min);
  }
  .chat-side-title:hover {
    background-color: #55babe;
  }
</style>
