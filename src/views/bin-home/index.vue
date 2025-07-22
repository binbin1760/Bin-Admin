<template>
  <div>
    <div>尝试读取excel</div>
    <input
      ref="excelRef"
      type="file"
      accept=".xlsx"
    />
    <n-button @click="readExcel">读取EXCEL</n-button>
    <div>在线excel</div>
    <div id="excel-online">
      <excelTable :work-book="sheets" />
    </div>
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
  import * as xlxs from 'xlsx'
  import { excelTable, examTemplateTable } from '@/components'
  import { combineTables } from '@/components/exam-template-table/base'
  const excelRef = ref<HTMLInputElement | null>(null)
  const sheets = ref<any>()
  const readExcel = () => {
    const newfileReder = new FileReader()
    newfileReder.onload = (e) => {
      const workbook = xlxs.read(e.target?.result, {
        type: 'binary',
        cellStyles: true
      })
      sheets.value = workbook
      const Sheet = workbook.Sheets[workbook.SheetNames[0]]
      console.log(workbook)
      //表格数据范围   可以利用这个数据绘制表格
      console.log(Sheet['A1'].s)
    }
    newfileReder.readAsArrayBuffer(excelRef.value?.files?.[0] as Blob)
  }
  // 测试模板配置表格
  const tables = ref<combineTables>([
    {
      columns: [
        {
          title: '姓名',
          key: 'name',
          align: 'center',
          children: [
            {
              title: '姓氏',
              key: 'firstName',
              align: 'center'
            },
            {
              title: '名字',
              key: 'lastName',
              align: 'center'
            }
          ]
        },
        {
          title: '地址',
          key: 'address',
          align: 'center'
        },
        {
          title: '商品',
          key: 'goods',
          align: 'center',
          children: [
            {
              title: '待售',
              key: 'onSale',
              align: 'center',
              children: [
                {
                  title: '已上架',
                  key: 'list',
                  align: 'center'
                },
                {
                  title: '待上架',
                  key: 'unList',
                  align: 'center'
                }
              ]
            },
            {
              title: '已售',
              key: 'saled',
              align: 'center'
            }
          ]
        }
      ]
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
              align: 'center'
            },
            {
              title: '服务',
              key: 'service',
              align: 'center'
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
