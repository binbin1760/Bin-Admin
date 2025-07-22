import { store } from '../index'
import { defineStore, PiniaPluginContext } from 'pinia'
import { DepartmentType, StaffType } from '@/views/view-department/baseType'
import { getUserInfo, getTopDepStroage } from '@/unitls'

export type Dep = {
  depId: string | null
  depName: string | null
  treeLevel: number | null
  isLeaf: boolean
}

export interface UserTreeSelectNodeItem {
  key: string //id
  label: string // name
  disabled?: boolean
  isLeaf?: boolean
  nodeData: StaffType | DepartmentType
}

export interface DepChildNode {
  key: string //id
  label: string // name
  isLeaf?: boolean
  nodeData: DepartmentType
}

export type UserTreeSelctNode = Array<UserTreeSelectNodeItem>
export interface DepartmentAndStaffType {
  userList: StaffType[]
  departmentList: DepartmentType[]
  userTreeSelectNode: UserTreeSelctNode
  currentSelectDep: Dep
  currentUserDep: Dep
  topDep: Dep
}

function readUserLoaclstorage(context: PiniaPluginContext) {
  const { store } = context
  if (store.$id === 'dep-staff-store') {
    const { department, departmentId, treeLevel } = getUserInfo()
    store.currentUserDep.depId = departmentId
    store.currentUserDep.depName = department
    store.currentUserDep.treeLevel = treeLevel

    store.currentSelectDep.depId = departmentId
    store.currentSelectDep.depName = department
    store.currentSelectDep.treeLevel = treeLevel

    const { name, id } = getTopDepStroage()
    store.topDep.depId = id
    store.topDep.depName = name
    store.topDep.treeLevel = 0
  }
}

export const depStaffStore = defineStore({
  id: 'dep-staff-store',
  state: (): DepartmentAndStaffType => ({
    userList: [],
    departmentList: [],
    userTreeSelectNode: [],
    currentSelectDep: {
      depId: null,
      depName: null,
      treeLevel: null,
      isLeaf: false
    },
    currentUserDep: {
      depId: null,
      depName: null,
      treeLevel: null,
      isLeaf: false
    },
    topDep: {
      depId: null,
      depName: null,
      treeLevel: 0,
      isLeaf: true
    }
  }),
  getters: {
    getUserList: (state) => state.userList,
    getDepartmentList: (state) => state.departmentList,
    getCurrentSelectDep: (state) => state.currentSelectDep,
    getCurrentUserDep: (state) => state.currentUserDep,
    getTopDepInfo: (state) => state.topDep,
    getUserTreeSelectNode: (state) => state.userTreeSelectNode
  },
  actions: {
    setCurrSelectDep(node: Dep) {
      this.currentSelectDep = node
    },
    reSetCurrSelectDepData() {
      this.currentSelectDep.depId = null
      this.currentSelectDep.depName = null
      this.currentSelectDep.treeLevel = null
    },
    setCurrUserDep(id: string, depName: string, treeLevel: number) {
      this.currentUserDep.depId = id
      this.currentUserDep.depName = depName
      this.currentUserDep.treeLevel = treeLevel
    },
    setUserList(data: StaffType[]) {
      this.userList = data
    },
    setTopDep(data: Dep) {
      this.topDep = data
    }
  }
})
store.use(readUserLoaclstorage)
export function depStaff() {
  return depStaffStore(store)
}
