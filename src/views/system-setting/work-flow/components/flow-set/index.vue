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
                :style="
                  item.id === selectedNode?.id ? { color: '#55babe' } : ''
                "
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
  </div>
</template>

<script setup lang="ts">
  import LogicFlow from '@logicflow/core'
  import { Control, DndPanel, SelectionSelect } from '@logicflow/extension'
  import '@logicflow/core/dist/index.css'
  import '@logicflow/extension/lib/style/index.css'
  import { baseDataType } from './baseType'
  import {
    BaseWorkFlowType,
    TableWorkFLowType
  } from '@/views/system-setting/base'
  import { FormItemRule } from 'naive-ui'
  import {
    checkHasSameName,
    createWorkFlow,
    deleteFLowById,
    getAllWorkFlows,
    getFlowWorkDetailById
  } from '@/api'
  import { SearchOutlined } from '@vicons/antd'
  import { FLowSetInfo } from '@/views/system-setting/work-flow/components'
  import { workFlowStore } from '@/store/modules/workFlow'

  const message = useMessage()
  const dialog = useDialog()
  const segmented = {
    content: 'soft',
    footer: 'soft'
  } as const
  const useWorkFlow = workFlowStore()
  const selectedNode = useWorkFlow.selectedNode
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
  const flowData = ref<baseDataType>({
    nodes: [],
    edges: []
  })
  const searchFlow = ref<string>('')
  const flowList = ref<TableWorkFLowType[]>([])
  const renderList = ref<TableWorkFLowType[]>([])
  LogicFlow.use(Control)
  LogicFlow.use(DndPanel)
  LogicFlow.use(SelectionSelect)

  async function submitFlow() {
    const reslut = await createWorkFlow(flowMode.value)
    if (reslut.code === 200) {
      message.success(reslut.message)
      getFlowList()
      cancel()
    } else {
      message.error(reslut.message)
    }
    // if (flowInstance.value) {
    //   const logicflowData =
    //     flowInstance.value.getGraphData() as unknown as baseDataType
    //   flowData.value = logicflowData
    // }
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
    console.log(searchFlow.value)

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
    if (res.code === 200) {
      useWorkFlow.setSelectNode(res.data)
    }
    message.info(res.message)
  }

  function clearSelect() {
    useWorkFlow.clearSelectNode()
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
        }
      })
      if (flowInstance.value) {
      }
      flowInstance.value.render(flowData.value)
      flowInstance.value.setPatternItems([
        {
          label: '圈选',
          icon: '/src/assets/flowNode/quanxuan.png',
          className: 'quanxuan-node',
          callback: () => {
            if (flowInstance.value) {
              flowInstance.value.openSelectionSelect()
              flowInstance.value.once('selection:selected', () => {
                flowInstance.value && flowInstance.value.closeSelectionSelect()
              })
            }
          }
        },
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
          flowData.value.nodes.push(args.data)
        }
      )
    } else {
      console.error('Container #flow-contain not found')
    }
  })
  getFlowList()
</script>
<style scoped lang="less">
  .flow-set {
    height: 100%;
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
  }

  .submit-cancel {
    width: 100%;
    display: flex;
    align-items: center;
    gap: 12px;
    justify-content: end;
  }
</style>
