export interface treeSelectBaseType {
  label: string
  key: string | number | boolean | null
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
  rule?: any
  maxlength?: number
  otherProps?: any
  valueType?: 'number' | 'array'
  upadteValue?: (value: any) => void
}
