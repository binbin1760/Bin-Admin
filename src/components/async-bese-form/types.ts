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
  options?: { label: string; value: string | number | boolean | null }[]
  rules?: any[]
  maxlength?: number
  otherProps?: any
}
