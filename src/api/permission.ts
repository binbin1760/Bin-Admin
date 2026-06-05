import { BaseResponse } from '@/unitls/request'
import request from '@/unitls/request'
import {
  BaseUser,
  BaseMenu,
  BaseButton,
  BaseRole,
  UpdateRoleParam,
  MenuAndMenuButtons,
  AssignUserRolesParams,
  Permissions
} from '@/views/view-permissions/baseType'

export function addNewSideMenu(data: BaseMenu): Promise<BaseResponse<null>> {
  return request.post('/api/add/new/menu', data)
}

export function editOrAddSidemenu(data: BaseMenu): Promise<BaseResponse<null>> {
  return request.post('/api/edit/sidemenu', data)
}

export function getSideMenuList(): Promise<BaseResponse<BaseMenu[]>> {
  return request.get('/api/get/sidemenu')
}

export function getUserManageList(query: {
  page: number
  pageSize: number
  depId?: string
}): Promise<BaseResponse<BaseUser[]>> {
  return request.get('/api/get/user/manage/list', query)
}

export function deleteMenuById(id: string): Promise<BaseResponse<null>> {
  return request.get('/api/get/deleteMenuById', { id })
}

export function addNewPermissionBtn(
  data: BaseButton
): Promise<BaseResponse<null>> {
  return request.post('/api/post/newbutton', data)
}

export function getMenuButtonListByPath(
  path: string
): Promise<BaseResponse<Array<BaseButton>>> {
  return request.get('/api/get/menuButtonListByPath', {
    path
  })
}

export function getMenuButtonListByMenuId(
  id: string
): Promise<BaseResponse<MenuAndMenuButtons>> {
  return request.get('/api/get/menuButtonList', { id })
}

export function deleteMenuButton(id: string): Promise<BaseResponse<null>> {
  return request.get('/api/get/deleteButton', {
    id
  })
}

export function addNewRole(data: BaseRole): Promise<BaseResponse<null>> {
  return request.post('/api/post/role', data)
}

export function getAllRoles(query: {
  pageSize: number
  page: number
}): Promise<BaseResponse<Array<BaseRole>>> {
  return request.get('/api/get/all/roles', query)
}

export function deleteRole(id: string): Promise<BaseResponse<null>> {
  return request.get('/api/delete/role', { id })
}

export function updateRoleInfo(data: BaseRole): Promise<BaseResponse<null>> {
  return request.post('/api/update/role', data)
}

export function updateRolePermission(
  data: UpdateRoleParam
): Promise<BaseResponse<null>> {
  return request.post('/api/update/rolePermission', data)
}

export function getRoleById(
  id: string
): Promise<BaseResponse<MenuAndMenuButtons>> {
  return request.get('/api/get/role', {
    id
  })
}

export function assignUserRoles(
  data: AssignUserRolesParams
): Promise<BaseResponse<null>> {
  return request.post('/api/post/updateUserRoles', data)
}

export function getUserRolesById(
  id: string
): Promise<BaseResponse<BaseRole[]>> {
  return request.get('/api/get/getUserRoles', { id })
}

export function verifyUserPermisson(): Promise<BaseResponse<Permissions>> {
  return request.get('/api/verifyUserPermission')
}
