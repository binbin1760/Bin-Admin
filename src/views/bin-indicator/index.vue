<template>
  <div class="company-indicator-list">
    <div class="page-data-filter">
      <div class="filter-item">
        <div class="label">部门：</div>
        <div class="value">
          <n-tree-select
            v-model:value="depKey"
            ref="nreeSelectRef"
            :options="[initDepData]"
            :multiple="false"
            clearable
            :on-load="getDepSelectData"
            @update-value="depSelectUpdateVal"
          />
        </div>
      </div>
      <div class="filter-item">
        <div class="label">维度：</div>
        <div class="value">
          <n-select
            v-model:value="params.dimension"
            :options="dimensionOptions"
            clearable
            :multiple="false"
          />
        </div>
      </div>
      <div class="filter-item">
        <div class="label">创建年份：</div>
        <div class="value">
          <n-date-picker
            v-model:value="params.executeTime"
            clearable
            type="year"
          />
        </div>
      </div>
      <div class="bnt-list">
        <n-button
          type="default"
          @click="dataFilterReset"
        >
          重 置
        </n-button>
        <n-button
          type="info"
          @click="dataFilterConfirm"
        >
          确 认
        </n-button>
      </div>
    </div>
    <div class="opertae-list">
      <div class="operate-btn-list">
        <n-button
          type="info"
          @click="showIndicatorAddModal"
        >
          创建指标
        </n-button>
        <n-button type="info">导 出</n-button>
      </div>
      <div class="operate-search">
        <n-input
          round
          v-model:value="params.search"
        >
          <template #suffix>
            <n-icon
              :component="Search"
              style="cursor: pointer"
            />
          </template>
        </n-input>
      </div>
    </div>
    <div class="data-table">
      <base-table
        ref="baseTableRef"
        :columns="column()"
        :request-api="getAllIndicator"
        v-model:query="query"
        :other-props="{ 'scroll-x': 2500 }"
      />
    </div>
    <AddIndicator
      v-model:show="showAddModal"
      @refresh="refreshTable"
    />

    <ViewIndicator
      v-model:show="showViewModal"
      v-model:indicator="viewData"
    />

    <EditIndicator
      v-model:show="showEditModal"
      v-model:indicator="editData"
    />
  </div>
</template>

