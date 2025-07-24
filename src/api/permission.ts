import { BaseResponse, request } from '@/unitls'
import { BaseUser } from '@/views/view-permissions/baseType'

export interface menuType {
  id?: string
  pid?: string
  path: string
  meta: {
    name: string
    isRoot: boolean
    hidden: boolean
    affix: boolean
    sort: number
  }
  children?: menuType[]
  redirect?: string
}

export interface addMenuType {
  id?: string
  pid?: string
  path: string
  name: string
  isRoot: boolean
  hidden: boolean
  affix: boolean
  sort: number
  children?: menuType[]
  redirect?: string
}

export function editOrAddSidemenu(
  data: addMenuType
): Promise<BaseResponse<null>> {
  return request({
    url: '/api/edit/sidemenu',
    method: 'post',
    data
  })
}

export function getSideMenuList(): Promise<BaseResponse<menuType[]>> {
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
