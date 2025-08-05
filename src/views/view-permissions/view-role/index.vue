<template>
  <div class="role-list">
    <div class="data-filter">
      <n-button
        type="primary"
        @click="showAddRoleModal"
      >
        新增角色
      </n-button>
    </div>
    <div class="role-table">
      <base-table
        ref="baseTableRef"
        :columns="column()"
        :requestApi="getAllRoles"
        :query="query"
        @get-table-data="getTableData"
      />
    </div>
    <RoleAdd
      v-model:show="showAdd"
      @refresh="refreshTable"
    />
    <RoleEdit
      v-model:show="showEdit"
      v-model:data="showEditData"
      @refresh="refreshTable"
    />
    <role-view
      v-model:show="showView"
      v-model:role-id="viewRoleId"
    />
  </div>
</template>

<script setup lang="ts">
  import { DataTableColumns } from 'naive-ui'
  import { BaseRole } from '../baseType'
  import { deleteRole, getAllRoles } from '@/api'
  import { RoleAdd, RoleEdit, RoleView } from './components'
  import { formatDate } from '@/unitls'
  import styles from '../common.module.css'

  const message = useMessage()
  const dialog = useDialog()
  const baseTableRef = ref()
  const showAdd = ref<boolean>(false)
  const showEdit = ref<boolean>(false)
  const showView = ref<boolean>(false)
  const viewRoleId = ref<string>()
  const showEditData = ref<BaseRole>({
    id: '',
    name: '',
    code: '',
    description: '',
    creater: '',
    createrId: '',
    createTime: 0,
    updateTime: 0
  })
  const column = (): DataTableColumns<BaseRole> => [
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
      title: '角色名称',
      key: 'name',
      align: 'center'
    },
    {
      title: '角色编码',
      key: 'code',
      align: 'center'
    },
    {
      title: '创建人',
      key: 'creater',
      align: 'center'
    },
    {
      title: '创建时间',
      key: 'createTime',
      align: 'center',
      render(row) {
        return h(
          NTag,
          { type: 'info' },
          { default: () => formatDate(row.createTime) }
        )
      }
    },
    {
      title: '更新时间',
      key: 'updateTime',
      align: 'center',
      render(row) {
        return h(
          NTag,
          { type: 'info' },
          { default: () => formatDate(row.updateTime) }
        )
      }
    },
    {
      title: '操作',
      key: '',
      align: 'center',
      render(row) {
        const editRole = h(
          NButton,
          {
            type: 'primary',
            size: 'small',
            onClick: () => {
              const deepCloneRow = JSON.parse(JSON.stringify(row))
              showEdit.value = true
              showEditData.value = deepCloneRow
            }
          },
          {
            default: () => '编辑'
          }
        )
        const delRole = h(
          NButton,
          {
            type: 'error',
            size: 'small',
            onClick: () => {
              dialog.warning({
                title: '危险操作',
                content: '删除该角色后与其关联用户权限将失效！请慎重操作',
                positiveText: '删除',
                onPositiveClick: () => {
                  deleteRoleById(row.id)
                }
              })
            }
          },
          {
            default: () => '删除'
          }
        )
        const viewRole = h(
          NButton,
          {
            type: 'primary',
            size: 'small',
            onClick: () => {
              viewRoleId.value = row.id
              showView.value = true
            }
          },
          {
            default: () => '查看'
          }
        )
        return h('div', { class: styles['table-operate'] }, [
          viewRole,
          editRole,
          delRole
        ])
      }
    }
  ]
  const query = ref({})

  function getTableData(_data: BaseRole) {
    // console.log(_data)
  }

  function showAddRoleModal() {
    showAdd.value = true
  }

  function refreshTable() {
    baseTableRef.value?.reFresh()
  }

  async function deleteRoleById(id: string) {
    const res = await deleteRole(id)
    message.info(res.message)
    baseTableRef.value?.reFresh()
  }
</script>
<style scoped lang="less">
  .role-list {
    height: 100%;
    display: flex;
    flex-direction: column;
    .data-filter {
      margin-bottom: 12px;
    }
    .role-table {
      flex: 1;
    }
  }
</style>
