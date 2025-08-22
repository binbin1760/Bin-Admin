export interface BaseIndicator {
  id: string
  name: string //指标名称
  deep: number //指标树的深度
  dismension: 0 | 1 | 2 | 3 //维度
  isUndertake: boolean //是否为承接指标
  des: string // 指标描述
  executeTime: number //年度 =>采用时间戳
  unit: string //单位
  target: number //目标
  progress: string //实际完成<进度>
  progressWeight: string //进度<百分比>
  examWay: string // 考核方式
  score: number // 指标得分
  creator?: string //创建人
  creatorId?: string //创建人id
  updateTime?: number //更新时间
  createTime?: number //创建时间
  topIndicatorId?: string //所属指标树根节点指标id
  parentId?: string //父级指标id
}

export interface baseIndicatorDivideInfo {
  id: string
  type: 0 | 1
  ownerId: string
  ownerName: string
  ownerCode: number
  createTime: number
  updateTime: number
}

export interface DivideParams {
  type: 0 | 1 // 0.分解给人,1.分解给部门
  ownerId: string
  ownerName: string
  ownerCode: number
  indicatorId: string
  des: string
  target: number
  unit: string
  examWay: string
}

export const DIMENSION_FIELDS = ['客户', '成本', '运营', '培训', '其他']

export interface IndicatorTree extends BaseIndicator {
  children: IndicatorTree[]
  divideInfo?: Nullable<DivideParams>
}

export interface EditIndicatorParams extends BaseIndicator {
  divideInfo?: DivideParams
}

export interface indicatorInTable extends IndicatorTree {
  divideInfo: Nullable<DivideParams>
}

export interface DeleteNodeParams {
  isKeepChild: boolean
  id: string
  deep: number
  parentId?: string
  allChildrenIds?: Array<string>
  childrenIds?: Array<string>
}
