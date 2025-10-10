<template>
  <div>
    <div
      v-if="selectFlow"
      class="flow-info"
    >
      <div>
        <div>
          流程名字：
          <span class="text-underline">{{ selectFlow.name }}</span>
        </div>
        <div>
          创建人:
          <span class="text-underline">{{ selectFlow.creator }}</span>
        </div>
        <div>
          包含节点数：
          <span class="text-underline">{{ selectFlow.nodes }}</span>
          个，含有边数:
          <span class="text-underline">
            {{ selectFlow.edges }}
          </span>
          条
        </div>
      </div>
      <div class="flow-des">
        <div>流程描述：</div>
        <pre class="text-underline">{{ selectFlow.des }}</pre>
      </div>
    </div>
    <div
      v-else
      class="not-select"
    >
      <n-empty description="当前未选择流程" />
    </div>
  </div>
</template>

<script setup lang="ts">
  import { workFlowStore } from '@/store/modules/workFlow'
  import { storeToRefs } from 'pinia'
  const useWorkFlow = workFlowStore()
  const { selectFlow } = storeToRefs(useWorkFlow)
</script>
<style scoped lang="less">
  .flow-info {
    margin-top: 12px;
    display: flex;
    gap: 16px;
    .flow-des {
      display: flex;
    }
    .text-underline {
      color: #55babe;
      text-decoration: underline;
    }
  }
</style>
