export type EvaluationCycle = 1 | 2 | 3 //考核周期  1.月度 ，2.季度 ，3.年度

export type EvaluationSubject = 1 | 2 //考核对象 1.组织  2.个人

export type Status = 1 | 2 //状态 1.草稿 2.发布

export type NdatePickerType = 'month' | 'quarter' | 'year' | undefined

export interface PerformancePlan {
  name: string
  evaluationCycle: EvaluationCycle
  cycle: number
  evaluationSubject: EvaluationSubject
  subjectName: string
  subjectId: string
  status: Status
}

export interface PlanTable {
  id: string
  name: string
  evaluationCycle: EvaluationCycle
  cycle: number
  evaluationSubject: EvaluationSubject
  subjectName: string
  subjectId: string
  status: Status
  createTime: number
  updateTime: number
}

export interface PlanSearchParams {
  name?: string //绩效方案名称
  evaluationCycle?: number //考核周期  1.月度 ，2.季度 ，3.年度
  cycle?: number //周期
  evaluationSubject?: number //考核对象 1.组织  2.个人
  subjectId?: string //考核对象ID  组织ID或者个人ID
  status?: Status //状态 1.草稿 2.发布
  page: number //页码
  pageSize: number //每页条数
}

export interface PlanListDataFileterParams {
  name?: string
  evaluationCycle?: number | null
  cycle?: number | null
  evaluationSubject?: number | null
  status?: number | null
  subjectId?: string | null
}

export const evaluationCycleOptions = [
  { label: '月度', value: 1 },
  { label: '季度', value: 2 },
  { label: '年度', value: 3 }
]

export const evaluationSubjectOptions = [
  { label: '组织', value: 1 },
  { label: '个人', value: 2 }
]

export const statusOptions = [
  { label: '草稿', value: 1 },
  { label: '发布', value: 2 }
]
