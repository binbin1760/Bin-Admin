import { BaseResponse, request } from '@/unitls'
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
  return request({
    url: '/api/get/allDepartment',
    method: 'get',
    params: query
  })
}

export function addDepartment(
  data: DepartmentType
): Promise<BaseResponse<null>> {
  return request({
    url: '/api/add/department',
    method: 'post',
    data
  })
}

export function editDepartment(
  data: DepartmentType
): Promise<BaseResponse<null>> {
  return request({
    url: '/api/update/department',
    method: 'post',
    data
  })
}

export function deleteDepartmentById(id: string): Promise<BaseResponse<null>> {
  return request({
    url: `/api/delete/department?id=${id}`,
    method: 'get'
  })
}

export function getDepartmentTree(
  id?: string
): Promise<BaseResponse<DepartmentType[]>> {
  return request({
    url: `/api/async/tree/department`,
    method: 'get',
    params: { id }
  })
}

export function getTopDep(): Promise<BaseResponse<DepartmentType>> {
  return request({
    url: '/api/get/topDepartment',
    method: 'get'
  })
}

export function getChildDepAndUserList(
  depId: string
): Promise<BaseResponse<ChilDepListAndUserlist>> {
  return request({
    url: '/api/get/childrenAndChildUser',
    method: 'get',
    params: {
      depId
    }
  })
}
