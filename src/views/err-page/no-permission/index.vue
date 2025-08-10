<template>
  <div class="err-403">
    <n-result
      status="403"
      title="403 禁止访问"
      description="总有些门是对你关闭的"
    >
      <template #footer>
        <n-button>权限不足</n-button>
      </template>
    </n-result>
  </div>
</template>

<script setup lang="ts"></script>
<style scoped lang="less">
  .err-403 {
    height: 100%;
    padding-top: 120px;
    display: flex;
    justify-content: center;
  }
</style>
