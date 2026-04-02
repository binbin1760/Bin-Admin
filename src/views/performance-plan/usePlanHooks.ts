import { AsyncBaseFormConfig } from '@/components'
import {
  evaluationCycleOptions,
  PerformancePlan,
  evaluationSubjectOptions
} from './index'
import { useUserAndDepSelectHook } from '@/hooks'
import { reactive, ref, watch } from 'vue'

export const usePlanHooks = () => {
  const { initData, initDepData, depOnload, userOnLoad } =
    useUserAndDepSelectHook()

  const createModel = reactive<Nullable<PerformancePlan>>({
    name: '',
    evaluationCycle: 1,
    cycle: null,
    evaluationSubject: 1,
    subjectName: '',
    subjectId: '',
    status: 1
  })
  const createPlanModalConfig = ref<Array<AsyncBaseFormConfig>>([
    {
      type: 'input',
      label: '方案名称:',
      path: 'name',
      placeholder: '请输入绩效方案名称',
      value: null
    },
    {
      type: 'select',
      label: '周期类型:',
      path: 'evaluationCycle',
      placeholder: '请选择周期类型',
      options: evaluationCycleOptions
    },
    {
      type: 'date',
      label: '考核周期:',
      path: 'cycle',
      otherProps: {
        type: 'month'
      }
    },
    {
      type: 'select',
      label: '对象类型:',
      path: 'evaluationSubject',
      placeholder: '对象类型',
      options: evaluationSubjectOptions
    },
    {
      type: 'tree-select',
      label: '考核对象:',
      path: 'subjectId',
      placeholder: '请选择考的组织',
      options: [initDepData.value],
      otherProps: {
        'on-load': depOnload
      }
    }
  ])

  watch(
    createModel,
    (newVal) => {
      createPlanModalConfig.value.forEach((item: AsyncBaseFormConfig) => {
        if (item.path === 'cycle') {
          if (newVal.evaluationCycle === 1) {
            item.otherProps.type = 'month'
          } else if (newVal.evaluationCycle === 2) {
            item.otherProps.type = 'quarter'
          } else if (newVal.evaluationCycle === 3) {
            item.otherProps.type = 'year'
          }
        }

        if (item.path === 'subjectId') {
          if (newVal.evaluationSubject === 1) {
            item.options = [initDepData.value]
            item.otherProps['on-load'] = depOnload
            item.placeholder = '请选择考的组织'
          }

          if (newVal.evaluationSubject === 2) {
            item.options = [initData.value]
            item.otherProps['on-load'] = userOnLoad
            item.placeholder = '请选择考核的员工'
          }
        }
      })
    },
    {
      deep: true
    }
  )
  return {
    createModel,
    createPlanModalConfig
  }
}
