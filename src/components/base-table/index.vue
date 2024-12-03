<template>
  <div class="base-tabe">
    <div style="flex: 1">
      <n-data-table
        class="table"
        :columns="props.columns"
        :data="data"
        :bordered="true"
        flex-height
      />
    </div>
    <div class="pageination">
      <n-pagination
        v-model:page="params.page"
        :page-count="params.total"
        size="medium"
        show-quick-jumper
        show-size-picker
        @update:page="unpdatePage"
        @update:page-size="updatePageSize"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
  import type { DataTableProps } from 'naive-ui'
  import type { BaseParams } from './types'
  import { BaseResponse } from '@/unitls/request'
  /**
   * columns 表格配置
   *
   * requestApi 接口查询方法
   *
   * query 接口参数
   *
   *
   */
  interface dataTableType {
    columns: Required<DataTableProps>['columns']
    requestApi: (query: any) => Promise<BaseResponse<any>>
    query: any
  }
  const props = defineProps<dataTableType>()
  const params = reactive<BaseParams>({
    page: 1,
    pageSize: 10,
    total: 1,
    ...props.query
  })
  const data = ref()

  async function getDataTableData() {
    const result = await props.requestApi(params)
    if (result.code === 200) {
      data.value = result.data
    } else {
      data.value = []
    }
  }

  function unpdatePage(page: number) {
    params.page = page
  }

  function updatePageSize(pageSize: number) {
    params.pageSize = pageSize
  }

  watch(
    params,
    (_newVal) => {
      getDataTableData()
    },
    { immediate: true }
  )
</script>
<style scoped lang="less">
  .base-tabe {
    display: flex;
    flex-direction: column;
    gap: var(--margin-main);
    height: 100%;
    .table {
      height: 100%;
    }
    .pageination {
      display: flex;
      justify-content: flex-end;
    }
  }
</style>
