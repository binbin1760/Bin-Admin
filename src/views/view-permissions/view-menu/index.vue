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
  const data = ref<RouteRecordRaw[]>(asyncRoutes)
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
    }
  ]
  const rowKey = (row: RouteRecordRaw) => row.path

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
</script>
<style scoped lang="less"></style>
