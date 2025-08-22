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
              <n-popover trigger="hover">
                <template #trigger>
                  <span class="iconfont icon-jian"></span>
                </template>
                <template #header>
                  <div
                    style="text-align: center; color: red; font-weight: bold"
                  >
                    删除节点
                  </div>
                </template>
                <div style="display: flex; align-items: center; gap: 8px">
                  <n-button
                    type="info"
                    @click="deleteNodeIndicatorInTree(node.$$data, true)"
                  >
                    保留子节点
                  </n-button>
                  <n-button
                    type="warning"
                    @click="deleteNodeIndicatorInTree(node.$$data, false)"
                  >
                    不保留子节点
                  </n-button>
                </div>
              </n-popover>

              <span
                class="iconfont icon-xinzeng"
                @click="showDivide(node.$$data)"
              ></span>
              <span
                class="iconfont icon-icon_519"
                @click="showEdit(node.$$data)"
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

    <DivideIndicator
      v-bind:indicator="divideIndicator"
      v-model:show="showDivideModal"
      @refresh="refresh"
    />

    <EditIndicator
      v-model:show="editModal"
      v-model:indicator="editIndicator"
      @refresh="refresh"
    />
  </div>
</template>

<script setup lang="ts">
  import { deleteNodeInTree, getIndicatorTree } from '@/api'
  import {
    BaseIndicator,
    DeleteNodeParams,
    IndicatorTree,
    indicatorInTable
  } from '@/views/bin-indicator/baseType'
  import { formatDate } from '@/unitls'
  import {
    DivideIndicator,
    EditIndicator
  } from '@/views/bin-indicator/components'

  const message = useMessage()
  const dialog = useDialog()
  const route = useRoute()
  const treeData = ref<IndicatorTree>()
  const showDivideModal = ref<boolean>(false)
  const divideIndicator = ref<BaseIndicator>()
  const editModal = ref<boolean>(false)
  const editIndicator = ref<indicatorInTable>()
  const treeCompontentProps = {
    id: 'id',
    label: 'name',
    children: 'children',
    expand: 'expand',
    pid: 'parentId',
    depName: 'depName'
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

  function showDivide(data: BaseIndicator) {
    divideIndicator.value = JSON.parse(JSON.stringify(data))
    showDivideModal.value = true
  }

  function refresh() {
    getTree()
  }

  function showEdit(data: indicatorInTable) {
    editIndicator.value = data
    editModal.value = true
  }

  async function deleteNodeIndicatorInTree(
    data: IndicatorTree,
    isKeepChild: boolean
  ) {
    const allChildrenIds = getNodeALlChildrenIds(data.children)
    const childrenIds = data.children.map((item) => item.id)
    const params: DeleteNodeParams = {
      isKeepChild,
      allChildrenIds: isKeepChild ? [] : allChildrenIds,
      childrenIds: isKeepChild ? childrenIds : [],
      id: data.id,
      parentId: data.parentId,
      deep: data.deep
    }

    dialog.warning({
      title: '敏感操作',
      content: isKeepChild
        ? '删除当前节点后，当前节点的父节点会继承当前节点的子节点'
        : '删除当前节点及其子节点',
      positiveText: '确 认',
      negativeText: '取 消',
      onPositiveClick: async () => {
        const res = await deleteNodeInTree(params)
        if (res.code === 200) {
          message.success(res.message)
          getTree()
        } else {
          message.error(res.message)
        }
      }
    })
  }

  function getNodeALlChildrenIds(data: IndicatorTree[]): Array<string> {
    const ids: Array<string> = []
    const stack: IndicatorTree[] = []

    if (data.length > 0) {
      stack.push(...data.slice().reverse())
    }

    while (stack.length > 0) {
      const node = stack.pop()

      if (node && node.id) {
        ids.push(node.id)
      }
      if (node?.children && node.children.length > 0) {
        node.children.forEach((item) => {
          stack.push(item)
        })
      }
    }

    return ids
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
