<template>
  <div class="node-set">
    <div class="data-operate">
      <div class="operate-btn-box">
        <n-button
          type="info"
          @click="showAddModal"
        >
          新 增
        </n-button>
      </div>
      <div class="operate-filter">
        <n-input
          placeholder="请输入节点名称"
          round
        >
          <template #suffix>
            <n-icon
              style="cursor: pointer"
              size="20"
            >
              <SearchOutlined />
            </n-icon>
          </template>
        </n-input>
      </div>
    </div>
    <div class="base-table">
      <n-data-table
        :columns="columns()"
        :max-height="600"
        :virtual-scroll="true"
        :data="data"
      />
    </div>
    <n-modal
      v-model:show="showModal"
      title="新增节点"
      :bordered="false"
      preset="card"
      style="max-width: 600px"
    >
      <AsyncBaseForm
        ref="baseFormRef"
        :config="formConfig"
        :model="node"
        @cancel="cancelAddNode"
        @confirm="submitAddNewNode"
      />
    </n-modal>
  </div>
</template>

<script setup lang="ts">
  import { AsyncBaseForm, AsyncBaseFormConfig } from '@/components'
  import { BaseNodeType, NodeTableType } from '@/views/system-setting/base'
  import { DataTableColumns } from 'naive-ui'
  import { SearchOutlined } from '@vicons/antd'
  import {
    getAllFlowNodes,
    addFlowNode,
    deleteFlowNodeById
  } from '@/api/workFlow'
  import { formatDate } from '@/unitls/time'
  import { workFlowStore } from '@/store/modules/workFlow'
  const useWorkFlow = workFlowStore()
  const message = useMessage()
  const dialog = useDialog()
  const node = ref<BaseNodeType>({
    name: '',
    des: ''
  })
  const formConfig = ref<Array<AsyncBaseFormConfig>>([
    {
      type: 'input',
      label: '节点名称',
      path: 'name',
      value: '',
      placeholder: '请输入节点名称',
      rule: {
        type: 'string',
        required: true,
        message: '节点名称不能为空',
        trigger: ['blur']
      },
      otherProps: {
        maxlength: 50,
        showCount: true,
        clearable: true
      }
    },
    {
      type: 'textarea',
      label: '节点描述',
      path: 'des',
      value: '',
      placeholder: '请输入节点描述',
      rule: {
        type: 'string',
        required: true,
        message: '必须描述该节点的作用以及使用条件',
        trigger: ['blur']
      },
      otherProps: {
        maxlength: 500,
        showCount: true,
        clearable: true
      }
    }
  ])
  const columns = (): DataTableColumns<NodeTableType> => [
    {
      title: '序号',
      key: '',
      align: 'center',
      width: 80,
      render: (row, index) => index + 1
    },
    {
      title: '节点名称',
      key: 'name',
      align: 'center'
    },
    {
      title: '节点描述',
      key: 'des',
      align: 'center',
      ellipsis: {
        tooltip: true
      }
    },
    {
      title: '创建时间',
      key: 'createTime',
      align: 'center',
      render: (row) => {
        return h('span', {}, { default: () => formatDate(row.createTime) })
      }
    },
    {
      title: '更新时间',
      key: 'updateTime',
      align: 'center',
      render: (row) => {
        return h('span', {}, { default: () => formatDate(row.updateTime) })
      }
    },
    {
      title: '操作',
      key: '',
      align: 'center',
      render: (row) => {
        const deletBtn = h(
          NButton,
          {
            type: 'error',
            size: 'small',
            onClick: async () => {
              dialog.error({
                title: '敏感操作',
                content: `是否删除节点${row.name}及其关联的流程`,
                positiveText: '确 认',
                negativeText: '取 消',
                onPositiveClick: async () => {
                  const res = await deleteFlowNodeById(row.id)
                  if (res.code === 200) {
                    getTableData()
                  }
                  message.info(res.message)
                }
              })
            }
          },
          { default: () => '删除' }
        )
        return h('div', {}, [deletBtn])
      }
    }
  ]
  const data = ref<Array<NodeTableType>>([])

  const baseFormRef = ref<any>()
  const showModal = ref<boolean>(false)
  function showAddModal() {
    showModal.value = true
  }

  function cancelAddNode() {
    baseFormRef.value?.reSetFormValue()
    showModal.value = false
  }

  async function submitAddNewNode(addData: BaseNodeType) {
    const result = await addFlowNode(addData)
    if (result.code === 200) {
      getTableData()
    }
    message.info(result.message)
    node.value.des = ''
    node.value.name = ''
    cancelAddNode()
  }

  async function getTableData() {
    const result = await getAllFlowNodes()
    if (result.code === 200) {
      data.value = result.data
      useWorkFlow.setAllFlowNodeList(result.data)
    } else {
      data.value = []
    }
  }
  getTableData()
</script>
<style scoped lang="less">
  .node-set {
    width: 100%;
    display: flex;
    flex-direction: column;
    margin-top: 12px;
    .data-operate {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 12px;
      .search-outlined {
        cursor: pointer;
      }
    }
  }
</style>
