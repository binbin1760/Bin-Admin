import { store } from '../index'
import { defineStore } from 'pinia'
import { baseDataType } from '@/views/system-setting/work-flow/components/flow-set/baseType'
import {
  BaseFlowNodeRelationType,
  BaseWorkFlowType,
  FlowNodeRelationsEdge,
  FlowSelectInfo,
  NodeTableType,
  WorkFlowDetail
} from '@/views/system-setting/base'
import LogicFlow from '@logicflow/core'

export interface UseWorkFlow {
  logicFlowData: baseDataType
  nodeRelations: BaseFlowNodeRelationType[]
  nodeRelationsEdge: FlowNodeRelationsEdge[]
  workFlowList: BaseWorkFlowType[]
  flowNodeList: NodeTableType[] //真实节点
  allFlowNodeList: NodeTableType[] //全部真是节点
  selectedFlow: FlowSelectInfo | null
}

export const workFlowStore = defineStore({
  id: 'wokr-flow',
  state: (): UseWorkFlow => ({
    logicFlowData: {
      nodes: [],
      edges: []
    },
    nodeRelations: [],
    nodeRelationsEdge: [],
    flowNodeList: [],
    workFlowList: [],
    allFlowNodeList: [],
    selectedFlow: null
  }),
  getters: {
    selectFlow(state): FlowSelectInfo | null {
      return state.selectedFlow
    },
    flowNodes: (state) => state.flowNodeList,
    flowNodeOptions: (state) => {
      return state.allFlowNodeList.map((item) => {
        return { label: item.name, value: item.id }
      })
    },
    GetlogicFlowData: (state) => state.logicFlowData
  },
  actions: {
    setSelectNode(data: WorkFlowDetail) {
      this.selectedFlow = {
        id: data.id,
        name: data.name,
        des: data.des,
        creator: data.creator,
        creatorId: data.creatorId,
        nodes: data.node.length,
        edges: data.edge.length
      }
    },
    clearSelectNode() {
      this.selectedFlow = null
    },
    setFlowNodeList(data: NodeTableType[]) {
      this.flowNodeList = data
    },
    setAllFlowNodeList(data: NodeTableType[]) {
      this.allFlowNodeList = data
    },
    setNodeRelations(data: BaseFlowNodeRelationType[]) {
      this.nodeRelations = data
    },
    setNodeRelationEdge(data: FlowNodeRelationsEdge[]) {
      this.nodeRelationsEdge = data
    },
    //将单个模拟节点转化为Logic需要用到的node数据
    transformToLogicFlowNode(data: BaseFlowNodeRelationType) {
      const node: LogicFlow.NodeConfig = {
        id: data.id,
        text: data.name,
        type: data.type,
        x: data.x,
        y: data.y
      }
      this.logicFlowData.nodes.push(node)
    },
    //将多个模拟节点转化为Logic需要用到的node数据
    transformToLogicFlowNodes(data: BaseFlowNodeRelationType[]) {
      this.logicFlowData.nodes = data.map((item) => {
        return {
          id: item.id,
          text: item.name,
          type: item.type,
          x: item.x,
          y: item.y
        }
      })
    },
    getLogicFlowData() {
      return this.logicFlowData
    }
  }
})

export function workFlow() {
  return workFlowStore(store)
}
