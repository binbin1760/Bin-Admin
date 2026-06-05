import { BaseResponse } from '@/unitls/request'
import request from '@/unitls/request'
import {
  BaseNodeType,
  NodeTableType,
  BaseWorkFlowType,
  TableWorkFLowType,
  WorkFlowDetail,
  createFLowNodeRelation,
  EidtRelationXY,
  EditRelationBase,
  BaseFlowNodeRelationType,
  AddEdges
} from '@/views/system-setting/base'

export function addFlowNode(data: BaseNodeType): Promise<BaseResponse<null>> {
  return request.post('/api/create/flowNode', data)
}

export function getAllFlowNodes(): Promise<BaseResponse<NodeTableType[]>> {
  return request.get('/api/get/allFlowNodes')
}

export function deleteFlowNodeById(id: string): Promise<BaseResponse<null>> {
  return request.get('/api/delete/flowNode', {
    id
  })
}

export function createWorkFlow(
  data: BaseWorkFlowType
): Promise<BaseResponse<null>> {
  return request.post('/api/add/wrokFlow', data)
}

export function getAllWorkFlows(): Promise<BaseResponse<TableWorkFLowType[]>> {
  return request.get('/api/getAllWorkFLow')
}

export function checkHasSameName(name: string): Promise<BaseResponse<boolean>> {
  return request.get('/api/checkWorkFlow/name', {
    name
  })
}

export function deleteFLowById(id: string): Promise<BaseResponse<null>> {
  return request.get('/api/deleteWorkFLowById', {
    id
  })
}

export function getFlowWorkDetailById(
  id: string
): Promise<BaseResponse<WorkFlowDetail>> {
  return request.get('/api/getWorkFlow', {
    id
  })
}

export function addFlowNodeRelation(
  data: createFLowNodeRelation
): Promise<BaseResponse<null>> {
  return request.post('/api/add/flowNodeRelation', data)
}

export function updateFlowNodeRelationXy(
  data: EidtRelationXY
): Promise<BaseResponse<null>> {
  return request.post('/api/update/flowNodeRelationXy', data)
}

export function updateFlowNodeRelationBase(
  data: EditRelationBase
): Promise<BaseResponse<null>> {
  return request.post('/api/update/flowNodeRelationInfo', data)
}

export function deleteFlowNodeRelationById(
  id: string
): Promise<BaseResponse<null>> {
  return request.get('/api/delete/flowNodeRelation', {
    id
  })
}

export function deleteFlowNodeRelationsByIds(
  ids: string[]
): Promise<BaseResponse<null>> {
  return request.post('/api/delete/flowNodeRelations', ids)
}

export function getFlowNodeDetailByIid(
  id: string
): Promise<BaseResponse<BaseFlowNodeRelationType>> {
  return request.get('/api/get/flowNodeRelation', {
    id
  })
}

export function addFlowNodeRelationEdge(
  data: AddEdges
): Promise<BaseResponse<null>> {
  return request.post('/api/create/edge', data)
}
