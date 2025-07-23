import { request, BaseResponse } from '@/unitls/request'

interface LoginInfo {
  code: string
  paw: string
}

interface cacheUser {
  token: string
  department: string
  departmentId: string
  treeLevel: number
}

export function login(data: LoginInfo): Promise<BaseResponse<cacheUser>> {
  return request({
    url: '/api/login',
    method: 'post',
    data
  })
}
