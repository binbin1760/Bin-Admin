import { ref } from 'vue'
import { AsyncBaseFormConfig } from '@/components'
import { BaseRole } from './baseType'

export const usePermissionHook = () => {
  const roleEditModel = ref<Nullable<BaseRole>>({
    name: null,
    description: null
  })
  const roleFormEditCofnig = ref<Array<AsyncBaseFormConfig>>([
    {
      type: 'input',
      label: '角色名称',
      path: 'name',
      placeholder: '请输入角色名称',
      rule: {
        required: true,
        message: '角色名称不能为空',
        trigger: ['blur']
      },
      gridSpan: 6
    },
    {
      type: 'textarea',
      label: '角色描述',
      path: 'description',
      placeholder: '请输入角色描述',
      rule: {
        required: true,
        message: '角色描述不能为空',
        trigger: ['blur']
      },
      gridSpan: 6
    }
  ])

  const roleFormViewConfig = computed((): Array<AsyncBaseFormConfig> => {
    const newConfigItem: Array<AsyncBaseFormConfig> = [
      {
        label: '创建人',
        type: 'input',
        path: 'creater',
        gridSpan: 6
      },
      {
        label: '创建时间',
        type: 'input',
        path: 'createTime',
        gridSpan: 6
      },
      {
        label: '更新时间',
        type: 'input',
        path: 'updateTime',
        gridSpan: 6
      }
    ]
    return roleFormEditCofnig.value.concat(newConfigItem)
  })

  return {
    roleEditModel,
    roleFormEditCofnig,
    roleFormViewConfig
  }
}
