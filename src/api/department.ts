import { BaseResponse } from '@/unitls/request'
import request from '@/unitls/request'
import { DepartmentType, StaffType } from '@/views/view-department/baseType'

// nodeType 0 表示员工节点  1表示组织节点
export type ChilDepListAndUserlist = {
  userList: Array<StaffType & { nodeType: 0 | 1 }>
  childDepList: Array<StaffType & { nodeType: 0 | 1 }>
}

export function getAllDepartments(query: {
  page: number
  pageSize: number
  id?: string
}): Promise<BaseResponse<DepartmentType[]>> {
  return request.get('/api/get/allDepartment', query)
}

export function addDepartment(
  data: DepartmentType
): Promise<BaseResponse<null>> {
  return request.post('/api/add/department', data)
}

export function editDepartment(
  data: DepartmentType
): Promise<BaseResponse<null>> {
  return request.post('/api/update/department', data)
}

export function deleteDepartmentById(id: string): Promise<BaseResponse<null>> {
  return request.get(`/api/delete/department`, { id })
}

export function getDepartmentTree(
  id?: string
): Promise<BaseResponse<DepartmentType[]>> {
  return request.get(`/api/async/tree/department`, { id })
}

export function getTopDep(): Promise<BaseResponse<DepartmentType>> {
  return request.get('/api/get/topDepartment')
}

export function getChildDepAndUserList(
  depId: string
): Promise<BaseResponse<ChilDepListAndUserlist>> {
  return request.get('/api/get/childrenAndChildUser', { depId })
}