<script setup lang="ts">
  import { DataTableColumns, SelectOption, TreeSelectOption } from 'naive-ui'
  import { DIMENSION_FIELDS, indicatorInTable } from './baseType'
  import { Search } from '@vicons/ionicons5'
  import { getAllIndicator, deleteInidcatorByTopIndicatorId } from '@/api'
  import styles from './common.module.css'
  import { AddIndicator, ViewIndicator, EditIndicator } from './components'
  import { formatDate } from '@/unitls'

  const nreeSelectRef = ref<null>()
  const dialog = useDialog()
  const message = useMessage()
  const router = useRouter()
  const { initDepData, getDepChildNdoeData } = useUserAndDepSelectHook()
  const depKey = ref<string>()
  const params = ref<any>({
    depId: null,
    dimension: null,
    executeTime: null
  })

  const dimensionOptions = ref<Array<SelectOption>>([])
  dimensionOptions.value = DIMENSION_FIELDS.map((item, index) => {
    return { label: item, value: index }
  })

  const baseTableRef = ref<any>()
  const query = ref<any>({})
  const showAddModal = ref<boolean>(false)
  const showViewModal = ref<boolean>(false)
  const viewData = ref<indicatorInTable>()
  const showEditModal = ref<boolean>(false)
  const editData = ref<indicatorInTable>()

  const column = (): DataTableColumns<indicatorInTable> => [
    {
      title: '序号',
      key: '',
      width: 60,
      align: 'center',
      fixed: 'left',
      render(_row, index) {
        return index + 1
      }
    },
    {
      title: '指标名称',
      key: 'name',
      width: 150,
      fixed: 'left',
      ellipsis: {
        tooltip: true
      },
      align: 'center'
    },
    {
      title: '目标',
      key: 'target',
      align: 'center'
    },
    {
      title: '单位',
      key: 'unit',
      align: 'center'
    },
    {
      title: '考核方式',
      key: 'examWay',
      align: 'center'
    },
    {
      title: '维度',
      key: 'dismension',
      width: 100,
      align: 'center',
      render(row) {
        return h(
          'span',
          {},
          { default: () => DIMENSION_FIELDS[row.dismension] }
        )
      }
    },
    {
      title: '继承指标',
      key: 'isUndertake',
      width: 120,
      render(row) {
        return row.isUndertake ? '是' : '否'
      }
    },
    {
      title: '年度',
      key: 'executeTime',
      width: 80,
      align: 'center',
      render(row) {
        return formatDate(row.executeTime, 'yyyy')
      }
    },
    {
      title: '所属部门',
      key: 'depName',
      width: 240,
      ellipsis: {
        tooltip: true
      },
      align: 'center'
    },
    {
      title: '指标描述',
      key: 'des',
      align: 'center',
      ellipsis: {
        tooltip: true
      },
      width: 600
    },
    {
      title: '创建人',
      key: 'creator',
      align: 'center',
      width: 100
    },
    {
      title: '创建时间',
      key: 'createTime',
      width: 120,
      ellipsis: {
        tooltip: true
      },
      align: 'center',
      render(row) {
        return row.createTime
          ? formatDate(row.createTime, 'yyyy-MM-dd HH:mm:ss')
          : '-'
      }
    },
    {
      title: '得分',
      key: 'socre',
      align: 'center',
      width: 60,
      fixed: 'right'
    },
    {
      title: '操作',
      key: '',
      width: 360,
      fixed: 'right',
      align: 'center',
      render(row) {
        const viewTree = h(
          NButton,
          {
            type: 'info',
            size: 'small',
            onClick: () => {
              router.push({
                path: '/indicator/view/indicatorTree',
                query: { topIndicatorId: row.topIndicatorId, id: row.id }
              })
            }
          },
          { default: () => '查看指标树' }
        )

        const view = h(
          NButton,
          {
            type: 'info',
            size: 'small',
            onClick: () => {
              showViewModal.value = true
              viewData.value = row
            }
          },
          { default: () => '查看' }
        )

        const edit = h(
          NButton,
          {
            type: 'info',
            size: 'small',
            onClick: () => {
              showEditModal.value = true
              editData.value = JSON.parse(JSON.stringify(row))
            }
          },
          { default: () => '编辑' }
        )

        const divide = h(
          NButton,
          {
            type: 'info',
            size: 'small',
            onClick: () => {
              router.push({
                path: '/indicator/divide/indicatorInfo',
                query: { topIndicatorId: row.topIndicatorId, id: row.id }
              })
            }
          },
          { default: () => '分解' }
        )

        const del = h(
          NButton,
          {
            type: 'error',
            size: 'small',
            onClick: () => {
              dialog.warning({
                title: '提示',
                content: '是否删除该指标及其分解指标?',
                positiveText: '确认',
                negativeText: '取消',
                onPositiveClick: async () => {
                  const res = await deleteInidcatorByTopIndicatorId(row.id)
                  if (res.code === 200) {
                    message.success(res.message)
                  } else {
                    message.error(res.message)
                  }
                  refreshTable()
                }
              })
            }
          },
          { default: () => '删除' }
        )

        return h('div', { class: styles['operate-cell'] }, [
          viewTree,
          view,
          edit,
          divide,
          del
        ])
      }
    }
  ]
  async function getDepSelectData(node: TreeSelectOption) {
    const res = await getDepChildNdoeData(node.key as unknown as string)
    node.children = res as unknown as TreeSelectOption[]
  }

  function depSelectUpdateVal(
    value: number | null,
    _formattedValue: string | null
  ) {
    params.value.depId = value
  }

  function dataFilterConfirm() {
    console.log(params.value)
  }

  function dataFilterReset() {
    depKey.value = ''
    params.value = {
      depId: null,
      dimension: null,
      executeTime: null
    }
  }

  function refreshTable() {
    baseTableRef.value?.reFresh()
  }

  function showIndicatorAddModal() {
    showAddModal.value = true
  }
</script>
<style scoped lang="less">
  .company-indicator-list {
    height: 100%;
    display: flex;
    flex-direction: column;
    .page-data-filter {
      width: 100%;
      display: flex;
      align-items: center;
      gap: 12px;
      .filter-item {
        display: flex;
        align-items: center;
        gap: 4px;
        .label {
          width: auto;
        }
        .value {
          width: 200px;
        }
      }
      .bnt-list {
        margin-left: auto;
        display: flex;
        gap: 8px;
      }
    }
    .opertae-list {
      margin-top: 12px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .operate-btn-list {
        flex: 1;
        display: flex;
        align-items: center;
        gap: 8px;
      }
      .operate-search {
        width: 240px;
      }
    }
    .data-table {
      flex: 1;
      overflow: hidden;
      margin-top: 10px;
    }
  }
</style>
