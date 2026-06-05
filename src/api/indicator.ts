import { BaseResponse } from '@/unitls/request'
import request from '@/unitls/request'
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
  return request.get('/api/getAllIndicator', query)
}

export function createIndicator(
  data: BaseIndicator
): Promise<BaseResponse<null>> {
  return request.post('/api/createIndicator', data)
}

export function editIndicator(
  data: EditIndicatorParams
): Promise<BaseResponse<null>> {
  return request.post('/api/edit/indicator', data)
}

export function deleteInidcatorByTopIndicatorId(
  topIndicaorId: string
): Promise<BaseResponse<null>> {
  return request.get('/api/delete/topIndicaorId', {
    topIndicaorId
  })
}

export function getIndicatorTree(data: {
  topIndicatorId: string
  id?: string
}): Promise<BaseResponse<IndicatorTree[]>> {
  return request.get('/api/getIndicatorTree', data)
}

export function divideIndicator(
  data: DivideParams
): Promise<BaseResponse<null>> {
  return request.post('/api/divider/indicator', data)
}

export function deleteNodeInTree(
  data: DeleteNodeParams
): Promise<BaseResponse<null>> {
  return request.post('/api/delete/nodeInTree', data)
}
