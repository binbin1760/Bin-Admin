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
  </div>
</template>

<script setup lang="ts">
  import * as xlxs from 'xlsx'
  import { excelTable } from '@/components'
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
</script>
<style scoped lang="less"></style>
