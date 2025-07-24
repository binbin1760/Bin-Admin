export interface treeSelectBaseType {
  label: string
  key: string | number | boolean | null
}

export interface baseRule {
  required: boolean
  message: string
  trigger: Array<string>
  type?: string
}
export interface AsyncBaseFormConfig {
  type:
    | 'input'
    | 'select'
    | 'date'
    | 'textarea'
    | 'number'
    | 'checkbox'
    | 'radio'
    | 'tree-select'
  label: string
  path: string
  placeholder?: string
  value?: string | number | boolean | null
  disabled?: boolean
  gridSpan?: number
  options?: any[]
  rule?: baseRule
  maxlength?: number
  otherProps?: any
  valueType?: 'number' | 'array'
  upadteValue?: (value: any) => void
}
