import { PropType } from 'vue'
/***
 * 1.不需要传递model 直接根据config生成model
 * 2.formItem之间的联动
 * 3.表单项支持横向，纵向布局
 */

export type ComponentName =
  | 'NCascader'
  | 'NInput'
  | 'DynamicCheckoutGroup'
  | 'NDatePicker'
  | 'NInputNumber'
  | 'DynamicRadioGroup'
  | 'NSelect'
  | 'NSwitch'
  | 'NTimePicker'
  | 'NTreeSelect'

export interface RealatedField {
  path: string //关联字段路径，支持多层级用点分开  eg:obj.key1.key2.key3.key4
  value: number | string //判断值
  callBack?: (targetItem: DynamicFormItem, item: DynamicFormItem) => void //当关联字段值发生变化时的回调函数
}

export interface baseRule {
  required: boolean
  message: string
  trigger: Array<string>
  type?: string
}

export interface DynamicFormItem {
  label: string
  path: string //字段路径，支持多层级用点分隔
  componentName: ComponentName
  value?:
    | string
    | number
    | boolean
    | Array<any>
    | Record<string, any>
    | undefined
    | null
  placeholder?: string
  options?: Array<Object>
  otherProps?: any
  realatedField?: RealatedField
  rule?: baseRule
}

export interface BtnConfig {
  text: string
  type: 'primary' | 'success' | 'warning' | 'error' | 'info' | 'default'
  valid?: boolean //是否需要校验数据
  callBack: (
    data: Record<string, any>,
    originalConf?: DynamicFormItem[]
  ) => void
}

export const props = {
  gridColumns: {
    type: String as PropType<string>,
    required: false,
    default: 'repeat(1,1fr)'
  },
  distributionDisplay: {
    type: Boolean as PropType<boolean>,
    required: false,
    default: false
  },
  config: {
    type: Array as PropType<Array<DynamicFormItem>>,
    required: true
  },
  btnConfig: {
    type: Array as PropType<Array<BtnConfig>>,
    required: false
  },
  placement: {
    type: String as PropType<'top' | 'left'>, //表单label对其方式
    required: false,
    default: 'left'
  },
  labelTextAlign: {
    type: String as PropType<'left' | 'right' | 'center'>, //表单label文本对齐方式
    required: false,
    default: 'right'
  },
  gap: {
    type: String as PropType<string>, //表单项之间的间距
    required: false,
    default: '0  20px'
  }
}
