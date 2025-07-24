export interface BaseUser {
  id: string
  name: string
  code: number
  department: string
  role: string
  roleId: string
  identity: number // 身份 1.正式员工 2.实习生 3.劳务派遣  4.外包人员
  status: 1 | 2 | 3 // 状态 1.在职 2.离职 3.休假
}

export interface BaseRole {
  id: string
  name: string
  description: string
  creater: string
  createrId: string
  createTime: string
  updateTime: string
}

export interface BaseMenu {
  id: string
  name: string
  path: string
  sort: number
  redirect: string
  hidden: boolean //是否是侧栏菜单 true显示， false隐藏
  affix: boolean
  isRoot: boolean // 是否是根节点
  parentPath?: string // 父菜单id
  children?: BaseMenu[]
}

export const YES_OR_NO_FIELD = ['否', '是']

export interface BaseButton {
  id: string
  name: string
  code: string //v-permission code
  description: string
  path: string // path of tagret menu
}
