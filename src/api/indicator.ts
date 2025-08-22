import { request, BaseResponse } from '@/unitls'
import {
  BaseIndicator,
  DivideParams,
  EditIndicatorParams,
  indicatorInTable,
  IndicatorTree,
  DeleteNodeParams
} from '@/views/bin-indicator/baseType'

export function getAllIndicator(query: {
  page: number
  pageSize: number
}): Promise<BaseResponse<indicatorInTable[]>> {
  return request({
    url: '/api/getAllIndicator',
    method: 'get',
    params: query
  })
}

export function createIndicator(
  data: BaseIndicator
): Promise<BaseResponse<null>> {
  return request({
    url: '/api/createIndicator',
    method: 'post',
    data
  })
}

export function editIndicator(
  data: EditIndicatorParams
): Promise<BaseResponse<null>> {
  return request({
    url: '/api/edit/indicator',
    method: 'post',
    data
  })
}

export function deleteInidcatorByTopIndicatorId(
  topIndicaorId: string
): Promise<BaseResponse<null>> {
  return request({
    url: '/api/delete/topIndicaorId',
    method: 'get',
    params: {
      topIndicaorId
    }
  })
}

export function getIndicatorTree(data: {
  topIndicatorId: string
  id?: string
}): Promise<BaseResponse<IndicatorTree[]>> {
  return request({
    url: '/api/getIndicatorTree',
    method: 'get',
    params: data
  })
}

export function divideIndicator(
  data: DivideParams
): Promise<BaseResponse<null>> {
  return request({
    url: '/api/divider/indicator',
    method: 'post',
    data
  })
}

export function deleteNodeInTree(
  data: DeleteNodeParams
): Promise<BaseResponse<null>> {
  return request({
    url: '/api/delete/nodeInTree',
    method: 'post',
    data
  })
}
