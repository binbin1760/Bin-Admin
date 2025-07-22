import { request, BaseResponse } from '@/unitls/request'

export interface RequestLogs {
  id: string
  code?: number
  name?: string
  errLog: string
  occurTime: number
}

export function getErrLogList(query: {
  page: number
  pageSize: number
}): Promise<BaseResponse<RequestLogs[]>> {
  return request({
    url: '/api/get/errLog/list',
    method: 'get',
    params: query
  })
}
