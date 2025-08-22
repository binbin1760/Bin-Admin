import { AsyncBaseFormConfig } from '@/components'
import { BaseIndicator, DIMENSION_FIELDS, DivideParams } from './baseType'
import { ref, computed } from 'vue'
import { useUserAndDepSelectHook } from '@/hooks'
import { TreeSelectOption } from 'naive-ui'

export const useIndicatorHooks = () => {
  const { getDepChildNdoeData } = useUserAndDepSelectHook()

  const mode = ref<Nullable<BaseIndicator>>({
    name: null,
    dismension: null,
    des: null,
    executeTime: null,
    unit: null,
    target: null,
    examWay: null,
    score: 0,
    topIndicatorId: null,
    parentId: null,
    deep: 0, //初始化创建时深度为0，是一个游离节点
    progress: null,
    isUndertake: false
  })

  const editFormConfig = ref<AsyncBaseFormConfig[]>([
    {
      label: '指标名称',
      type: 'input',
      path: 'name',
      placeholder: '请输入指标名称',
      rule: {
        required: true,
        message: '请输入指标名称',
        trigger: ['blur']
      }
    },
    {
      label: '目标',
      type: 'number',
      path: 'target',
      placeholder: '请输入',
      rule: {
        type: 'number',
        required: true,
        message: '目标不能为空',
        trigger: ['blur']
      }
    },
    {
      label: '单位',
      type: 'input',
      path: 'unit',
      placeholder: '请输入',
      rule: {
        required: true,
        message: '单位不能为空',
        trigger: ['blur']
      }
    },
    {
      label: '考核方式',
      type: 'input',
      path: 'examWay',
      placeholder: '请输入',
      rule: {
        required: true,
        message: '考核方式不能为空',
        trigger: ['blur']
      }
    },
    {
      label: '维度',
      type: 'select',
      path: 'dismension',
      placeholder: '请选择',
      options: DIMENSION_FIELDS.map((item, index) => ({
        label: item,
        value: index
      })),
      rule: {
        required: true,
        type: 'number',
        message: '维度不能为空',
        trigger: ['blur']
      }
    },
    {
      label: '年度',
      type: 'date',
      path: 'executeTime',
      placeholder: '请选择',
      otherProps: {
        type: 'year'
      },
      rule: {
        required: true,
        type: 'number',
        message: '年度不能为空',
        trigger: ['blur']
      }
    },
    {
      label: '指标描述',
      path: 'des',
      type: 'textarea',
      otherProps: {
        maxlength: 1000,
        'show-count': true
      }
    }
  ])

  const viewFormConfig = computed(() => {
    return editFormConfig.value.map((item) => ({ ...item, disabled: true }))
  })

  async function getChildrenDep(option: TreeSelectOption) {
    const res = await getDepChildNdoeData(option.key as unknown as string)
    option.children = res as unknown as TreeSelectOption[]
  }
  return {
    mode,
    editFormConfig,
    viewFormConfig,
    getChildrenDep
  }
}
