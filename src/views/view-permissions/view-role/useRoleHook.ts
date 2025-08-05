import { ref } from 'vue'
import { BaseMenu, BaseRole } from '../baseType'
import { AsyncBaseFormConfig } from '@/components'
import { TreeOption } from 'naive-ui'

export const useRoleHooks = () => {
  const roleModel = ref<Nullable<BaseRole>>({
    name: null,
    code: null,
    description: null,
    creater: null,
    createrId: null,
    createTime: null,
    updateTime: null
  })
  const roleFormCofnig = ref<Array<AsyncBaseFormConfig>>([
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
      type: 'input',
      label: '角色编码',
      path: 'code',
      placeholder: '请输入角色编码',
      rule: {
        required: true,
        message: '角色编码不能为空',
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
      gridSpan: 6,
      otherProps: {
        'show-count': true,
        maxlength: 500
      }
    }
  ])

  const roleMenuIds = Array<string>()

  const roleButtonIds = Array<string>()

  function generateMenuTreeData(data: Array<BaseMenu>): Array<TreeOption> {
    return data.map((item) => {
      const treeNode: TreeOption = {
        key: item.id,
        label: item.name,
        nodeData: item
      }
      if (item.children && item.children.length > 0) {
        treeNode.children = generateMenuTreeData(item.children)
      }
      return treeNode
    })
  }

  return {
    roleModel,
    roleFormCofnig,
    roleMenuIds,
    roleButtonIds,
    generateMenuTreeData
  }
}
