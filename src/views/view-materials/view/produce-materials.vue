<template>
  <div class="library">
    <div class="data-filter"></div>
  </div>
</template>

<script setup lang="ts"></script>
<style scoped lang="less">
  .library {
    height: 100%;
    .data-filter {
      display: flex;
      align-items: center;
      gap: calc(var(--margin-main) * 2);
    }
  }
</style>
