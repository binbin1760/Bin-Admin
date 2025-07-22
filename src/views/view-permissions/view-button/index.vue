<template>
  <n-data-table
    :columns="columns"
    :data="data"
    :row-key="rowKey"
    :on-update:checked-row-keys="getSelectedData"
  />
</template>

<script setup lang="ts">
  import type { DataTableColumns } from 'naive-ui'
  import { RouteRecordRaw } from 'vue-router'
  import { asyncRoutes } from '@/router/index'
  import styles from './common.module.css'
  //菜单在本地,按钮在数据库 如何做到数据融合？
  const data = ref<RouteRecordRaw[]>(asyncRoutes)

  const columns: DataTableColumns<RouteRecordRaw> = [
    {
      title: '菜单名称',
      key: 'meta.name',
      align: 'center',
      fixed: 'left',
      width: 164,
      ellipsis: {
        tooltip: true
      }
    },
    {
      title: '导航路径',
      key: 'path',
      align: 'center',
      fixed: 'left',
      width: 300,
      ellipsis: {
        tooltip: true
      }
    },
    {
      title: '菜单按钮',
      key: 'buttons',
      align: 'center'
    },
    {
      title: '操作',
      key: '',
      align: 'center',
      fixed: 'right',
      width: 128,
      render(row) {
        const add = h(
          'span',
          { class: styles['operation-cell'] },
          { default: () => '新增按钮' }
        )

        return add
      }
    }
  ]

  const rowKey = (row: RouteRecordRaw) => row.path

  function getSelectedData(
    _keys: Array<string | number>,
    _rows: object[],
    _meta: {
      row: object | undefined
      action: 'check' | 'uncheck' | 'checkAll' | 'uncheckAll'
    }
  ) {
    console.log(_keys, _rows)
  }
</script>
<style scoped lang="less"></style>
