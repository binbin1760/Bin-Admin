<template>
  <div class="tree-tabe">
    <div class="tree">
      <div class="serach-box">
        <n-input v-model:value="params.depName" />
        <n-button
          type="info"
          @click="getDepTree"
        >
          搜 索
        </n-button>
      </div>
      <n-tree
        block-line
        :data="depData"
        :default-value="defaultKey"
        :accordion="true"
        selectable
        expand-on-click
        :default-expanded-keys="[currUserDep.depId ? currUserDep.depId : '']"
        :default-selected-keys="[currUserDep.depId ? currUserDep.depId : '']"
        :on-update:selected-keys="treeSelectChanged"
        :on-load="hanlLoadTreeNode"
      />
    </div>
    <div class="data-table">
      <div class="btns">
        <n-button
          type="info"
          @click="addNewStaff"
        >
          新 增
        </n-button>
        <!-- <n-button type="info">导 出</n-button> -->
        <div class="search-box">
          <n-input
            round
            v-model:value="params.search"
          >
            <template #suffix>
              <n-icon
                :component="Search"
                style="cursor: pointer"
                @click="filtersTable"
              />
            </template>
          </n-input>
        </div>
      </div>
      <base-table
        ref="baseTableRef"
        :columns="column()"
        :request-api="getUserList"
        :query="selectDepId"
        :other-props="{ 'scroll-x': 2200 }"
        @get-table-data="getUserTableData"
      />
    </div>
    <!-- add new staff modal -->
    <CreateStaffModal
      @refresh-table="refreshData"
      v-model:show="showModal"
    />
    <!-- edit staff info -->
    <EditStaffDraw
      v-model:data="editData"
      v-model:active="showDrawe"
      @refresh="refreshData"
    />
    <!-- view staff info  -->
    <ViewStaffDraw
      v-model:active="showViewDraw"
      v-model:data="viewData"
    />
  </div>
</template>

