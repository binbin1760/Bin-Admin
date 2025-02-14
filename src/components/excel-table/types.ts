import { CSSProperties } from 'vue'

export interface ColumnsType {
  title: string
  key: string
  textAlign: 'left' | 'center' | 'right'
  width?: number
  height?: number
  CSSProperty?: CSSProperties
  render?: (data: any) => VNode
}
