import { BaseResponse, request } from '@/unitls'
import {
  PerformancePlan,
  PlanTable,
  PlanSearchParams
} from '@/views/performance-plan/index'

export function createPlan(data: PerformancePlan): Promise<BaseResponse<null>> {
  return request({
    url: '/api/post/plan/create',
    method: 'post',
    data
  })
}

export function getPlanList(
  data: PlanSearchParams
): Promise<BaseResponse<PlanTable[]>> {
  return request({
    url: '/api/post/plan/list',
    method: 'post',
    data
  })
}
