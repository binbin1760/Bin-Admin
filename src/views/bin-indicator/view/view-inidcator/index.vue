<template>
  <div class="view-indicator">
    <n-empty
      v-if="!treeData"
      description="暂无数据"
    >
      <template #extra>
        <n-button size="small">么得数据哦</n-button>
      </template>
    </n-empty>
    <vue3-tree-org
      v-else
      :data="treeData"
      :props="treeCompontentProps"
      :horizontal="false"
      :default-expand-all="true"
      :define-menus="[]"
      :collapsable="true"
      :default-expand-level="10"
      :node-draggable="false"
      center
    >
      <template v-slot="{ node }">
        <div class="node-item-plane">
          <div
            :class="
              node?.$$data.deep
                ? 'node-name-reachabled'
                : 'node-item-unreachabled'
            "
          >
            <div style="flex: 1">{{ node?.label }}</div>
            <div class="node-name-operate">
              <span
                class="iconfont icon-chakan"
                @click="viewNodeData(node?.$$data)"
              ></span>
            </div>
          </div>
          <div class="label-value">
            <div class="label">目标值:</div>
            <div class="value">
              {{ node?.$$data.target }}{{ node?.$$data.unit }}
            </div>
          </div>
          <div class="label-value">
            <div class="label">实际完成:</div>
            <div class="value">
              {{ node?.$$data.progress ? node?.$$data.progress : '-' }}
            </div>
          </div>
          <div class="label-value">
            <div class="label">更新时间:</div>
            <div class="value">
              {{
                node?.$$data.updateTime
                  ? formatDate(node?.$$data.updateTime)
                  : '-'
              }}
            </div>
          </div>
          <div class="label-value">
            <div class="label">承接人/部门:</div>
            <div class="value">
              {{
                node?.$$data.divideInfo
                  ? node?.$$data.divideInfo.ownerName
                  : '-'
              }}
            </div>
          </div>
        </div>
      </template>
      <template v-slot:expand="{ node }">
        <div>{{ node.children.length }}</div>
      </template>
    </vue3-tree-org>
    <ViewIndicator
      v-model:show="showViewModal"
      v-model:indicator="viewData"
    />
  </div>
</template>

<script setup lang="ts">
  import { getIndicatorTree } from '@/api'
  import {
    IndicatorTree,
    indicatorInTable
  } from '@/views/bin-indicator/baseType'
  import { formatDate } from '@/unitls'
  import { ViewIndicator } from '@/views/bin-indicator/components'

  const message = useMessage()
  const route = useRoute()
  const treeData = ref<IndicatorTree>()

  const showViewModal = ref<boolean>(false)
  const viewData = ref<indicatorInTable>()
  const treeCompontentProps = {
    id: 'id',
    label: 'name',
    children: 'children',
    expand: 'expand',
    pid: 'parentId',
    depName: 'depName'
  }

  function viewNodeData(data: indicatorInTable) {
    viewData.value = data
    showViewModal.value = true
  }

  async function getTree() {
    const res = await getIndicatorTree({
      topIndicatorId: route.query.topIndicatorId as string,
      id: route.query.id as string
    })

    if (res.code === 200) {
      treeData.value = res.data[0]
    } else {
      message.error(res.message)
    }
  }
  getTree()
</script>
<style scoped lang="less">
  .view-indicator {
    height: 100%;
    .node-item-plane {
      display: flex;
      flex-direction: column;
      width: 280px;
      text-align: start;
      .label-value {
        display: flex;
        padding: 0 8px;
        gap: 4px;
        .label {
          //   width: 90px;
          //   text-align: right;
          font-weight: bold;
        }
      }
      .node-name-reachabled {
        padding: 4px;
        background-color: #55babe;
        color: #ffffff;
        border-bottom: 1px solid var(--main-border-color);
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
      .node-item-unreachabled {
        padding: 4px;
        background-color: #f0f0f0;
        color: #999999;
        border-bottom: 1px solid var(--main-border-color);
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
      .node-name-operate {
        display: flex;
        align-items: center;
        gap: 8px;
        font-size: 16px;
      }
      .node-name-operate span {
        cursor: pointer;
      }
    }
  }
</style>
