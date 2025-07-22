import { defineComponent, PropType, ref, toRefs, watchEffect } from 'vue'
import * as XLSX from 'xlsx'
import styles from './excelTable.module.css'

/***
 * excecl解析步骤
 * 1. 利用！ref计算表格
 * 2. ！merges 计算表格合并信息
 * 3. !cols可以获取列的样式信息
 * 4. !rows可以获取行的样式信息
 * 5. 填充内容
 * 6. 生成表格
 *
 * 细节补充：
 * 1.单元格的合并信息，并不是计算出一个单元格如何合并的，而是通过merges信息计算出哪些单元格是合并的，这些合并的单元格就不需要渲染了
 * 2.单元格的样式信息，通过s属性获取，s属性是一个对象，里面包含了单元格的样式信息
 *
 *
 * 后端数据模型：
 * 1.需要一个配置项，用来配置生成表格
 * 2.生成表格的配置要能支撑后端数据模型
 * 3.导入excel生成表格要生成一份对应的表格配置，用于储存在后端
 *
 * 由后端数据模型第三点可知：需要做一个模板生成器，用于生成表格配置
 *
 *
 * 配置模型：
 * group[]  表格分组  一个组可以看作一个独立的表格
 * groupItem :{ cols ,rows }  cols 列配置 ,rows 相当于data
 * col：{
 *  name,key,width,render,align
 * }
 */
class analysisExcel {
  wokrBook: any
  constructor(wokrBook: any) {
    this.wokrBook = wokrBook
  }
  //获取表格数据范围 例如：{ s: { c: 0, r: 0 }, e: { c: 9, r: 16 } }
  private _computeTableRange(wokrBook: any) {
    /**
     * e:{ c:9 , r:16 }
     * s:{ c:0 , r:0 }
     * 列的数量(c):9-0+1  行的数量(r):16-0+1
     * c看作X , r看作Y  原点为左上角
     */
    const sheetNames = wokrBook.SheetNames
    const sheet = wokrBook.Sheets[sheetNames[0]]
    const range = XLSX.utils.decode_range(sheet['!ref'])
    return range
  }
  //计算合并信息
  private _computeMerges(wokrBook: any) {
    const sheetNames = wokrBook.SheetNames
    const sheet = wokrBook.Sheets[sheetNames[0]]
    const merges = sheet['!merges']
    // 获取需要合并的单元格的坐标 并获取所要合并的col 与 row
    if (!merges) {
      return
    }
    const mergesArr = Object.values(merges)
    return mergesArr.map((item: any) => {
      const { s, e } = item
      return { xy: [s.c, s.r], col: e.c - s.c + 1, row: e.r - s.r + 1 }
    })
  }
  //计算样式 与 cell的内容
  private _computedStyleAndContent(wokrBook: any, xy: [number, number]) {
    const sheetNames = wokrBook.SheetNames
    const sheet = wokrBook.Sheets[sheetNames[0]]
    const excelXy = XLSX.utils.encode_cell({ c: xy[0], r: xy[1] })
    return sheet[excelXy]
  }
  //生成表格
  generateTable(wokrBook: any) {
    if (Object.keys(wokrBook).length === 0) {
      return
    }
    const range = this._computeTableRange(wokrBook)
    const merges = this._computeMerges(wokrBook)
    const beLongToMerges = merges?.map((item) => {
      const { xy, col, row } = item
      const arr = Array.from({ length: row }).map((_row, rowDex) =>
        Array.from({ length: col }).map((_col, colDex) => {
          const xyArr = [xy[0] + colDex, xy[1] + rowDex]
          if (JSON.stringify(xy) !== JSON.stringify(xyArr)) {
            return xyArr
          }
        })
      )
      return arr.flat()
    })
    /**
     * notRender是不需要渲染的单元格
     * sheetjs 获取到的merges信息表示那些是合并范围，在这些合并范围内的单元格都不需要渲染。 此范围内的单元格表示合并成了一个单元格
     */
    const notRender = beLongToMerges
      ?.flat()
      .filter((item) => item !== undefined)
    const x = range.e.c - range.s.c + 1
    const y = range.e.r - range.s.r + 1
    return () => (
      <table class={styles['common-table-style']}>
        {Array.from({ length: y }).map((_yAxis, ydex) => (
          <tr>
            {Array.from({ length: x }).map((_xAxis, xdex) => {
              const mergeInfo = merges?.find(
                (item) => item.xy[0] === xdex && item.xy[1] === ydex
              )
              const cellObject = this._computedStyleAndContent(wokrBook, [
                xdex,
                ydex
              ])
              if (
                notRender?.find((item) => item[0] === xdex && item[1] === ydex)
              ) {
                return
              }
              return (
                <td
                  class={styles['excel-table-cell']}
                  style={{
                    width: '80px',
                    height: '32px',
                    backgroundColor:
                      cellObject.s.patternType === 'solid'
                        ? '#' + cellObject.s.fgColor.rgb
                        : '#fff'
                  }}
                  colSpan={mergeInfo ? mergeInfo.col : 1}
                  rowSpan={mergeInfo ? mergeInfo.row : 1}
                >
                  {cellObject?.v}
                </td>
              )
            })}
          </tr>
        ))}
      </table>
    )
  }
}

export default defineComponent({
  name: 'excelTable',
  props: {
    workBook: {
      type: Object as PropType<any>,
      default: () => ({}),
      required: true
    }
  },
  setup(props) {
    const { workBook } = toRefs(props)
    const excelTable = new analysisExcel(workBook)
    const table = ref()
    watchEffect(() => {
      table.value =
        Object.keys(workBook.value).length !== 0
          ? excelTable.generateTable(workBook.value)
          : () => <div>no data !!!</div>
    })
    return () => table.value()
  }
})
