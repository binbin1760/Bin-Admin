import { request, BaseResponse } from '@/unitls/request'
import { ErrorType } from '@/views/view-errorlogs/baseType'

export function getErrLogList(query: {
  page: number
  pageSize: number
}): Promise<BaseResponse<ErrorType[]>> {
  return request({
    url: '/api/get/errLog/list',
    method: 'get',
    params: query
  })
}

export function deleteErrorlogById(id: string): Promise<BaseResponse<null>> {
  return request({
    url: '/api/delete/errlog',
    method: 'get',
    params: { id }
  })
}
