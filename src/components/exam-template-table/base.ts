import type { CSSProperties, VNode, PropType } from 'vue'
import mitt from 'mitt'

// 顶部title栏
interface headerTitle {
  title?: string
  render?: () => VNode
}

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
  isChildren?: boolean // 根据childrenkey属性进行自动合并tbody的行
  defaultVnode?: string
  defaultVnodeProp?: Record<string, string | number | boolean>
  render?: (row: any, index: number) => VNode
}

//这里的继承会有一个潜在问题  Innner_Column从children 与 column的children类型是不一致的
export interface Inner_Column extends column {
  fixedCssProperties?: CSSProperties
  isMergeCell?: boolean //是否是被合并的单元格<被合并的单元格不会渲染>
  deep?: number //默认1开始 ，0是虚拟层级便于给根节点设置parentAxis,
  path?: string //节点的路径由column的key 与. 拼接而成
}
// 单一表格配置
/**
 * scorllX横向滚动宽度,如果想设置固定列，就必须设置这个属性
 * 设置childrenkey后会开启tbody自动合并模式
 */
export interface baseTableType {
  childrenKey?: string
  draggable?: boolean
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

// 配置分页信息
interface pagination {
  pageSize: number
  pageNumber: number
  total: number
}
// 总结栏
export interface summary {
  scorllX?: number
  columns: Array<{
    fixed?: 'left' | 'right'
    width?: number
    colspan?: number //默认是1
    data?: any
    render?: (data: any) => VNode
  }>
}
// render empty data table
interface customEmpty {
  text: string
  render?: (text: string) => VNode
}
// mitt事件总线会用到的事件名称
export const mittEventField = ['drag-col', 'current-select-row']
// 初始化事件全局mitt
export const emitter = mitt()
//列拖动事件参数类型
export interface DragCol {
  tableDex: number
  parent_path: string //由于要区分顶部节点的所以 parent_pat是以exam-template-table-top开头的
  keySort: Array<string>
}
//当前选中的row
export interface currentSelectRow {
  tableDex: number
  dataIndex: number
  childrenKey?: string
  isChildren: boolean
  childrenIndex?: string
  offset: number
}
/**
 * 风险操作：
 * 1.表格数据类型为any，在组件内部流转风险巨大，需要隔离
 * 2.行拖动排序不能破坏表格数据
 * 为了解决以上问题，只能在组件内部对data进行加工
 */
export interface Inner_data {
  index: number
  canDrag: boolean
  infactData: any
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
