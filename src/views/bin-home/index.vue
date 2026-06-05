<template>
  <div class="home">
    <div class="tool-list">
      <div
        class="operate-list"
        v-show="operateShow"
      >
        {{ operateTips }}
      </div>
      <n-button type="primary">保存</n-button>
    </div>
    <div
      id="sheet_contain"
      @keydown="keyDownForSave"
    ></div>
  </div>
</template>

<script setup lang="ts">
  import * as VTableSheet from '@visactor/vtable-sheet'
  import { cascaderEditor } from './customEditor/cascader'
  import * as VTable from '@visactor/vtable'
  import * as VTablePlugins from '@visactor/vtable-plugins'
  import { updateSheetData, getPorjectList } from '@/api/excelOnline'
  import {
    fieldRelated,
    clickRightMenu,
    FieldRelatedCallBackArgs
  } from './plugins'
  import { insertRowCol, colorSet } from './component'
  import { ListTable } from '@visactor/vtable'

  const typeCascader = new cascaderEditor({
    options: [
      {
        label: '类型1',
        value: 'type1',
        children: [
          {
            label: '类型1-1',
            value: 'type1-1'
          },
          {
            label: '类型1-2',
            value: 'type1-2',
            children: [
              {
                label: '类型1-2-1',
                value: 'type1-2-1'
              },
              {
                label: '类型1-2-2',
                value: 'type1-2-2'
              }
            ]
          }
        ]
      },
      {
        label: '类型2',
        value: 'type2'
      },
      {
        label: '类型3',
        value: 'type3'
      }
    ]
  })

  VTableSheet.VTable.register.editor('cascader', typeCascader)

  const tableInstance = ref<VTableSheet.VTableSheet | null>()
  const operateTips = ref<string>()
  const operateShow = ref(false)

  const hideCol = new Map<string, any>()

  onMounted(async () => {
    const res = await getPorjectList({ page: 1, pageSize: 50 })
    const container = document.getElementById('sheet_contain')
    const options: any = {
      showFormulaBar: true,
      showSheetTab: true,
      defaultRowHeight: 34, // 默认行高
      sheets: [
        {
          sheetKey: 'multiHeaderSheet',
          sheetTitle: '多级表头示例',
          columns: [
            {
              title: '预算表',
              columns: [
                {
                  title: '计划编码',
                  field: 'planningCode',
                  width: 120
                },
                {
                  title: '采购类别',
                  field: 'type',
                  width: 120,
                  editor: 'cascader',
                  fieldFormat: (data: any) => {
                    const typeMap: Record<string, string> = {
                      'type1-1': '类型1-1',
                      'type1-2': '类型1-2',
                      'type1-2-1': '类型1-2-1',
                      'type1-2-2': '类型1-2-2',
                      type2: '类型2',
                      type3: '类型3'
                    }
                    return typeMap[data.type] || data.type
                  }
                },
                {
                  title: '责任人',
                  field: 'personChargeName'
                },
                {
                  title: '采购名称',
                  field: 'procurementName',
                  width: 120
                },
                {
                  title: '采购进度',
                  field: 'completeRate',
                  width: 250,
                  cellType: 'progressbar',
                  style: {
                    barColor: 'red',
                    barHeight: 24,
                    barBottom: 4,
                    textAlign: 'right'
                  },
                  fieldFormat: (data: any) => {
                    return data.completeRate ? data.completeRate + '%' : ''
                  }
                },

                {
                  title: '对外价格（不含税）',
                  field: 'totalExternalPrice',
                  width: 200
                },
                {
                  title: '投标成本总价(不含税)',
                  field: 'totalBidCost',
                  width: 220
                },
                {
                  title: '指导价/限价(不含税))',
                  field: 'priceLimit',
                  width: 240
                },
                {
                  title: '采购需求计划完成时间',
                  columns: [
                    {
                      title: '计划完成时间',
                      field: 'demandPlanningTime',
                      width: 150
                    },
                    {
                      title: '实际完成时间',
                      field: 'demandActualTime',
                      width: 150
                    }
                  ]
                },
                {
                  title: '采购谈判计划完成时间',
                  columns: [
                    {
                      title: '计划完成时间',
                      field: 'comparisonPlanningTime',
                      width: 150
                    },
                    {
                      title: '实际完成时间',
                      field: 'comparisonActualTime',
                      width: 150
                    }
                  ]
                },
                {
                  title: '合同签订计划完成时间',
                  columns: [
                    {
                      title: '计划完成时间',
                      field: 'contractPlanningTime',
                      width: 150
                    },
                    {
                      title: '实际完成时间',
                      field: 'contractActualTime',
                      width: 150
                    }
                  ]
                },
                {
                  title: '签订合同金额（不含税）',
                  field: 'contractNoTaxAmount',
                  width: 220
                },
                {
                  title: '签订合同金额（含税）',
                  field: 'contractTaxAmount',
                  width: 220
                },
                {
                  title: '成本偏差',
                  columns: [
                    {
                      title: '对外(不含税)',
                      field: 'actualTotalExternalPrice',
                      width: 140
                    },
                    {
                      title: '投标(不含税)',
                      field: 'actualTotalBidCost',
                      width: 140
                    },
                    {
                      title: '指导价/限价(不含税)',
                      field: 'actualPriceLimit',
                      width: 200
                    }
                  ]
                },
                {
                  title: '盈亏率',
                  field: 'lossRate',
                  width: 120,
                  fieldFormat: (data) => {
                    return data.lossRate + '%'
                  }
                },
                {
                  title: '合同编号',
                  field: 'contractNum',
                  width: 120
                },
                {
                  title: '预计进场时间(劳务类)',
                  field: 'approachTime',
                  width: 240
                },
                {
                  title: '预计交期(材料类)',
                  field: 'deliveryTime',
                  width: 160
                },
                {
                  title: '采购订单金额(材料类)',
                  field: 'orderAmount',
                  width: 200
                },
                {
                  title: '到货入库金额(材料类)',
                  field: 'inboundAmount',
                  width: 200
                },
                {
                  title: '对账金额(材料类)',
                  field: 'materialAmount',
                  width: 160
                },
                {
                  title: '领料金额(劳务类)',
                  field: 'collectingMaterialsAmount',
                  width: 160
                },
                {
                  title: '产值金额(劳务类)',
                  field: 'labourOutputValueAmount',
                  width: 160
                },
                {
                  title: '已付金额',
                  field: 'paidAmount',
                  width: 120
                },
                {
                  title: '备注',
                  field: 'description',
                  width: 120
                }
              ]
            }
          ],
          data: res.data,
          active: true,
          addRecordRule: 'Object'
        }
      ],
      VTablePluginModules: [
        {
          module: VTablePlugins.ContextMenuPlugin,
          disabled: true
        },
        {
          module: clickRightMenu,
          moduleOptions: {
            menuOptions: [
              {
                label: '复制',
                key: 'copy_target',
                click: (table: ListTable) => {
                  table.eventManager.handleCopy(new KeyboardEvent('copy'))
                }
              },
              {
                label: '剪切',
                key: 'cut_target',
                click: (table: ListTable) => {
                  table.eventManager.handleCut(new KeyboardEvent('cut'))
                }
              },
              {
                label: '粘贴',
                key: 'paste_target',
                click: (table: ListTable) => {
                  table.eventManager.handlePaste(new KeyboardEvent('paste'))
                }
              },
              {
                label: '隐藏列',
                key: 'hide_target',
                click: (
                  table: ListTable,
                  eventType: string | null,
                  eventInfo: any
                ) => {
                  console.log(eventType, eventInfo)
                  if (
                    eventType === VTable.TABLE_EVENT_TYPE.CONTEXTMENU_CELL &&
                    eventInfo.cellLocation === 'columnHeader'
                  ) {
                    const col = eventInfo.col
                    table.setColWidth(col, 5)
                  }
                }
              },
              {
                label: '冻结到本行',
                key: 'freezen_to_row',
                click: (table: ListTable) => {
                  const ranges = table.getSelectedCellRanges()
                  if (ranges && ranges.length === 1) {
                    const { start } = ranges[0]
                    table.frozenRowCount = start.row + 1
                  }
                }
              },
              {
                label: '冻结到本列',
                key: 'freezen_to_col',
                click: (table: ListTable) => {
                  const ranges = table.getSelectedCellRanges()
                  if (ranges && ranges.length === 1) {
                    const { start } = ranges[0]
                    table.frozenColCount = start.col + 1
                  }
                }
              },
              {
                label: '冻结到本列本列',
                key: 'freezen_to_col_row',
                click: (table: ListTable) => {
                  const ranges = table.getSelectedCellRanges()
                  if (ranges && ranges.length === 1) {
                    const { start } = ranges[0]
                    table.frozenColCount = start.col + 1
                    table.frozenRowCount = start.row + 1
                  }
                }
              },
              {
                label: '取消冻结',
                key: 'un_freezen',
                click: (table: ListTable) => {
                  table.frozenRowCount = 0
                  table.frozenColCount = 0
                }
              },
              {
                label: h(insertRowCol, {
                  type: 'insert_row_above',
                  num: 1
                }),
                key: 'insert_row_above',
                click: (
                  table: ListTable | null,
                  eventType: string | null,
                  eventInfo: any,
                  componentVal?: any
                ) => {
                  if (eventType === VTable.TABLE_EVENT_TYPE.CONTEXTMENU_CELL) {
                    const { row } = eventInfo
                    const valsArr = Array.from({ length: componentVal }).map(
                      () => {
                        return {}
                      }
                    )
                    if (row >= 3) {
                      table?.addRecords?.(valsArr, row - 3)
                    }
                  }
                }
              },
              {
                label: h(insertRowCol, {
                  type: 'insert_row_down',
                  num: 1
                }),
                key: 'insert_row_above',
                click: (
                  table: ListTable | null,
                  eventType: string | null,
                  eventInfo: any,
                  componentVal?: any
                ) => {
                  if (eventType === VTable.TABLE_EVENT_TYPE.CONTEXTMENU_CELL) {
                    const { row } = eventInfo
                    const valsArr = Array.from({ length: componentVal }).map(
                      () => {
                        return {}
                      }
                    )
                    if (row >= 3) {
                      table?.addRecords?.(valsArr, row - 2)
                    }
                  }
                }
              }
            ],
            container
          }
        },
        {
          module: fieldRelated,
          moduleOptions: {
            // plugin的配置项
            relatedFieldArr: [
              {
                field: 'type',
                relatedFields: ['personChargeName'],
                callBack: (args: FieldRelatedCallBackArgs) => {
                  const tableInstance = args.table
                  const index = args.eventInfo.recordIndex
                  tableInstance?.changeCellValue
                  if (tableInstance) {
                    const record = tableInstance.records[index]
                    args.relatedFields.map((item) => {
                      record[item] = item
                    })
                    tableInstance.updateRecords([record], [index], false)
                  }
                }
              }
            ]
          }
        }
      ]
    }
    if (container) {
      tableInstance.value = new VTableSheet.VTableSheet(container, options)
    }
  })

  async function keyDownForSave(e: KeyboardEvent) {
    if ((e.ctrlKey || e.metaKey) && e.key === 's') {
      e.preventDefault()
      if (tableInstance.value) {
        const activeSheet = tableInstance.value.getActiveSheet()
        const data = activeSheet?.getData() as unknown as Array<
          Record<string, any>
        >
        updateSheetData(data.filter((item) => item))
        // const res = await updateSheetData(data)
        // console.log(res)
      }
    }
  }
</script>
<style scoped lang="less">
  .home {
    height: 100%;
    display: flex;
    flex-direction: column;
  }
  .tool-list {
    height: 30px;
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 4px;
    margin-bottom: 4px;
  }
  #sheet_contain {
    height: 100%;
    border-top: 1px solid #ccc;
    border-bottom: 1px solid #ccc;
    flex: 1;
  }
</style>
