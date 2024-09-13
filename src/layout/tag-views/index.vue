<template>
  <n-scrollbar x-scrollable>
    <div class="tab-views">
      <div class="fix-tags">
        <div
          class="tag-view"
          v-for="(item, index) in noDraggList"
          :key="index"
        >
          {{ item.name }}
        </div>
      </div>
      <VueDraggable
        v-model="draggList"
        filter=".fix"
        class="tag-views"
      >
        <div
          class="tag-view"
          v-for="(item, index) in draggList"
          :key="index"
        >
          {{ item.name }}
        </div>
      </VueDraggable>
    </div>
  </n-scrollbar>
</template>

<script setup lang="ts">
  import { VueDraggable } from 'vue-draggable-plus'
  const draggList = ref([
    { name: '其他页面', id: 'xaxx', fix: false },
    { name: '其他页面2', id: 'xass', fix: false }
  ])
  const noDraggList = ref([{ name: '首页', id: 'xxx', fix: true }])
</script>
<style scoped lang="less">
  .tab-views {
    display: flex;
    align-items: center;
    gap: 4px;
    background-color: var(--color-main-bg);
    .fix-tags {
      margin-left: var(--main-gap);
    }
    .tag-views {
      width: 100%;
      display: flex;
      align-items: center;
      gap: var(--main-gap);
      flex-wrap: nowrap;
      margin-top: 8px;
      padding-bottom: 8px;
    }
    .tag-view {
      padding: 4px;
      background-color: var(--color-header-bg);
      font-size: 12px;
      border-radius: 2px;
      cursor: pointer;
      white-space: nowrap;
    }
  }
</style>
