<template>
  <div class="permission-menu">
    <div class="list-operate">
      <div class="btns">
        <n-button
          type="warning"
          @click="addMenuModal"
        >
          新增菜单
        </n-button>
      </div>
      <div class="search">
        <n-input
          v-model:value="searchMenu"
          placeholder="请输入部门ID"
          clearable
          style="width: 200px"
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
    <div class="menu-table">
      <n-data-table
        :columns="columns"
        :data="data"
        :row-key="rowKey"
        :on-update:checked-row-keys="getSelectedData"
      />
    </div>
    <AddMenu v-model:show="showAddModal" />
    <EditMenu
      v-model:show="showEditModal"
      v-model:data="editMenuData"
    />
  </div>
</template>

<script setup lang="ts">
  import { NButton, type DataTableColumns } from 'naive-ui'
  import { RouteRecordRaw } from 'vue-router'
  import { asyncRoutes } from '@/router/index'
  import { SearchOutlined } from '@vicons/antd'
  import styles from '../common.module.css'
  import { AddMenu, EditMenu } from './components'
  import { BaseMenu } from '../baseType'
  const data = ref<RouteRecordRaw[]>(asyncRoutes)

  const searchMenu = ref<string>('')
  const showAddModal = ref<boolean>(false)
  const showEditModal = ref<boolean>(false)
  const editMenuData = ref<BaseMenu>()
  const rowKey = (row: RouteRecordRaw) => row.path
  const columns: DataTableColumns<RouteRecordRaw> = [
    {
      type: 'selection'
    },
    {
      title: '菜单名称',
      key: 'meta.name',
      align: 'center'
    },
    {
      title: '导航路径',
      key: 'path',
      align: 'center'
    },
    {
      title: '重定向路径',
      key: 'redirect',
      align: 'center'
    },
    {
      title: '是否为侧栏菜单',
      key: 'meta.hidden',
      align: 'center',
      render(row) {
        return h(
          'span',
          {},
          { default: () => (row.meta && row.meta.hidden ? '是' : '否') }
        )
      }
    },
    {
      title: '是否为根节点',
      key: 'meta.isRoot',
      align: 'center',
      render(row) {
        return h(
          'span',
          {},
          { default: () => (row.meta && row.meta.isRoot ? '是' : '否') }
        )
      }
    },
    {
      title: '是否需要固定TGA',
      key: 'meta.affix',
      align: 'center',
      render(row) {
        return h(
          'span',
          {},
          { default: () => (row.meta && row.meta.affix ? '需要' : '不需要') }
        )
      }
    },
    {
      title: '操作',
      key: '',
      align: 'center',
      render(row) {
        const edit = h(
          NButton,
          {
            type: 'warning',
            size: 'small',
            onClick: () => {
              const deepCloneData = JSON.parse(JSON.stringify(row))
              console.log(deepCloneData)
              showEditModal.value = true
              editMenuData.value = deepCloneData
            }
          },
          { default: () => '编辑' }
        )

        const del = h(
          NButton,
          {
            type: 'error',
            size: 'small',
            onClick: () => {
              console.log('删除', row)
            }
          },
          { default: () => '删除' }
        )

        const btns = h(
          NButton,
          { type: 'primary', size: 'small' },
          { default: () => '按钮' }
        )
        return h('div', { class: styles['table-operate'] }, [btns, edit, del])
      }
    }
  ]
  function getSelectedData(
    keys: Array<string | number>,
    rows: object[],
    meta: {
      row: object | undefined
      action: 'check' | 'uncheck' | 'checkAll' | 'uncheckAll'
    }
  ) {
    console.log(keys, rows)
  }

  function addMenuModal() {
    showAddModal.value = true
  }
</script>
<style scoped lang="less">
  .permission-menu {
    height: 100%;
    display: flex;
    flex-direction: column;
    .list-operate {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 12px;
      flex-shrink: 0;
    }
    .menu-table {
      flex: 1;
    }
  }
</style>
