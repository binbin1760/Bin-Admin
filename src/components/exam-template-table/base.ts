import type { VNode } from 'vue'
import { PropType } from 'vue'

// 顶部title栏
interface headerTitle {
  title: string
  render?: (title: string) => VNode
}
// 列
export interface column {
  title: string | (() => VNode)
  key: string
  width?: number
  align?: 'left' | 'center' | 'right'
  children?: column[]
  titleColspan?: number
  colspan?: number
  rowspan?: number
  fixed?: 'left' | 'right'
  render?: (row: any, index: number) => VNode
}
// 单一表格配置
export interface baseTableType {
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

// 树形数据， 当data 含有children时会自动开启树形数据模式
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
