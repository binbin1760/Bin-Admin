import type { BaseTableAPI } from '@visactor/vtable/es/ts-types/base-table'
import type { TableEvents } from '@visactor/vtable/es/core/TABLE_EVENT_TYPE'
import type { ListTable, pluginsDefinition } from '@visactor/vtable'
import * as VTable from '@visactor/vtable'
import { IEditor } from '@visactor/vtable-editors'

export interface FieldRelatedCallBackArgs {
  relatedFields: string[]
  table: ListTable | null
  eventInfo: any
  eventType: string
  editor?: IEditor
}

export interface FieldRelated {
  field: string // 监听字段
  relatedFields: string[] // field关联了那些字段
  callBack: (args: FieldRelatedCallBackArgs) => void
}

interface fieldRelatedConfig {
  relatedFieldArr: Array<FieldRelated>
}
/**
 * 这个插件主要解决的问题是：
 * 1. vsheet 在fieldFormat上每次数据更新实际调用了三次，如果该方法存在递归的情况那么批量触发修改数据会出现卡断<比如自动填充>
 * 2. 这个插件旨在解决不同不同字段关联问题， 比如说 进度 =  字段A+字段B * 字段C
 * 3. 为了解决某个字段是映射在选择器上的value  而显示需要显示label这种问题，这里会引入一个 收容字段的概念即：收容字段自做展示不计入records,收容字段会以$符号进行标注
 * 比如说： userId 的收容字段 userName  会被标记成 $userName ，在每次数据提交时会剔除全部$开头的字段 =》 这里有个注意点 剔除时必须对datasource进行深拷贝
 * 4. 构建edit 与 插件的联系，直接获取每次edit的全部内容，大幅度减少不必要的渲染计算开销
 */
export class fieldRelated implements pluginsDefinition.IVTablePlugin {
  id: string = 'recordMode'
  name: string = '字段管控'
  runTime: TableEvents[keyof TableEvents][] = [
    VTable.TABLE_EVENT_TYPE.BEFORE_INIT,
    VTable.TABLE_EVENT_TYPE.CHANGE_CELL_VALUE
  ]
  eventType: string | null = null
  table: ListTable | null = null
  eventInfo: any
  relatedMap: Map<string, FieldRelated> = new Map()

  constructor(config: fieldRelatedConfig) {
    config.relatedFieldArr.forEach((item: FieldRelated) => {
      this.relatedMap.set(item.field, item)
    })
  }

  run: (...args: any) => void = (...args) => {
    this.eventType = args[1]
    this.eventInfo = args[0]
    if (this.eventType === VTable.TABLE_EVENT_TYPE.BEFORE_INIT && args[2]) {
      this.table = args[2]
      this.eventInfo.options.addRecordRule = 'Object'
      this.eventInfo.options.keyboardOptions.getCopyCellValue.value = (
        col: number,
        row: number
      ) => {
        if (this.table) {
          const record = this.table.getRecordByRowCol(col, row)
          let keyCol: number | null = null
          let targetKey: string | null = null
          this.relatedMap.forEach((_item, key) => {
            const targetCol = this.table?.getTableIndexByField(key)
            if (targetCol && col === targetCol) {
              keyCol = targetCol
              targetKey = key
            }
          })
          if (keyCol && targetKey) {
            return record[targetKey]
          } else {
            return ''
          }
        }
      }
    }

    if (
      this.eventType === VTable.TABLE_EVENT_TYPE.CHANGE_CELL_VALUE &&
      this.table &&
      this.eventInfo
    ) {
      const related = this.relatedMap.get(this.eventInfo.field)
      if (related) {
        console.log(this.eventInfo)
        const edit = this.table.getEditor(
          this.eventInfo.col,
          this.eventInfo.row
        )
        related.callBack({
          relatedFields: related.relatedFields,
          table: this.table,
          eventInfo: this.eventInfo,
          eventType: this.eventType,
          editor: edit
        })
      }
    }
  }
  update?: (() => void) | undefined = () => {
    console.log('update')
  }
  release?: ((table: BaseTableAPI) => void) | undefined

  handleCopyData(data: string) {
    //将转义序列的 \r\n 同意替换成\n  表示换行
    const normalized = data.replace(/\r\n/g, '\n').replace(/\r/g, '\n')
    const rowsArr = normalized.split('\n') //行数据数组
    const rows = rowsArr.map((item) => item.split('\t'))
    return rows
  }
}
