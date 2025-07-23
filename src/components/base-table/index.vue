<template>
  <div class="base-tabe">
    <div style="flex: 1">
      <n-data-table
        class="table"
        :columns="props.columns"
        :data="data"
        :render-cell="renderCell"
        :bordered="false"
        :single-line="false"
        flex-height
        v-bind="{ ...props?.otherProps }"
      />
    </div>
    <div class="pageination">
      <div>
        共计
        <span class="data-total">{{ pageination.total }}</span>
        条
      </div>
      <n-pagination
        v-model:page="pageination.page"
        :page-count="pageination.total / pageination.pageSize"
        :page-size="pageination.pageSize"
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
  import type { DataTableProps, DataTableBaseColumn } from 'naive-ui'
  import type { BaseParams } from './types'
  import { BaseResponse, Pagination } from '@/unitls/request'
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
    otherProps?: any
  }
  const emit = defineEmits(['getTableData'])
  const query = defineModel('query', { type: Object as PropType<any> })
  const props = defineProps<dataTableType>()

  let pageination = ref<Pagination>({
    page: 1,
    pageSize: 20,
    total: 0
  })
  let params = reactive<BaseParams>({
    page: pageination.value.page,
    pageSize: pageination.value.pageSize,
    others: query
  })

  const data = ref()
  async function getDataTableData() {
    const { page, pageSize, others } = params
    const result = await props.requestApi({ page, pageSize, ...others })
    if (result.code === 200) {
      data.value = result.data
      pageination.value = result.pagination as unknown as Pagination
    } else {
      data.value = []
    }
    emit('getTableData', data.value)
  }

  function unpdatePage(page: number) {
    pageination.value.page = page
  }

  function updatePageSize(pageSize: number) {
    pageination.value.pageSize = pageSize
  }
  //刷新表格， isCurr 为true时，重置分页
  function reFresh(isCurr: boolean = false) {
    if (isCurr) {
      pageination.value.page = 1
      pageination.value.pageSize = 20
      pageination.value.total = 0
    }
    getDataTableData()
  }

  //render cell
  function renderCell(value: any, _row: object, column: DataTableBaseColumn) {
    if (value) {
      return value
    } else {
      return '-'
    }
  }
  defineExpose({
    reFresh
  })
  watchEffect(() => {
    getDataTableData()
  })
</script>
<style scoped lang="less">
  .base-tabe {
    display: flex;
    flex-direction: column;
    gap: var(--margin-main);
    height: 100%;
    border: 1px solid rgba(239, 239, 245, 1);
    .table {
      height: 100%;
    }
    .pageination {
      display: flex;
      gap: var(--margin-main);
      justify-content: flex-end;
      align-items: center;
      .data-total {
        color: var(--main-color);
      }
    }
  }
</style>
