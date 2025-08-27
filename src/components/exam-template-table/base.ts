import type { CSSProperties, VNode } from 'vue'
import { PropType } from 'vue'

// 顶部title栏
interface headerTitle {
  title: string
  render?: (title: string) => VNode
}
/**
 * 列的属性配置说明
 * 1.表头的colspan/rowspan
 *
 * */

/**
 * 关于树形结构colgroup设置col 宽度说明,当column拥有children时
 * 根节点的宽度，等于叶子节点的宽度之和。
 * 所以在配置表格宽度时，如果column有children那么请直接给children设置宽度，children宽度之和等于parent宽度
 */
export interface column {
  title: string | (() => VNode)
  key: string
  width?: number
  align?: 'left' | 'center' | 'right'
  children?: column[]
  titleRowspan?: number
  titleColspan?: number
  colspan?: number
  rowspan?: number
  fixed?: 'left' | 'right'
  defaultVnode?: string
  defaultVnodeProp?: Record<string, string | number | boolean>
  render?: (row: any, index: number) => VNode
}

export interface Inner_Column extends column {
  fixedCssProperties?: CSSProperties
}
// 单一表格配置
/**
 * scorllX横向滚动宽度,如果想设置固定列，就必须设置这个属性
 */
export interface baseTableType {
  scorllX?: number
  headerTitle?: headerTitle
  columns: column[]
  summary?: summary
  customEmpty?: customEmpty
}

// 并表列
export type combineTables = Array<baseTableType>

// 是否显示边框
type bordered = boolean

// 是否显示表头
type showThead = boolean

// 树形数据， 当data 含有children时会自动开启树形数据模，该模式不是折叠而是针对数据children长度进行td的rowspan计算
export type data = unknown[]

// 默认展开项，rows数据的key值
type defaultExpandItem = string | number

// 默认展开全部
type defaultExpandAll = boolean

// 配置分页信息
interface pagination {
  pageSize: number
  pageNumber: number
  total: number
}
// 总结栏
interface summary {
  show: boolean
  columns: Array<{
    title: string
    key: string
    render?: (data: any) => VNode
  }>
}
// render empty data table
interface customEmpty {
  text: string
  render?: (text: string) => VNode
}
export const props = {
  combineTables: {
    type: Array as PropType<combineTables>,
    default: () => [],
    required: true
  },
  data: {
    type: Array as PropType<Array<data>>,
    default: () => []
  },
  bordered: {
    type: Boolean as PropType<bordered>,
    default: true,
    required: false
  },
  showThead: {
    type: Boolean as PropType<showThead>,
    default: true,
    required: false
  },
  defaultExpandItem: {
    type: [String, Number] as PropType<defaultExpandItem>,
    default: '',
    required: false
  },
  defaultExpandAll: {
    type: Boolean as PropType<defaultExpandAll>,
    default: false,
    required: false
  },
  pagination: {
    type: Object as PropType<pagination>,
    default: () => ({
      pageSize: 10,
      pageNumber: 1,
      total: 0
    }),
    required: false
  },
  summary: {
    type: Object as PropType<summary>,
    default: () => ({
      show: false,
      columns: []
    }),
    required: false
  },
  customEmpty: {
    type: Object as PropType<customEmpty>,
    default: () => ({
      text: '暂无数据',
      render: undefined
    }),
    required: false
  }
}
