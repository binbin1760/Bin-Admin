<template>
  <div
    ref="flowSetRef"
    class="flow-set"
  >
    <div class="operate-box">
      <n-button
        type="info"
        @click="showNewFlowModal"
      >
        创建流程
      </n-button>
      <n-button
        type="info"
        @click="clearSelect"
      >
        清除
      </n-button>
    </div>
    <FLowSetInfo />
    <div class="flow-plane-list">
      <div id="flow-contain"></div>
      <div class="flow-list">
        <div class="search">
          <n-input
            v-model:value="searchFlow"
            placeholder="请输入流程名称"
            round
            @blur="searchFLowInList"
          >
            <template #suffix>
              <n-icon>
                <SearchOutlined />
              </n-icon>
            </template>
          </n-input>
        </div>
        <div class="list">
          <n-infinite-scroll
            style="height: 400px"
            :distance="8"
          >
            <div
              class="flow-item"
              v-for="(item, index) in renderList"
              :key="index"
            >
              <div
                :style="item.id === selectFlow?.id ? { color: '#55babe' } : ''"
                class="flow-name"
                @click="selectEditToEdit(item)"
              >
                <n-ellipsis style="max-width: 180px">
                  {{ item.name }}
                </n-ellipsis>
              </div>
              <div>
                <n-button
                  size="small"
                  type="info"
                >
                  编辑
                </n-button>
                <n-button
                  size="small"
                  type="warning"
                  style="margin-left: 8px"
                  @click="deleteFLowInList(item)"
                >
                  删除
                </n-button>
              </div>
            </div>
          </n-infinite-scroll>
        </div>
      </div>
    </div>

    <n-modal
      v-model:show="showAddFlowModal"
      class="custom-card"
      preset="card"
      :style="{ width: '600px' }"
      title="创建流程"
      size="huge"
      :bordered="false"
      :segmented="segmented"
      :on-after-leave="cancel"
    >
      <n-form
        :rules="rules"
        :model="flowMode"
      >
        <n-form-item
          label="姓名"
          path="name"
        >
          <n-input
            v-model:value="flowMode.name"
            placeholder="请输入流程名称"
            show-count
            :maxlength="50"
            :loading="flowNameLoading"
          />
        </n-form-item>
        <n-form-item
          label="姓名"
          path="des"
        >
          <n-input
            type="textarea"
            v-model:value="flowMode.des"
            placeholder="流程描述"
            show-count
            :maxlength="500"
            :rows="10"
          />
        </n-form-item>
      </n-form>
      <template #footer>
        <div class="submit-cancel">
          <n-button
            type="default"
            @click="cancel"
          >
            取 消
          </n-button>
          <n-button
            type="info"
            @click="submitFlow"
          >
            提 交
          </n-button>
        </div>
      </template>
    </n-modal>

    <SetFlowNodeRelation
      v-model:show="showAddRelationDraw"
      :node="addLogicFLowNode"
      @cancel="flowNodeRelationDrawCancel"
      @confirm="flowNodeRelationAfterSubmit"
    />

    <div
      ref="rightMenuRef"
      class="right-menu"
    >
      <div
        v-for="(item, index) in rightMenuConfig"
        :key="index"
        @click="item.clickEvent"
        class="menu-item"
      >
        {{ item.label }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import LogicFlow from '@logicflow/core'
  import { Control, DndPanel, SelectionSelect } from '@logicflow/extension'
  import '@logicflow/core/dist/index.css'
  import '@logicflow/extension/lib/style/index.css'
  import {
    BaseWorkFlowType,
    EidtRelationXY,
    RightMenuItmeConfig,
    TableWorkFLowType
  } from '@/views/system-setting/base'
  import { FormItemRule } from 'naive-ui'
  import {
    checkHasSameName,
    createWorkFlow,
    deleteFLowById,
    deleteFlowNodeRelationById,
    getAllWorkFlows,
    getFlowWorkDetailById,
    updateFlowNodeRelationXy
  } from '@/api'
  import { SearchOutlined } from '@vicons/antd'
  import {
    FLowSetInfo,
    SetFlowNodeRelation
  } from '@/views/system-setting/work-flow/components'
  import { workFlowStore } from '@/store/modules/workFlow'

  const message = useMessage()
  const dialog = useDialog()
  const segmented = {
    content: 'soft',
    footer: 'soft'
  } as const
  const useWorkFlow = workFlowStore()
  const { selectFlow, GetlogicFlowData } = storeToRefs(useWorkFlow)
  const showAddFlowModal = ref<boolean>(false)
  const flowMode = ref<BaseWorkFlowType>({
    name: '',
    des: ''
  })
  const flowNameLoading = ref<boolean>(false)
  const rules = {
    name: {
      required: true,
      trigger: 'blur',
      validator: (_rule: FormItemRule, value: string) => {
        return new Promise<void>(async (resolve, reject) => {
          flowNameLoading.value = true
          if (value) {
            try {
              const result = await checkHasSameName(value)
              flowNameLoading.value = false
              if (result.code === 200 && result.data) {
                reject(new Error('流程名称已存在'))
              }

              if (result.code !== 200) {
                reject(new Error('流程名称验证异常'))
              }

              if (result.code === 200 && !result.data) {
                resolve()
              }
            } catch {
              flowNameLoading.value = false
              reject(new Error('流程名称验证异常'))
            }
          } else {
            flowNameLoading.value = false
            reject(new Error('流程名称不能为空'))
          }
        })
      }
    },
    des: {
      required: true,
      trigger: 'blur',
      message: '流程描述不能为空'
    }
  }
  const flowInstance = ref<LogicFlow>()
  const searchFlow = ref<string>('')
  const flowList = ref<TableWorkFLowType[]>([])
  const renderList = ref<TableWorkFLowType[]>([])
  LogicFlow.use(Control)
  LogicFlow.use(DndPanel)
  LogicFlow.use(SelectionSelect)

  const showAddRelationDraw = ref<boolean>(false)
  const addLogicFLowNode = ref<LogicFlow.NodeConfig>()

  const rightMenuRef = ref<HTMLElement | null>()
  const rightMenuConfig = ref<RightMenuItmeConfig[]>([
    {
      label: '编 辑',
      clickEvent: () => {
        if (rightMenuRef.value && flowInstance.value) {
          const currNode = flowInstance.value.getSelectElements()
          console.log(currNode)
          rightMenuRef.value.style.display = 'none'
        }
      }
    },
    {
      label: '删 除',
      clickEvent: async () => {
        if (rightMenuRef.value && flowInstance.value) {
          const currNode = flowInstance.value.getSelectElements()
          const res = await deleteFlowNodeRelationById(currNode.nodes[0].id)
          if (res.code === 200) {
            flowInstance.value.deleteNode(currNode.nodes[0].id)
          }
          message.info(res.message)
          rightMenuRef.value.style.display = 'none'
        }
      }
    }
  ])

  async function submitFlow() {
    const reslut = await createWorkFlow(flowMode.value)
    if (reslut.code === 200) {
      message.success(reslut.message)
      getFlowList()
      cancel()
    } else {
      message.error(reslut.message)
    }
  }

  function showNewFlowModal() {
    showAddFlowModal.value = true
  }

  function cancel() {
    showAddFlowModal.value = false
    flowMode.value.des = ''
    flowMode.value.name = ''
  }

  async function getFlowList() {
    const res = await getAllWorkFlows()
    if (res.code === 200) {
      flowList.value = res.data
      renderList.value = flowList.value
    }
  }

  function searchFLowInList() {
    renderList.value = flowList.value.filter((item) =>
      item.name.includes(searchFlow.value ?? '')
    )
  }

  async function deleteFLowInList(flow: TableWorkFLowType) {
    dialog.warning({
      title: '危险操作',
      content: `是否删除：${flow.name}，删除后该流程后相关的事件将会全部停止！`,
      negativeText: '取 消',
      positiveText: '确 认',
      onPositiveClick: async () => {
        const res = await deleteFLowById(flow.id)
        if (res.code === 200) {
          getFlowList()
          clearSelect()
        }
        message.info(res.message)
      }
    })
  }

  async function selectEditToEdit(flow: TableWorkFLowType) {
    const res = await getFlowWorkDetailById(flow.id)
    if (res.code === 200 && flowInstance.value) {
      useWorkFlow.setSelectNode(res.data)
      useWorkFlow.setFlowNodeList(res.data.flowNode)
      useWorkFlow.setNodeRelationEdge(res.data.edge)
      useWorkFlow.setNodeRelations(res.data.node)
      useWorkFlow.transformToLogicFlowNodes(res.data.node)
      flowInstance.value.clearData()
      flowInstance.value.render(GetlogicFlowData.value)
    }
    message.info(res.message)
  }

  async function refreshRender() {
    if (selectFlow.value && flowInstance.value) {
      const res = await getFlowWorkDetailById(selectFlow.value.id)
      if (res.code === 200) {
        useWorkFlow.setSelectNode(res.data)
        useWorkFlow.setFlowNodeList(res.data.flowNode)
        useWorkFlow.setNodeRelationEdge(res.data.edge)
        useWorkFlow.setNodeRelations(res.data.node)
        useWorkFlow.transformToLogicFlowNodes(res.data.node)
        flowInstance.value.clearData()
        flowInstance.value.render(GetlogicFlowData.value)
      }
    }
  }

  function clearSelect() {
    if (flowInstance.value) {
      flowInstance.value.clearData()
      useWorkFlow.clearGraphData()
      useWorkFlow.clearSelectNode()
    }
  }

  function flowNodeRelationDrawCancel() {
    showAddRelationDraw.value = false
    refreshRender()
  }

  function flowNodeRelationAfterSubmit() {
    refreshRender()
  }

  async function updateNodePosition(data: EidtRelationXY) {
    const res = await updateFlowNodeRelationXy(data)
    if (res.code) {
      refreshRender()
    }
  }
  onMounted(() => {
    const container = document.querySelector('#flow-contain')
    // const tabContainer = document.querySelector('.flow-set')
    const width = container?.clientWidth
    // const tabHeight = tabContainer?.clientHeight
    if (container) {
      flowInstance.value = new LogicFlow({
        container: container as HTMLElement,
        stopScrollGraph: true,
        stopZoomGraph: true,
        width: width,
        height: 500,
        grid: {
          type: 'dot',
          size: 20
        },
        edgeType: 'bezier',
        keyboard: {
          enabled: true
        },
        isSilentMode: selectFlow.value ? false : true,
        nodeTextEdit: false
      })
      if (flowInstance.value) {
      }
      flowInstance.value.clearData()
      flowInstance.value.render(GetlogicFlowData.value)
      flowInstance.value.setPatternItems([
        // {
        //   label: '圈选',
        //   icon: '/src/assets/flowNode/quanxuan.png',
        //   className: 'quanxuan-node',
        //   callback: () => {
        //     if (flowInstance.value) {
        //       flowInstance.value.openSelectionSelect()
        //       flowInstance.value.once('selection:selected', () => {
        //         flowInstance.value && flowInstance.value.closeSelectionSelect()
        //       })
        //       console.log(flowInstance.value.getGraphData())
        //     }
        //   }
        // },
        {
          type: 'circle',
          label: '开始节点',
          icon: '/src/assets/flowNode/yuanxing.png',
          className: 'yuanxing-node',
          text: '开始节点'
        },
        {
          type: 'rect',
          label: '自定义节点',
          icon: '/src/assets/flowNode/juxing.png',
          className: 'juxing-node',
          text: '自定义节点'
        },
        {
          type: 'diamond',
          label: '条件节点',
          icon: '/src/assets/flowNode/lingxing.png',
          className: 'lingxing-node',
          text: '条件节点'
        },
        {
          type: 'circle',
          label: '结束节点',
          icon: '/src/assets/flowNode/yuanxing.png',
          className: 'yuanxing-node',
          text: '结束节点'
        }
      ])
      //节点相关事件
      flowInstance.value.on(
        'node:dnd-add',
        (args: { data: LogicFlow.NodeConfig }) => {
          addLogicFLowNode.value = args.data
          showAddRelationDraw.value = true
          GetlogicFlowData.value.nodes.push(args.data)
        }
      )
      //节点拖动更新数据
      flowInstance.value.on(
        'node:drop',
        (args: { data: LogicFlow.NodeConfig }) => {
          if (args.data.id) {
            updateNodePosition({
              id: args.data.id,
              x: args.data.x,
              y: args.data.y
            })
          }
        }
      )
      //有键菜单
      flowInstance.value.on('node:contextmenu', (args: { e: MouseEvent }) => {
        if (rightMenuRef.value) {
          rightMenuRef.value.style.display = 'block'
          rightMenuRef.value.style.top = args.e.clientY + 2 + 'px'
          rightMenuRef.value.style.left = args.e.clientX + 2 + 'px'
        }
      })
      //节点属性变化
      flowInstance.value.on('blank:click', () => {
        if (rightMenuRef.value) {
          rightMenuRef.value.style.display = 'none'
        }
      })
    } else {
      console.error('Container #flow-contain not found')
    }
  })
  getFlowList()
  watch(
    () => selectFlow.value,
    (newVal) => {
      if (newVal) {
        if (flowInstance.value) {
          flowInstance.value.updateEditConfig({
            isSilentMode: false
          })
        }
      } else {
        if (flowInstance.value) {
          flowInstance.value.updateEditConfig({
            isSilentMode: true
          })
        }
      }
    },
    { immediate: true }
  )
  onUnmounted(() => {
    if (flowInstance.value) {
      flowInstance.value.destroy()
    }
  })
</script>
<style scoped lang="less">
  .flow-set {
    height: 100%;
    position: relative;
    .flow-plane-list {
      display: flex;
      align-items: center;
      margin-top: 12px;
      .flow-list {
        width: 300px;
        border: 1px solid #55babe;
        flex-shrink: 0;
        height: 500px;
        .search {
          margin-top: 4px;
        }
        .flow-item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-top: 4px;
        }
        .flow-name {
          cursor: pointer;
        }
        .list {
          padding: 4px;
        }
      }
      #flow-contain {
        flex: 1;
        border: 1px solid #55babe;
      }
    }
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
    .operate-box {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .right-menu {
      position: fixed;
      width: 60px;
      border-radius: 4px;
      border: 1px solid #e0e0e0;
      background-color: #ffffff;
      display: none;
    }
    .right-menu .menu-item {
      width: 100%;
      text-align: center;
      cursor: pointer;
      padding: 4px 0;
    }
    .right-menu .menu-item:nth-child(1) {
      color: #55babe;
      border-bottom: 1px solid #e0e0e0;
    }
    .right-menu .menu-item:nth-child(2) {
      color: red;
    }
    .right-menu .menu-item:hover {
      color: #ffffff;
      background-color: #55babe;
    }
  }

  .submit-cancel {
    width: 100%;
    display: flex;
    align-items: center;
    gap: 12px;
    justify-content: end;
  }
</style>
