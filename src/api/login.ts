import { BaseResponse } from '@/unitls/request'
import request from '@/unitls/request'

interface LoginInfo {
  code: string
  paw: string
}

interface cacheUser {
  token: string
  department: string
  departmentId: string
  treeLevel: number
  name: string
}
export function login(data: LoginInfo): Promise<BaseResponse<cacheUser>> {
  return request.post('/api/login', data)
}
