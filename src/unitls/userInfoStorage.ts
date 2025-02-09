import { tagType } from '@/store/modules/tagViews'
//登录信息缓存
interface userInfoType {
  token: string | null
}
export function saveUserInfo(info: userInfoType) {
  localStorage.setItem('user', JSON.stringify(info))
}

export function getUserInfo(): userInfoType {
  const info = localStorage.getItem('user') as unknown as string
  return JSON.parse(info) ? JSON.parse(info) : { token: null }
}

//缓存tag view 浏览记录
export function saveUserTagHistory(tagList: tagType[]) {
  localStorage.setItem('tagList', JSON.stringify(tagList))
}

export function getUserTagHistory(): tagType[] {
  const tagList = localStorage.getItem('tagList') as unknown as string
  return JSON.parse(tagList) ? JSON.parse(tagList) : []
}
