<template>
  <div class="error-list-page">
    <div class="data-filter-box">
      <div class="data-filter-selet"></div>
      <div class="data-filter-confirm"></div>
    </div>
    <div class="data-operate-search">
      <div class="operate-box"></div>
      <div class="serach"></div>
    </div>
    <div class="error-base-table">
      <base-table
        ref="baseTableRef"
        :columns="column()"
        :requestApi="getErrLogList"
        :query="query"
        @get-table-data="getTableData"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
  import { BaseTable } from '@/components'
  import { DataTableColumns, NPopover } from 'naive-ui'
  import { ErrorType } from './baseType'
  import { getErrLogList, deleteErrorlogById } from '@/api'
  import { formatDate, clickCopy } from '@/unitls'
  import styles from './common.module.css'

  const message = useMessage()
  const query = ref({})
  const baseTableRef = ref<any>()
  const column = (): DataTableColumns<ErrorType> => [
    {
      title: '序号',
      key: '',
      align: 'center',
      width: 80,
      render(_row, index) {
        return h('span', {}, index + 1)
      }
    },
    {
      title: '请求类型',
      key: 'type',
      align: 'center'
    },
    {
      title: '请求路径',
      key: 'url',
      align: 'center'
    },
    {
      title: '请求参数',
      key: 'params',
      align: 'center',
      render(row) {
        return h(
          NPopover,
          { trigger: 'hover', placement: 'top' },
          {
            trigger: () => {
              return h(
                NButton,
                { type: 'info', size: 'small' },
                { default: () => '异常参数' }
              )
            },
            default: () => {
              return h(
                'pre',
                { class: styles['view-errlog-popver-content'] },
                { default: () => row.params.replaceAll('\\n', '\n') }
              )
            },
            header: () => {
              return h(
                NButton,
                {
                  type: 'info',
                  onClick: () => {
                    clickCopy(
                      row.params,
                      () => {
                        message.success('复制参数提示成功')
                      },
                      () => {
                        message.error('复制参数提示失败')
                      }
                    )
                  }
                },
                { default: () => '复制请求参数' }
              )
            }
          }
        )
      }
    },
    {
      title: '请求人',
      key: 'name',
      align: 'center'
    },
    {
      title: '请求时间',
      key: 'occurTime',
      width: 200,
      align: 'center',
      render(row) {
        return h(
          'div',
          {},
          { default: () => (row.occurTime ? formatDate(row.occurTime) : '-') }
        )
      }
    },
    {
      title: '异常提示',
      key: 'errLog',
      align: 'center',
      render(row) {
        return h(
          NPopover,
          { trigger: 'hover', placement: 'top' },
          {
            trigger: () => {
              return h(
                NButton,
                { type: 'info', size: 'small' },
                { default: () => '查看异常提示' }
              )
            },
            default: () => {
              return h(
                'pre',
                { class: styles['view-errlog-popver-content'] },
                { default: () => row.errLog.replaceAll('\\n', '\n') }
              )
            },
            header: () => {
              return h(
                NButton,
                {
                  type: 'info',
                  onClick: () => {
                    clickCopy(
                      row.errLog,
                      () => {
                        message.success('复制异常提示成功')
                      },
                      () => {
                        message.error('复制异常提示失败')
                      }
                    )
                  }
                },
                { default: () => '复制错误提示' }
              )
            }
          }
        )
      }
    },
    {
      title: '操作',
      key: '',
      align: 'center',
      width: 150,
      render(row) {
        const deleteError = h(
          NButton,
          {
            type: 'error',
            onClick: async () => {
              const res = await deleteErrorlogById(row.id)
              message.info(res.message)
              baseTableRef.value?.reFresh()
            }
          },
          { default: () => '删除记录' }
        )
        return h('div', { class: styles['table-operate'] }, [deleteError])
      }
    }
  ]

  function getTableData(table: ErrorType[]) {
    console.log(table)
  }
</script>
<style scoped lang="less">
  .error-list-page {
    height: 100%;
    display: flex;
    flex-direction: column;
    .error-base-table {
      flex: 1;
    }
  }
</style>