<script setup lang="ts">
  import { DataTableColumns, TreeOption } from 'naive-ui'
  import {
    DepartmentType,
    IDENTITY_NAME,
    JOB_GRADE_NAME,
    STAFF_STATUS,
    StaffType
  } from '../baseType'
  import { Search } from '@vicons/ionicons5'
  import { CreateStaffModal, EditStaffDraw, ViewStaffDraw } from '../components'
  import { getUserList, deleteUserById, getDepartmentTree } from '@/api'
  import { depStaffStore } from '@/store/modules/departmentAndStaff'
  import { clickCopy } from '@/unitls'
  import styles from '../common.module.css'
  import { useDepartmentHook } from '../useDepartmentHook'
  import { formatTimeRange } from '@/unitls/time'

  const { depData, currUserDep } = useDepartmentHook()
  const message = useMessage()
  const dialog = useDialog()
  const useDpeStaffStore = depStaffStore()
  const baseTableRef = ref<any>()

  const params = reactive({
    depName: '',
    search: ''
  })
  const column = (): DataTableColumns<StaffType> => [
    {
      title: '序号',
      key: '',
      align: 'center',
      fixed: 'left',
      width: 60,
      render(_row, index) {
        return h('span', {}, index + 1)
      }
    },
    {
      title: '员工名称',
      align: 'center',
      key: 'name',
      width: 120,
      fixed: 'left'
    },
    {
      title: '员工工号',
      align: 'center',
      key: 'code',
      fixed: 'left',
      width: 120,
      ellipsis: {
        tooltip: true
      },
      render(_row) {
        return h(
          'span',
          {
            class: styles['dbClikCopy'],
            onDblclick: () => {
              clickCopy(
                String(_row.code),
                () => {
                  message.success(`复制${_row.code}成功`)
                },
                () => {
                  message.error(`复制${_row.code}失败`)
                }
              )
            }
          },
          { default: () => _row.code }
        )
      }
    },
    {
      title: '职位',
      align: 'center',
      key: 'position',
      width: 180
    },
    {
      title: '直接上级',
      align: 'center',
      key: 'directSuperior'
    },
    {
      title: '所属部门',
      align: 'center',
      key: 'department',
      render(row) {
        return h('span', {}, row.department)
      }
    },
    {
      title: '状态',
      align: 'center',
      key: 'status',
      render(row) {
        let key: string = ''
        if (row.status === 1) {
          key = 'STAFF_STATUS_1'
        }

        if (row.status === 2) {
          key = 'STAFF_STATUS_2'
        }

        if (row.status === 3) {
          key = 'STAFF_STATUS_3'
        }
        return h('span', {}, key ? STAFF_STATUS[key] : '-')
      }
    },
    {
      title: '职级',
      align: 'center',
      key: 'jobLevel'
    },
    {
      title: 'MP/S序列',
      align: 'center',
      key: 'jobGrade',
      render: (row) => {
        return h('span', {}, JOB_GRADE_NAME[row.jobGrade - 1])
      }
    },
    {
      title: 'M序列',
      align: 'center',
      key: 'mGrade'
    },
    {
      title: 'P序列',
      align: 'center',
      key: 'pGrade'
    },
    {
      title: 'S序列',
      align: 'center',
      key: 'sGrade'
    },
    {
      title: '一级序列',
      align: 'center',
      key: 'noeGrade'
    },
    {
      title: '二级序列',
      align: 'center',
      key: 'twoGrade'
    },
    {
      title: '身份',
      align: 'center',
      key: 'identity',
      render(row) {
        return h('span', {}, IDENTITY_NAME[row.identity - 1] || '-')
      }
    },
    {
      title: '代理时间',
      align: 'center',
      key: 'agentTime',
      width: 240,
      render(row) {
        const timeRange =
          row.agentStartTime && row.agentEndTime
            ? formatTimeRange(
                [row.agentStartTime, row.agentEndTime],
                'yyyy-MM-dd'
              )
            : []
        return h('span', {}, timeRange.length > 0 ? timeRange.join('至') : '-')
      }
    },
    {
      title: '代理人',
      align: 'center',
      key: 'agent',
      width: 120,
      fixed: 'right'
    },
    {
      title: '操作',
      align: 'center',
      width: '200px',
      fixed: 'right',
      key: '',
      render(row) {
        const vDelete = h(
          'span',
          {
            class: styles['operate-delete'],
            onClick: () => {
              dialog.warning({
                title: '危险操作',
                content: `是否确认删除${row.name}?`,
                positiveText: '确定',
                negativeText: '取消',
                onPositiveClick: () => {
                  deleteUserInfo(row.id)
                },
                onNegativeClick: () => {}
              })
            }
          },
          { default: () => '删除' }
        )
        const vView = h(
          'span',
          {
            class: styles['operate-edit'],
            onClick: () => {
              viewData.value = row
              showViewDrawer()
            }
          },
          { default: () => '查看' }
        )
        const vEdit = h(
          'span',
          {
            class: styles['operate-edit'],
            onClick: () => {
              if (row.agentStartTime && row.agentEndTime) {
                row.agentTime = [row.agentStartTime, row.agentEndTime]
              }
              editData.value = JSON.parse(JSON.stringify(row))
              showEditDraw()
            }
          },
          { default: () => '编辑' }
        )
        return h('div', { class: styles['operate-cell'] }, [
          vView,
          vEdit,
          vDelete
        ])
      }
    }
  ]
  const showModal = ref<boolean>(false)
  const showDrawe = ref<boolean>(false)
  const showViewDraw = ref<boolean>(false)
  const editData = ref<StaffType>()
  const viewData = ref<StaffType>()
  const defaultKey = ref<string>('')
  const selectDepId = ref<any>({ id: currUserDep.depId })
  function getDepTree() {
    console.log(params)
  }
  function filtersTable() {
    console.log(params)
  }
  function addNewStaff() {
    showModal.value = true
  }
  function refreshData() {
    baseTableRef.value?.reFresh()
  }
  function showEditDraw() {
    showDrawe.value = true
  }
  function showViewDrawer() {
    showViewDraw.value = true
  }
  async function deleteUserInfo(id: string) {
    const res = await deleteUserById(id)
    message.info(res.message)
    baseTableRef.value?.reFresh()
  }

  async function hanlLoadTreeNode(node: TreeOption) {
    const res = await getDepartmentTree(node.key as unknown as string)
    if (res.code === 200) {
      node.children = res.data.map((item) => {
        const { id, name } = item
        return { label: name, key: id, isLeaf: false, nodeData: item }
      })
    } else {
      node.children = []
    }
  }

  function treeSelectChanged(
    _keys: Array<string | number>,
    _option: Array<TreeOption | null>,
    _meta: { node: TreeOption | null; action: 'select' | 'unselect' }
  ) {
    if (_meta.action === 'select') {
      selectDepId.value.id = _meta.node?.key
      const nodeData = _meta.node?.nodeData as unknown as DepartmentType
      useDpeStaffStore.setCurrSelectDep({
        depId: nodeData.id,
        depName: nodeData.name,
        isLeaf: nodeData.isLeaf ? true : false,
        treeLevel: nodeData.treeLevel
      })
    }

    if (_meta.action === 'unselect') {
      selectDepId.value.id = ''
      useDpeStaffStore.reSetCurrSelectDepData()
      refreshData()
    }
  }

  function getUserTableData(data: StaffType[]) {
    useDpeStaffStore.setUserList(data)
  }
</script>
<style scoped lang="less">
  .tree-tabe {
    display: flex;
    height: 100%;
    gap: calc(var(--main-gap) * 2);
    .tree {
      width: 300px;
      height: 100%;
      flex-shrink: 0;
      .serach-box {
        display: flex;
        align-items: center;
        gap: 4px;
        margin-bottom: 8px;
      }
    }
    .data-table {
      flex: 1;
      display: flex;
      flex-direction: column;
      overflow: hidden;
      .btns {
        width: 100%;
        display: flex;
        gap: 8px;
        margin-bottom: 8px;
        .search-box {
          margin-left: auto;
        }
      }
    }
  }
</style>
