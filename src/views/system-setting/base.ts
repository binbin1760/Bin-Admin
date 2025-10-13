/**
 * 流程配置需求梳理
 * 1. 流程节点可以分为: 审批节点, 条件节点,计算节点,确认节点,自评节点,主评节点,结果节点,修订节点
 * 2. 流程必须有对应的模板
 * 3. 系统后续开发前端围绕模板,后端围绕节点进行新功能开发
 *
 * 流程_id 与 方案_id 关联  -> 方案会根据流程走
 *
 * 每一个节点都是一张表,方案每次进入节点都会生成一条数据
 *
 * 节点与方案的关系是一对多, 一个节点可以对应多个方案, 但是一个方案只能对应一个节点
 *
 */

export interface BaseNodeType {
  name: string
  des: string
}

export interface NodeTableType extends BaseNodeType {
  id: string
  createTime: number
  updateTime: number
  creator: string
  creatorId: string
}

export interface BaseWorkFlowType {
  name: string
  des: string
}

export interface TableWorkFLowType extends BaseWorkFlowType {
  id: string
  startNodeId?: string
  creator: string
  creatorId: string
  createTime: number
  updateTime: number
}

export interface WorkFlowDetail {
  id: string
  name: string
  des: string
  startNodeId?: string
  creator: string
  creatorId: string
  createTime: number
  updateTime: number
  node: BaseFlowNodeRelationType[]
  edge: FlowNodeRelationsEdge[]
  flowNode: NodeTableType[]
}

export interface BaseFlowNodeRelationType {
  id: string
  name: string
  x: number
  y: number
  type: string
  path: string
  flowNode: NodeTableType
  workFlow: TableWorkFLowType
  flowNodeRelationsEdge: FlowNodeRelationsEdge[]
}

export interface FlowNodeRelationsEdge {
  id: string
  des: string
  sourceNode: BaseFlowNodeRelationType
  targetNode: BaseFlowNodeRelationType
}

export interface FlowSelectInfo {
  id: string
  name: string
  nodes: number
  edges: number
  des: string
  creator: string
  creatorId: string
}

export interface createFLowNodeRelation {
  name: string
  x: number
  y: number
  type: string
  path: string
  flowNodeId: string
  workFlowId: string
}

export interface EidtRelationXY {
  id: string
  y: number
  x: number
}

export interface EditRelationBase {
  id: string
  name: string
  path: string
  flowNodeId: string
}

export interface RightMenuItmeConfig {
  label: string
  clickEvent: () => void
}
