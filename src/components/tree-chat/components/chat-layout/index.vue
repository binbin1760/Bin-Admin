<template>
  <div class="chat-layout">
    <div
      class="chat-layout-side"
      :style="{ width: props.width + 'px' }"
    >
      <slot name="side" />
    </div>
    <div class="chat-layout-body">
      <div class="chat-layout-header">
        <slot name="header" />
      </div>
      <div class="chat-layout-content">
        <slot />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  const props = withDefaults(
    defineProps<{
      width: number
    }>(),
    {
      width: 120
    }
  )
</script>
<style scoped lang="less">
  .chat-layout {
    height: 100%;
    width: 100%;
    display: flex;
    .chat-layout-side {
      display: flex;
      align-items: center;
      flex-direction: column;
      text-align: center;
      background-color: #f9fbff;
      margin-right: 8px;
    }
    .chat-layout-body {
      height: 100%;
      flex: 1;
      display: flex;
      flex-direction: column;
      .chat-layout-content {
        flex: 1;
        overflow-y: auto;
        overflow-x: hidden;
      }
    }
  }
</style>
