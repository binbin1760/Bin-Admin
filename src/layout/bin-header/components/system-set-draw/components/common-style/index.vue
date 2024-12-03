<template>
  <n-collapse-item title="公共样式">
    <div class="collapse-transition-main"></div>
  </n-collapse-item>
</template>

<script setup lang="ts">
  //
</script>
<style scoped lang="less">
  .title {
    color: var(--color-font);
    font-size: var(--fontSize-main-max);
    cursor: pointer;
  }
  .collapse-transition-main {
    .setting {
      margin-top: calc(var(--main-gap) * 3);
    }
  }
</style>
