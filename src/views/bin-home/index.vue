<template>
  <div>
    <div>测试模板配置表格：</div>
    <div>
      <examTemplateTable
        :combine-tables="tables"
        :data="[data, secondTable, thirdTable]"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
  import { examTemplateTable } from '@/components'
  import { combineTables } from '@/components/exam-template-table/base'
  // 测试模板配置表格
  const tables = ref<combineTables>([
    {
      columns: [
        {
          title: '姓名',
          key: 'name',
          align: 'center',
          titleRowspan: 1,
          fixed: 'left',
          width: 300,
          children: [
            {
              title: '姓氏',
              key: 'firstName',
              align: 'center',
              width: 200,
              fixed: 'left',
              render(row) {
                return h(
                  NButton,
                  { type: 'info' },
                  { default: () => row.firstName }
                )
              }
            },
            {
              title: '名字',
              key: 'lastName',
              align: 'center',
              fixed: 'left',
              width: 100
            }
          ]
        },
        {
          title: '地址',
          key: 'address',
          align: 'center'
        },
        {
          title: '测试列1',
          key: 'test-colimn-1',
          align: 'center'
        },
        {
          title: '测试列1',
          key: 'test-colimn-2',
          align: 'center'
        },
        {
          title: '商品',
          key: 'goods',
          align: 'center',
          fixed: 'right',
          width: 300,
          children: [
            {
              title: '待售',
              key: 'onSale',
              align: 'center',
              fixed: 'right',
              width: 200,
              children: [
                {
                  title: '已上架',
                  key: 'list',
                  align: 'center',
                  width: 100,
                  fixed: 'right'
                },
                {
                  title: '待上架',
                  key: 'unList',
                  align: 'center',
                  width: 100,
                  fixed: 'right'
                }
              ]
            },
            {
              title: '已售',
              key: 'saled',
              align: 'center',
              width: 100,
              fixed: 'right'
            }
          ]
        }
      ],
      scorllX: 1800
    },
    {
      columns: [
        {
          title: '客户名称',
          key: 'userName',
          align: 'center'
        },
        {
          title: '点评',
          key: 'feedback',
          align: 'center',
          children: [
            {
              title: '差评',
              key: 'badFeedback',
              align: 'center'
            },
            {
              title: '好评',
              key: 'goodFeedback',
              align: 'center'
            }
          ]
        }
      ]
    },
    {
      columns: [
        {
          title: '销售总结',
          key: 'salesSummary',
          align: 'center'
        },
        {
          title: '做得好的地方',
          key: 'goodPlaces',
          align: 'center',
          children: [
            {
              title: '产品',
              key: 'product',
              align: 'center',
              width: 100
            },
            {
              title: '服务',
              key: 'service',
              align: 'center',
              width: 150
            }
          ]
        },
        {
          title: '优化点',
          key: 'optimizationPoints',
          align: 'center',
          children: [
            {
              title: '产品优化',
              key: 'productOptimization',
              align: 'center'
            },
            {
              title: '服务优化',
              key: 'serviceOptimization',
              align: 'center'
            }
          ]
        }
      ]
    }
  ])
  //测试模板数据
  const data = ref([
    {
      firstName: '张',
      lastName: '三',
      address: '北京市海淀区',
      list: 10,
      unList: 5,
      saled: 20
    },
    {
      firstName: '李',
      lastName: '四',
      address: '上海市浦东新区',
      list: 15,
      unList: 3,
      saled: 30
    }
  ])
  const secondTable = ref([
    {
      userName: '甲方A',
      badFeedback: '无',
      goodFeedback: '很棒'
    },
    {
      userName: '可盖',
      badFeedback: '有待改进',
      goodFeedback: '还不错'
    },
    {
      userName: '米儿',
      badFeedback: '无',
      goodFeedback: '优秀'
    },
    {
      userName: '林克',
      badFeedback: '没有锅盖，我还怎么林克时间',
      goodFeedback: '无'
    }
  ])

  const thirdTable = ref([
    {
      salesSummary: '销售额增长',
      product: '产品质量好',
      service: '服务态度好',
      productOptimization: '增加新功能',
      serviceOptimization: '提高响应速度'
    },
    {
      salesSummary: '销售额增长',
      product: '产品质量好',
      service: '服务态度好',
      productOptimization: '增加新功能',
      serviceOptimization: '提高响应速度'
    }
  ])
</script>
<style scoped lang="less"></style>
