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
        :default-expanded-keys="[currUserDep.depId ? currUserDep.depId : '']"
        :default-selected-keys="[currUserDep.depId ? currUserDep.depId : '']"
        selectable
        expand-on-click
        :accordion="true"
        :on-update:selected-keys="treeSelectChanged"
        :on-load="hanlLoadTreeNode"
      />
    </div>
    <div class="data-table">
      <div class="btns">
        <n-button
          type="info"
          @click="addDepartment()"
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
        :request-api="getAllDepartments"
        :other-props="{ 'scroll-x': 1800 }"
        v-model:query="selectDepId"
      />
    </div>
    <!-- 新增部门模态框 -->
    <CreateOrgModal
      @refresh="refreshBaseTable"
      v-model:show="showAddModal"
    />
    <!-- 编辑抽屉 -->
    <EditOrgDraw
      @refresh="refreshBaseTable"
      v-model:show="showEditDraw"
      v-model:data="editData"
    />
    <ViewOrgDraw
      v-model:show="showViewDraw"
      v-model:data="viewData"
    />
  </div>
</template>

<script setup lang="ts">
  import { DataTableColumns, NSwitch, TreeOption } from 'naive-ui'
  import { DepartmentType } from '../baseType'
  import { Search } from '@vicons/ionicons5'
  import { CreateOrgModal, EditOrgDraw, ViewOrgDraw } from '../components'
  import {
    getAllDepartments,
    deleteDepartmentById,
    getDepartmentTree
  } from '@/api'
  import { depStaffStore } from '@/store/modules/departmentAndStaff'
  import styles from '../common.module.css'
  import { useDepartmentHook } from '../useDepartmentHook'

  const message = useMessage()
  const dialog = useDialog()
  const useDpeStaffStore = depStaffStore()
  const { depData, currUserDep, getTopDep } = useDepartmentHook()

  const baseTableRef = ref<any>(null)
  const editData = ref<DepartmentType>()
  const viewData = ref<DepartmentType>()
  const selectDepId = ref<any>({ id: currUserDep.depId })
  const params = reactive({
    depName: '',
    search: ''
  })

  const column = (): DataTableColumns<DepartmentType> => [
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
      title: '部门名称',
      align: 'center',
      key: 'name',
      width: 120,
      fixed: 'left'
    },
    {
      title: '部门编码',
      align: 'center',
      key: 'code',
      width: 120,
      fixed: 'left'
    },
    {
      title: '部门负责人',
      align: 'center',
      key: 'leader'
    },
    {
      title: '部门层级',
      align: 'center',
      key: 'level'
    },
    {
      title: '授权代理人',
      align: 'center',
      key: 'agentLeader'
    },
    {
      title: '分管领导',
      align: 'center',
      key: 'divisionLeader'
    },
    {
      title: '分布层级',
      align: 'center',
      key: 'tirLevel'
    },
    {
      title: '运营/职能',
      align: 'center',
      key: 'operationOrFunction',
      render: (row) => {
        let showData = '-'
        if (row.operationOrFunction === 1) {
          showData = '运营'
        }

        if (row.operationOrFunction === 2) {
          showData = '职能'
        }
        return h('span', {}, { default: () => showData })
      }
    },
    {
      title: '数据录入人',
      align: 'center',
      key: 'dataEntryUser'
    },
    {
      title: '是否是虚拟组织',
      align: 'center',
      key: 'isVirtualOrg',
      render: (row) => {
        let showData = '-'
        if (row.isVirtualOrg) {
          showData = '是'
        }

        if (row.isVirtualOrg) {
          showData = '否'
        }
        return h('span', {}, { default: () => showData })
      }
    },
    {
      title: '所属部门',
      key: 'parentName',
      align: 'center'
    },
    {
      title: '是否参与组织绩效考核',
      align: 'center',
      key: 'beInvolvedOrgKpi',
      render: (row) => {
        return h(NSwitch, {
          value: row.beInvolvedOrgKpi,
          onUpdateValue: () => {
            row.beInvolvedOrgKpi = !row.beInvolvedOrgKpi
          }
        })
      }
    },
    {
      title: '是否参与OKR管理',
      align: 'center',
      key: 'beInvolvedOkr',
      render: (row) => {
        return h(NSwitch, {
          value: row.beInvolvedOkr,
          onUpdateValue: () => {
            row.beInvolvedOkr = !row.beInvolvedOkr
          }
        })
      }
    },
    {
      title: '部门描述',
      align: 'center',
      key: 'description',
      fixed: 'right',
      width: 100
    },
    {
      title: '操作',
      key: '',
      align: 'center',
      fixed: 'right',
      width: 140,
      render(row) {
        const vView = h(
          'span',
          {
            class: styles['operate-edit'],
            onClick: () => {
              viewData.value = row
              showViewDraw.value = true
            }
          },
          { default: () => '查看' }
        )

        const vEdit = h(
          'span',
          {
            class: styles['operate-edit'],
            onClick: () => {
              editData.value = JSON.parse(JSON.stringify(row))
              showEditDraw.value = true
            }
          },
          { default: () => '编辑' }
        )
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
                  deleteDepartment(row.id)
                }
              })
            }
          },
          { default: () => '删除' }
        )

        return h('div', { class: styles['operate-cell'] }, [
          vEdit,
          vView,
          vDelete
        ])
      }
    }
  ]
  const showAddModal = ref<boolean>(false)
  const showEditDraw = ref<boolean>(false)
  const showViewDraw = ref<boolean>(false)
  function getDepTree() {
    console.log(params)
  }

  function filtersTable() {
    console.log(params)
  }
  //add new department
  function addDepartment() {
    showAddModal.value = true
  }

  function refreshBaseTable() {
    baseTableRef.value?.reFresh()
    getTopDep()
  }

  async function deleteDepartment(id: string) {
    const res = await deleteDepartmentById(id)
    message.info(res.message)
    if (res.code === 200) {
      refreshBaseTable()
    }
  }

  async function hanlLoadTreeNode(node: TreeOption) {
    const res = await getDepartmentTree(node.key as string)
    if (res.code === 200) {
      node.children = res.data.map((item) => ({
        label: item.name,
        key: item.id,
        isLeaf: item.isLeaf,
        nodeData: item
      }))
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
      refreshBaseTable()
    }
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
</style>
