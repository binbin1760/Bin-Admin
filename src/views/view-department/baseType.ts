//组织部门全部数据类型
export interface DepartmentType {
  id: string
  name: string
  code: number
  leaderId?: string
  leader?: string
  level: string //  组织架构种的层级(管理层面)
  treeLevel: number //在组织树种的层级
  agentLeaderId?: string //代理领导id
  agentLeader?: string //代理领导
  divisionLeaderId?: string //分管领导id
  divisionLeader?: string //分管领导
  tirLevel?: string // 分布层级
  operationOrFunction: 1 | 2 // 1.运营部门 2.职能部门
  dataEntryUser?: string //数据录入人
  dataEntryUserId?: string //数据录入人id
  isVirtualOrg?: boolean // 是否是虚拟组织
  parentId?: string
  parentName?: string
  createTime: number
  updateTime: number
  createrId: string
  creater: string
  description?: string
  children?: DepartmentType[] // 子部门
  isLeaf?: boolean //该部门在组织架构树中是否是叶子节点
  beInvolvedOrgKpi?: boolean //是否参与组织绩效考核
  beInvolvedOkr?: boolean //是否参与OKR考核
}

export const OPERATION_OR_FUNCTION = {
  OPERATION: 1, // 运营部门
  FUNCTION: 2 // 职能部门
}

export const TIRLEVEL = ['L0', 'LA', 'L1', 'L2', 'L3', 'L4', 'L5', 'L6', 'L7']

export const LEVEL = ['0', 'A', '1', '2', '3', '4', '5', '6', '7']

export const ISVIRTUALORG = {
  IS_VIRTUAL_ORG_TRUE: true,
  IS_VIRTUAL_ORG_FALSE: false
}

export const DEP_TYPE = {
  DEP_TYPE_1: '财务',
  DEP_TYPE_2: '职能',
  DEP_TYPE_3: '运营',
  DEP_TYPE_4: '综合'
}

export interface StaffType {
  id: string
  name: string
  code: number
  role: string
  companyTenure: number // 工龄
  hireDate: number
  secondaryHireDate: number
  directSuperior: string // 直接上级
  directSuperiorId: string // 直接上级id
  position: string // 职位
  sarayGroup: string // 薪资组
  jobLevel: string // 职级
  jobGrade: 1 | 2 | 3 // 序列： 1.M序列 2.P序列 3.S序列
  mGrade: string // M级
  pGrade: string // P级
  sGrade: string // S级
  noeGrade: string // 一级序列
  towGrade: string // 二级序列
  identity: number // 身份 1.正式员工 2.实习生 3.劳务派遣  4.外包人员
  status: 1 | 2 | 3
  agent: string // 代理人
  agentId: string // 代理人id
  agentStartTime: number // 代理开始时间
  agentEndTime: number // 代理结束时间
  agentTime: [number, number] //代理时间段
  department: string // 所属部门名称
  departmentId: string // 部门id
}
export const STAFF_STATUS = {
  STAFF_STATUS_1: '在职',
  STAFF_STATUS_2: '离职',
  STAFF_STATUS_3: '休假'
}

export const JOBGRADE = {
  M_GRADE: 1,
  P_GRADE: 2,
  S_GRADE: 3
}

export const JOB_GRADE_NAME = ['M序列', 'P序列', 'S序列']

export const IDENTITY = {
  IDENTITY_1: 1,
  IDENTITY_2: 2,
  IDENTITY_3: 3,
  IDENTITY_4: 4
}
export const IDENTITY_NAME = ['正式员工', '实习生', '劳务派遣', '外包人员']

export const STAFF_JOB_LEVEL = [
  'D1',
  'D2',
  'D3',
  'T1',
  'T2',
  'T3',
  'S1',
  'S2',
  'S3'
]
