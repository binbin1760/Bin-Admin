import { tagType } from '@/store/modules/tagViews'
//登录信息缓存
interface userInfoType {
  token: string | null
  department: string | null
  departmentId: string | null
  treeLevel: number | null
}

export interface topDep {
  id: string | null
  name: string | null
  treeLevl: 0 | null
}

export function saveUserInfo(info: userInfoType) {
  localStorage.setItem('user', JSON.stringify(info))
}

export function getUserInfo(): userInfoType {
  const info = localStorage.getItem('user') as unknown as string
  return JSON.parse(info)
    ? JSON.parse(info)
    : { token: null, department: null, departmentId: null, treeLevel: null }
}

export function clearUserInfo() {
  localStorage.removeItem('user')
}

//缓存tag view 浏览记录
export function saveUserTagHistory(tagList: tagType[]) {
  localStorage.setItem('tagList', JSON.stringify(tagList))
}

export function getUserTagHistory(): tagType[] {
  const tagList = localStorage.getItem('tagList') as unknown as string
  return JSON.parse(tagList) ? JSON.parse(tagList) : []
}

//缓存顶层部门信息
export function saveTopDep(data: topDep) {
  localStorage.setItem('topDep', JSON.stringify(data))
}

export function getTopDepStroage(): topDep {
  const topDep = localStorage.getItem('topDep') as unknown as string
  return JSON.parse(topDep)
    ? JSON.parse(topDep)
    : { id: null, name: null, treeLevl: null }
}
