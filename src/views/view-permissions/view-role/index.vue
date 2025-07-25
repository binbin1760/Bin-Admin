<template>
  <div class="role-list">
    <div class="data-filter">
      <n-button type="primary">新增角色</n-button>
    </div>
    <div class="role-table"></div>
  </div>
</template>

<script setup lang="ts"></script>
<style scoped lang="less">
  .role-list {
    height: 100%;
    display: flex;
    flex-direction: column;
    .role-table {
      flex: 1;
      overflow: hidden;
    }
  }
</style>
