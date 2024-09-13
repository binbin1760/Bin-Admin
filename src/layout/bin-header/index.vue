<template>
  <div class="header">
    <n-breadcrumb>
      <n-breadcrumb-item>首页</n-breadcrumb-item>
      <n-breadcrumb-item>非首页</n-breadcrumb-item>
    </n-breadcrumb>
    <div class="base-info">用户</div>
  </div>
</template>

<script setup lang="ts"></script>
<style scoped lang="less">
  .header {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: nowrap;
    box-sizing: border-box;
    background-color: var(--color-main-bg);
    padding: 8px 0;
    padding-left: var(--main-gap);
    .base-info {
      display: flex;
      align-items: center;
      flex-wrap: nowrap;
    }
  }
</style>
