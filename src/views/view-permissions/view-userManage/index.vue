<template>
  <div class="user-manage">
    <div class="data-filter">
      <div class="data-filter-search">
        <n-input
          round
          placeholder="亲输入工号/姓名"
        >
          <template #suffix>
            <n-icon
              size="24"
              style="cursor: pointer"
            >
              <search-outlined />
            </n-icon>
          </template>
        </n-input>
      </div>
    </div>
    <div class="user-manage-table">
      <base-table
        ref="baseTableRef"
        :columns="column()"
        :requestApi="getUserManageList"
        :query="tableQuery"
        @get-table-data="getTableData"
      />
    </div>
    <ConifgUserRole
      v-model:show="show"
      v-model:user-id="configUserRoleId"
      @refresh="refreshTable"
    />
  </div>
</template>

<script setup lang="ts">
  import { DataTableColumns, NButton, NEllipsis, NTag } from 'naive-ui'
  import { BaseUser } from '../baseType.ts'
  import { getUserManageList } from '@/api'
  import styles from '../common.module.css'
  import { SearchOutlined } from '@vicons/antd'
  import {
    IDENTITY_NAME,
    STAFF_STATUS
  } from '@/views/view-department/baseType.ts'
  import { ConifgUserRole } from './components'

  const baseTableRef = ref()
  const tableQuery = ref({ depId: '' })
  const tableData = ref<BaseUser[]>([])
  const show = ref<boolean>(false)
  const configUserRoleId = ref<string>()
  const column = (): DataTableColumns<BaseUser> => [
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
      title: '用户名',
      key: 'name',
      align: 'center'
    },
    {
      title: '工号',
      key: 'code',
      align: 'center'
    },
    {
      title: '所属部门',
      key: 'department',
      align: 'center'
    },
    {
      title: '身份',
      key: 'identity',
      align: 'center',
      render(row) {
        return h(
          NTag,
          { type: 'info' },
          { default: () => IDENTITY_NAME[row.identity - 1] || '-' }
        )
      }
    },
    {
      title: '状态',
      key: 'status',
      align: 'center',
      render(row) {
        const STAFF_STATUS_VALUES = Object.values(STAFF_STATUS)
        return h(
          NTag,
          { type: 'info' },
          {
            default: () => STAFF_STATUS_VALUES[row.status - 1] || '-'
          }
        )
      }
    },
    {
      title: '拥有角色',
      key: 'roles',
      align: 'center',
      render(row) {
        if (row.roles && row.roles.length === 0) {
          return '-'
        } else {
          const roleStr = row.roles?.map((item) => item.name).join(',')
          return h(NEllipsis, { lineClamp: 2 }, { default: () => roleStr })
        }
      }
    },
    {
      title: '操作',
      key: '',
      align: 'center',
      render(row) {
        const viewUser = h(
          NButton,
          {
            type: 'primary',
            size: 'small',
            onClick: () => {
              show.value = true
              configUserRoleId.value = row.id
            }
          },
          {
            default: () => '分配角色'
          }
        )
        return h('div', { class: styles['table-operate'] }, [viewUser])
      }
    }
  ]
  const getTableData = (data: BaseUser[]) => {
    tableData.value = data
  }

  function refreshTable() {
    baseTableRef.value?.reFresh()
  }
</script>
<style scoped lang="less">
  .user-manage {
    display: flex;
    flex-direction: column;
    height: 100%;
    .data-filter {
      display: flex;
      align-items: center;
      justify-content: end;
      margin-bottom: 12px;
    }
    .user-manage-table {
      flex: 1;
    }
  }
</style>
