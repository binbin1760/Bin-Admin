import { request, BaseResponse } from '@/unitls/request'
import { StaffType } from '@/views/view-department/baseType'

export function addUser(data: StaffType): Promise<BaseResponse<null>> {
  if (data.agentTime) {
    data.agentStartTime = data.agentTime[0]
    data.agentEndTime = data.agentTime[1]
  }
  return request({
    url: '/api/add/user',
    method: 'post',
    data
  })
}

export function updateUserInfo(data: StaffType): Promise<BaseResponse<null>> {
  return request({
    url: '/api/update/user',
    method: 'post',
    data
  })
}

export function getUserList(query: {
  page: number
  pageSize: number
  id?: string
}): Promise<BaseResponse<StaffType[]>> {
  return request({
    url: '/api/get/user/list',
    method: 'get',
    params: query
  })
}

export function getUserById(): Promise<BaseResponse<StaffType>> {
  return request({
    url: '/api/get/userById',
    method: 'get'
  })
}

export function deleteUserById(id: string): Promise<BaseResponse<null>> {
  return request({
    url: `/api/delete/user?id=${id}`,
    method: 'get'
  })
}

export function editUserInfo(data: StaffType) {
  if (data.agentTime) {
    data.agentStartTime = data.agentTime[0]
    data.agentEndTime = data.agentTime[1]
  }
  return request({
    url: '/api/update/user',
    method: 'post',
    data
  })
}
