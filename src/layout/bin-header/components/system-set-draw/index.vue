<template>
  <div class="style-set-list">
    <n-collapse>
      <CommnStyle />
      <SideMenuStyle />
      <DropDownStyle />
      <InputStyle />
    </n-collapse>
  </div>
</template>

<script setup lang="ts">
  import {
    CommnStyle,
    SideMenuStyle,
    DropDownStyle,
    InputStyle
  } from './components'
  const showDraw = defineModel('showDraw', { type: Boolean })
  // 按钮 侧栏菜单  面包屑  表格.....
</script>
<style scoped lang="less">
  .style-set-list {
    display: flex;
    align-items: left;
    flex-direction: column;
    gap: calc(var(--main-gap) * 3);
  }
</style>
