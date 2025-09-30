<template>
  <div class="work-flow">
    <n-tabs
      type="line"
      style="height: 100%"
    >
      <n-tab-pane
        name="1"
        tab="节点设置"
        style="height: 100%"
      >
        <NodeSet />
      </n-tab-pane>
      <n-tab-pane
        name="2"
        tab="流程配置"
        display-directive="if"
        style="height: 100%"
      >
        <FLowSet />
      </n-tab-pane>
    </n-tabs>
  </div>
</template>

<script setup lang="ts">
  import { NodeSet, FLowSet } from './components'
</script>
<style scoped lang="less">
  .work-flow {
    height: 100%;
  }
</style>
