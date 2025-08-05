import { BaseResponse, request } from '@/unitls'
import {
  BaseUser,
  BaseMenu,
  BaseButton,
  BaseRole,
  UpdateRoleParam,
  MenuAndMenuButtons,
  AssignUserRolesParams
} from '@/views/view-permissions/baseType'

export function addNewSideMenu(data: BaseMenu): Promise<BaseResponse<null>> {
  return request({
    url: '/api/add/new/menu',
    method: 'post',
    data
  })
}

export function editOrAddSidemenu(data: BaseMenu): Promise<BaseResponse<null>> {
  return request({
    url: '/api/edit/sidemenu',
    method: 'post',
    data
  })
}

export function getSideMenuList(): Promise<BaseResponse<BaseMenu[]>> {
  return request({
    url: '/api/get/sidemenu',
    method: 'get'
  })
}

export function getUserManageList(query: {
  page: number
  pageSize: number
  depId?: string
}): Promise<BaseResponse<BaseUser[]>> {
  return request({
    url: '/api/get/user/manage/list',
    method: 'get',
    params: query
  })
}

export function deleteMenuById(id: string): Promise<BaseResponse<null>> {
  return request({
    url: '/api/get/deleteMenuById',
    method: 'get',
    params: { id }
  })
}

export function addNewPermissionBtn(
  data: BaseButton
): Promise<BaseResponse<null>> {
  return request({
    url: '/api/post/newbutton',
    method: 'post',
    data
  })
}

export function getMenuButtonListByPath(
  path: string
): Promise<BaseResponse<Array<BaseButton>>> {
  return request({
    url: '/api/get/menuButtonList',
    method: 'get',
    params: {
      path
    }
  })
}

export function getMenuButtonListByMenuId(
  id: string
): Promise<BaseResponse<MenuAndMenuButtons>> {
  return request({
    url: '/api/get/menuButtonList',
    method: 'get',
    params: { id }
  })
}

export function deleteMenuButton(id: string): Promise<BaseResponse<null>> {
  return request({
    url: '/api/get/deleteButton',
    method: 'get',
    params: {
      id
    }
  })
}

export function addNewRole(data: BaseRole): Promise<BaseResponse<null>> {
  return request({
    url: '/api/post/role',
    method: 'post',
    data
  })
}

export function getAllRoles(query: {
  pageSize: number
  page: number
}): Promise<BaseResponse<Array<BaseRole>>> {
  return request({
    url: '/api/get/all/roles',
    method: 'get',
    params: query
  })
}

export function deleteRole(id: string): Promise<BaseResponse<null>> {
  return request({
    url: '/api/delete/role',
    method: 'get',
    params: { id }
  })
}

export function updateRoleInfo(data: BaseRole): Promise<BaseResponse<null>> {
  return request({
    url: '/api/update/role',
    method: 'post',
    data
  })
}

export function updateRolePermission(
  data: UpdateRoleParam
): Promise<BaseResponse<null>> {
  return request({
    url: '/api/update/rolePermission',
    method: 'post',
    data
  })
}

export function getRoleById(
  id: string
): Promise<BaseResponse<MenuAndMenuButtons>> {
  return request({
    url: '/api/get/role',
    method: 'get',
    params: {
      id
    }
  })
}

export function assignUserRoles(
  data: AssignUserRolesParams
): Promise<BaseResponse<null>> {
  return request({
    url: '/api/post/updateUserRoles',
    method: 'post',
    data
  })
}

export function getUserRolesById(
  id: string
): Promise<BaseResponse<BaseRole[]>> {
  return request({
    url: '/api/get/getUserRoles',
    method: 'get',
    params: { id }
  })
}
