<template>
  <div>
    <div
      v-if="getSelectedNode"
      class="flow-info"
    >
      <div>
        <div>
          流程名字：
          <span class="text-underline">{{ getSelectedNode.name }}</span>
        </div>
        <div>
          创建人:
          <span class="text-underline">{{ getSelectedNode.creator }}</span>
        </div>
        <div>
          包含节点：
          <span class="text-underline">{{ getSelectedNode.nodes }}</span>
          ，含有边:
          <span class="text-underline">
            {{ getSelectedNode.edges }}
          </span>
        </div>
      </div>
      <div class="flow-des">
        <div>流程描述：</div>
        <pre class="text-underline">{{ getSelectedNode.des }}</pre>
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
  const { getSelectedNode } = storeToRefs(useWorkFlow)
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
