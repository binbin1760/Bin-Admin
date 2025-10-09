import { request, BaseResponse } from '@/unitls'
import {
  BaseNodeType,
  NodeTableType,
  BaseWorkFlowType,
  TableWorkFLowType,
  WorkFlowDetail
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
