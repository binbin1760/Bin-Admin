// 这个文档专门用于记录LogicFlow的typescrpt
// 原因: 官方文档看不明白，没找到固定的TS类型接口文
import LogicFlow from '@logicflow/core'

export interface baseDataType {
  nodes: Array<LogicFlow.NodeConfig>
  edges: Array<LogicFlow.EdgeConfig>
}
