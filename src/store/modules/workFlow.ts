import { store } from '../index'
import { defineStore } from 'pinia'
import { baseDataType } from '@/views/system-setting/work-flow/components/flow-set/baseType'
import {
  BaseFlowNodeRelationType,
  BaseWorkFlowType,
  FlowNodeRelationsEdge,
  FlowSelectInfo,
  WorkFlowDetail
} from '@/views/system-setting/base'

export interface UseWorkFlow {
  logicFlowData: baseDataType
  nodeRelations: BaseFlowNodeRelationType[]
  nodeRelationsEdge: FlowNodeRelationsEdge[]
  workFlowList: BaseWorkFlowType[]
  selectedNode: FlowSelectInfo | null
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
    workFlowList: [],
    selectedNode: null
  }),
  getters: {
    getSelectedNode(): FlowSelectInfo | null {
      return this.selectedNode
    }
  },
  actions: {
    setSelectNode(data: WorkFlowDetail) {
      this.selectedNode = {
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
      this.selectedNode = null
    }
  }
})

export function workFlow() {
  return workFlowStore(store)
}
