import { BaseResponse } from '@/unitls/request'
import request from '@/unitls/request'
import {
  PerformancePlan,
  PlanTable,
  PlanSearchParams
} from '@/views/performance-plan/index'

export function createPlan(data: PerformancePlan): Promise<BaseResponse<null>> {
  return request.post('/api/post/plan/create', data)
}

export function getPlanList(
  data: PlanSearchParams
): Promise<BaseResponse<PlanTable[]>> {
  return request.post('/api/post/plan/list', data)
}
