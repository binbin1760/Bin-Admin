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
        :columns="column()"
        :requestApi="getUserManageList"
        :query="tableQuery"
        @get-table-data="getTableData"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
  import { DataTableColumns, NButton, NSelect, NTag } from 'naive-ui'
  import { BaseUser } from '../baseType.ts'
  import { getUserManageList } from '@/api'
  import styles from '../common.module.css'
  import { SearchOutlined } from '@vicons/antd'
  import {
    IDENTITY_NAME,
    STAFF_STATUS
  } from '@/views/view-department/baseType.ts'
  const tableQuery = ref({ depId: '' })
  const tableData = ref<BaseUser[]>([])
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
      title: '角色',
      key: 'role',
      align: 'center',
      render(row) {
        const options = [
          { label: '管理员', value: 'admin' },
          { label: '普通用户', value: 'user' },
          { label: '访客', value: 'guest' },
          { label: 'A', value: 'A' },
          { label: 'B', value: 'C' },
          { label: 'D', value: 'D' },
          { label: 'AD', value: 'CD' },
          { label: 'AX', value: 'CX' },
          { label: 'AC', value: 'CA' },
          { label: 'A4', value: 'Casd' },
          { label: 'A3', value: 'Caa' },
          { label: 'A2', value: 'Csdas' },
          { label: 'A1', value: 'Casd654564' },
          { label: 'A12', value: 'Casdaa' },
          { label: 'A123', value: 'Cxx' },
          { label: 'A123', value: 'Casdasd' },
          { label: '其他', value: 'other' }
        ]
        return h(NSelect, {
          options,
          value: row.roleId,
          resetMenuOnOptionsChange: false,
          clearable: true,
          onUpdateValue: (_value) => {
            row.roleId = _value
          },
          onScroll(e: Event) {
            const tagret = e.target as HTMLDivElement
            // 多减去1px 是为了规避小数带来的误差
            if (
              tagret.scrollHeight - tagret.scrollTop - 1 <=
              tagret.clientHeight
            ) {
              console.log('滚动到底部了')
            }
          }
        })
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
              console.log('查看用户信息', row)
              // 这里可以添加查看用户信息的逻辑
            }
          },
          {
            default: () => '角色信息'
          }
        )
        return h('div', { class: styles['table-operate'] }, [viewUser])
      }
    }
  ]
  const getTableData = (data: BaseUser[]) => {
    tableData.value = data
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
