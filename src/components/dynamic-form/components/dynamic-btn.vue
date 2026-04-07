<template>
  <div class="btn-list">
    <n-button
      v-for="(item, index) in props?.list"
      :key="index"
      :type="item.type"
      @click="item.onClick"
    >
      {{ item.text }}
    </n-button>
  </div>
</template>

<script setup lang="ts">
  import { BtnConfig } from '../props'
  const props = defineProps<{
    list: Array<BtnConfig>
  }>()
</script>
<style scoped lang="less">
  .btn-list {
    display: flex;
    gap: 12px;
  }
</style>
