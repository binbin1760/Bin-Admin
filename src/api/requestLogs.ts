import { BaseResponse } from '@/unitls/request'
import request from '@/unitls/request'
import { ErrorType } from '@/views/view-errorlogs/baseType'

export function getErrLogList(query: {
  page: number
  pageSize: number
}): Promise<BaseResponse<ErrorType[]>> {
  return request.get('/api/get/errLog/list', query)
}

export function deleteErrorlogById(id: string): Promise<BaseResponse<null>> {
  return request.get('/api/delete/errlog', { id })
}
