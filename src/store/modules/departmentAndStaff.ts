import { store } from '../index'
import { defineStore } from 'pinia'

export interface StaffType {
  id: string
  name: string
  depInfo: DepartmentType
  position: string
  rank: number //职级
}
export interface DepartmentType {
  id: string
  name: string
  level: number
  parentId: string
  leader: string
  children?: DepartmentType[]
}

export interface DepartmentAndStaffType {
  userList: StaffType[]
  departmentList: DepartmentType[]
}

export const depStaffStore = defineStore({
  id: 'dep-staff-store',
  state: (): DepartmentAndStaffType => ({
    userList: [],
    departmentList: []
  }),
  getters: {
    getUserList: (state) => state.userList,
    getDepartmentList: (state) => state.departmentList
  },
  actions: {
    addDepartment(dep: DepartmentType) {
      this.departmentList.push(dep)
    },
    addStff(staff: StaffType) {
      this.userList.push(staff)
    }
  }
})

export function depStaff() {
  return depStaffStore(store)
}
