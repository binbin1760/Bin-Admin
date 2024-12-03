//组织部门全部数据类型
export interface DepartmentType {
  departmentId: string
  departmentName: string
  departmentLeader: string
  departmentLevel: string
  functional: '运营' | '职能'
}

export interface StaffType {
  id: string
  name: string
  position: string
  phone: string
  depInfo: DepartmentType
  rank: number
}
