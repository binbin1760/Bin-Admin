import { request, BaseResponse } from '@/unitls'
import {
  BaseNodeType,
  NodeTableType,
  BaseWorkFlowType,
  TableWorkFLowType,
  WorkFlowDetail,
  createFLowNodeRelation,
  EidtRelationXY,
  EditRelationBase,
  BaseFlowNodeRelationType
} from '@/views/system-setting/base'

export function addFlowNode(data: BaseNodeType): Promise<BaseResponse<null>> {
  return request({
    url: '/api/create/flowNode',
    method: 'post',
    data
  })
}

export function getAllFlowNodes(): Promise<BaseResponse<NodeTableType[]>> {
  return request({
    url: '/api/get/allFlowNodes',
    method: 'get'
  })
}

export function deleteFlowNodeById(id: string): Promise<BaseResponse<null>> {
  return request({
    url: '/api/delete/flowNode',
    method: 'get',
    params: {
      id
    }
  })
}

export function createWorkFlow(
  data: BaseWorkFlowType
): Promise<BaseResponse<null>> {
  return request({
    url: '/api/add/wrokFlow',
    method: 'post',
    data
  })
}

export function getAllWorkFlows(): Promise<BaseResponse<TableWorkFLowType[]>> {
  return request({
    url: '/api/getAllWorkFLow',
    method: 'get'
  })
}

export function checkHasSameName(name: string): Promise<BaseResponse<boolean>> {
  return request({
    url: '/api/checkWorkFlow/name',
    method: 'get',
    params: {
      name
    }
  })
}

export function deleteFLowById(id: string): Promise<BaseResponse<null>> {
  return request({
    url: '/api/deleteWorkFLowById',
    method: 'get',
    params: {
      id
    }
  })
}

export function getFlowWorkDetailById(
  id: string
): Promise<BaseResponse<WorkFlowDetail>> {
  return request({
    url: '/api/getWorkFlow',
    method: 'get',
    params: {
      id
    }
  })
}

export function addFlowNodeRelation(
  data: createFLowNodeRelation
): Promise<BaseResponse<null>> {
  return request({
    url: '/api/add/flowNodeRelation',
    method: 'post',
    data
  })
}

export function updateFlowNodeRelationXy(
  data: EidtRelationXY
): Promise<BaseResponse<null>> {
  return request({
    url: '/api/update/flowNodeRelationXy',
    method: 'post',
    data
  })
}

export function updateFlowNodeRelationBase(
  data: EditRelationBase
): Promise<BaseResponse<null>> {
  return request({
    url: '/api/update/flowNodeRelationInfo',
    method: 'post',
    data
  })
}

export function deleteFlowNodeRelationById(
  id: string
): Promise<BaseResponse<null>> {
  return request({
    url: '/api/delete/flowNodeRelation',
    method: 'get',
    params: {
      id
    }
  })
}

export function deleteFlowNodeRelationsByIds(
  ids: string[]
): Promise<BaseResponse<null>> {
  return request({
    url: '/api/delete/flowNodeRelations',
    method: 'post',
    data: ids
  })
}

export function getFlowNodeDetailByIid(
  id: string
): Promise<BaseResponse<BaseFlowNodeRelationType>> {
  return request({
    url: '/api/get/flowNodeRelation',
    method: 'get',
    params: {
      id
    }
  })
}
