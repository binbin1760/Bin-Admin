import { BaseButton, BaseMenu, YES_OR_NO_FIELD } from '../baseType'
import { useAsyncRouteStore } from '@/store/modules/asyncRoutes'
import { AsyncBaseFormConfig } from '@/components'
import { ref, computed } from 'vue'

export const useMenuHook = (
  buttonNamePattern?: (name: string) => void,
  buttonCodePattern?: (code: string) => void
) => {
  const useAsyncRoute = useAsyncRouteStore()

  //菜单配置
  const menuEditModel = ref<Nullable<BaseMenu>>({
    name: '',
    path: '',
    sort: null,
    redirect: '',
    hidden: true,
    isRoot: false,
    affix: false,
    pid: null
  })

  const menuFormConfig = computed((): Array<AsyncBaseFormConfig> => {
    return [
      {
        label: '父级菜单',
        path: 'pid',
        type: 'tree-select',
        gridSpan: 6,
        options: useAsyncRoute.getTreeSelectOptions,
        otherProps: {
          clearable: true
        }
      },
      {
        label: '名称',
        path: 'name',
        gridSpan: 6,
        type: 'input',
        rule: {
          required: true,
          message: '请输入菜单名称',
          trigger: ['blur']
        }
      },
      {
        label: '导航路径',
        path: 'path',
        type: 'input',
        gridSpan: 6,
        rule: {
          required: true,
          message: '请输入导航路径',
          trigger: ['blur']
        }
      },
      {
        label: '重定向路径',
        path: 'redirect',
        type: 'input',
        gridSpan: 6,
        rule: {
          required: true,
          message: '请输入重定向路径',
          trigger: ['blur']
        }
      },
      {
        label: '序号',
        path: 'sort',
        type: 'number',
        gridSpan: 6,
        otherProps: {
          'show-button': false
        },
        rule: {
          required: true,
          message: '请输入排序需要的序号',
          type: 'number',
          trigger: ['blur']
        }
      },
      {
        label: '是否是侧栏菜单',
        path: 'hidden',
        type: 'radio',
        gridSpan: 6,
        options: [
          {
            label: YES_OR_NO_FIELD[1],
            value: true
          },
          {
            label: YES_OR_NO_FIELD[0],
            value: false
          }
        ],
        rule: {
          type: 'boolean',
          required: true,
          message: '请确认新菜单是否是侧栏菜单',
          trigger: ['change']
        }
      },
      {
        label: '是否固定标签页TAG',
        path: 'affix',
        type: 'radio',
        options: [
          {
            label: YES_OR_NO_FIELD[1],
            value: true
          },
          {
            label: YES_OR_NO_FIELD[0],
            value: false
          }
        ],
        gridSpan: 6,
        rule: {
          type: 'boolean',
          required: true,
          message: '请确认新菜单是否需要固定标签页的TAG',
          trigger: ['change']
        }
      },
      {
        label: '是否为根节点',
        path: 'isRoot',
        type: 'radio',
        gridSpan: 6,
        options: [
          {
            label: YES_OR_NO_FIELD[1],
            value: true
          },
          {
            label: YES_OR_NO_FIELD[0],
            value: false
          }
        ],
        rule: {
          type: 'boolean',
          required: true,
          message: '请确认新菜单是否为最外层菜单（根节点）',
          trigger: ['change']
        }
      }
    ]
  })
  //按钮配置
  const buttonModel = ref<Nullable<BaseButton>>({
    name: null,
    code: null,
    description: null,
    path: null
  })

  const buttonFormConfig = ref<Array<AsyncBaseFormConfig>>([
    {
      label: '按钮名称',
      type: 'input',
      path: 'name',
      gridSpan: 6,
      rule: {
        required: true,
        message: '请输入按钮名称',
        trigger: ['blur']
      },
      upadteValue: (value) => {
        buttonNamePattern && buttonNamePattern(value)
      }
    },
    {
      label: '权限编码',
      type: 'input',
      path: 'code',
      gridSpan: 6,
      rule: {
        required: true,
        message: '请输入权限编码',
        trigger: ['blur']
      },
      upadteValue: (value) => {
        buttonCodePattern && buttonCodePattern(value)
      }
    },
    {
      label: '按钮描述',
      type: 'textarea',
      path: 'description',
      maxlength: 500,
      gridSpan: 6,
      placeholder: '请描述该按钮的功能,一些使用条件或使用时的注意事项',
      rule: {
        required: true,
        message: '请输入按钮描述',
        trigger: ['blur']
      },
      otherProps: {
        'show-count': true
      }
    }
  ])

  return {
    menuEditModel,
    menuFormConfig,
    buttonModel,
    buttonFormConfig
  }
}
