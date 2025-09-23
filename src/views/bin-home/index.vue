<template>
  <div>
    <div>测试模板配置表格：</div>
    <div>
      <examTemplateTable
        v-model:combine-tables="tables"
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
              children: [
                {
                  title: '姓氏-1',
                  key: 'firstName1',
                  align: 'center',
                  width: 100,
                  isChildren: true,
                  fixed: 'left',
                  render: (data) => {
                    return h(
                      NTag,
                      { type: 'info' },
                      { default: () => data.firstName1 }
                    )
                  }
                },
                {
                  title: '姓氏-2',
                  key: 'firstName2',
                  align: 'center',
                  width: 100,
                  fixed: 'left',
                  isChildren: true
                }
              ]
            },
            {
              title: '名字',
              key: 'lastName',
              align: 'center',
              fixed: 'left',
              width: 100,
              isChildren: true
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
              title: '已售',
              key: 'saled',
              align: 'center',
              width: 100,
              fixed: 'right'
            },
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
            }
          ]
        }
      ],
      headerTitle: {
        title: '第一部分'
      },
      summary: {
        columns: [
          {
            colspan: 8,
            data: '合计1'
          },
          {
            colspan: 1,
            data: 50
          }
        ]
      },
      scorllX: 1600,
      childrenKey: 'children',
      draggable: true
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
              align: 'center',
              isChildren: true
            },
            {
              title: '好评',
              key: 'goodFeedback',
              align: 'center',
              isChildren: true
            }
          ]
        }
      ],
      headerTitle: {
        render: () =>
          h(
            NTag,
            { type: 'success' },
            { default: () => '测试childreKey自动合并模式' }
          )
      },
      childrenKey: 'children'
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
      address: '测试G1',
      list: 10,
      unList: 5,
      saled: 20,
      'test-colimn-1': '拉克斯基大领口设计的拉萨看得见拉克斯基',
      'test-colimn-2': '阿拉山口大家阿拉山口大家拉克丝记录',
      children: [
        {
          firstName1: '33',
          firstName2: '44',
          lastName: '三'
        },
        {
          firstName1: '张',
          firstName2: '杨',
          lastName: '三'
        },
        {
          firstName1: '云龙',
          firstName2: '火焰獠牙',
          lastName: '威龙'
        }
      ]
    },
    {
      address: '啊大苏打',
      list: 105,
      unList: 51,
      saled: 203,
      'test-colimn-1': '阿拉山口大家阿喀琉斯就',
      'test-colimn-2': 'alskdjalskjlaskjd',
      children: [
        {
          firstName1: '起',
          firstName2: '飞',
          lastName: '三'
        },
        {
          firstName1: '张',
          firstName2: '杨',
          lastName: '三'
        }
      ]
    }
  ])
  const secondTable = ref([
    {
      userName: '甲方A',
      children: [
        {
          badFeedback: '无',
          goodFeedback: '很棒'
        },
        {
          badFeedback: '有',
          goodFeedback: '不是很好'
        }
      ]
    }
  ])
  const thirdTable = ref([
    {
      salesSummary: '叮叮叮',
      product: '产品质量好',
      service: '服务态度好',
      productOptimization: '增加新功能',
      serviceOptimization: '提高响应速度'
    },
    {
      salesSummary: '当当当当',
      product: '产品质量好',
      service: '服务态度好',
      productOptimization: '增加新功能',
      serviceOptimization: '提高响应速度'
    }
  ])
</script>
<style scoped lang="less"></style>
