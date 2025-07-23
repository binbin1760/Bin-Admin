import { format } from 'date-fns'

export type FormatStr =
  | 'yyyy-MM-dd HH:mm:ss'
  | 'yyyy-MM-dd'
  | 'HH:mm:ss'
  | 'yyyy/MM/dd HH:mm:ss'
  | 'yyyy/MM/dd'
export function formatDate(
  timeStamp: number,
  formatStr: FormatStr = 'yyyy-MM-dd HH:mm:ss'
) {
  if (!timeStamp) return ''
  return format(new Date(timeStamp), formatStr)
}

export function formatDateToTimeStamp(formatDate: FormatStr): number {
  const date = new Date(formatDate)
  return date.getTime()
}

export function formatTimeRange(
  timeRange: [number, number],
  formatStr: FormatStr = 'yyyy-MM-dd HH:mm:ss'
): [string, string] {
  return [
    formatDate(timeRange[0], formatStr),
    formatDate(timeRange[1], formatStr)
  ]
}

export function formatTimeRangeToTimeStamp(
  timeRange: [FormatStr, FormatStr]
): [number, number] {
  return [
    formatDateToTimeStamp(timeRange[0]),
    formatDateToTimeStamp(timeRange[1])
  ]
}

export function compareTowTime(
  timeStamp1: number | FormatStr,
  timeStamp2: number | FormatStr
) {
  const date1 =
    typeof timeStamp1 === 'number'
      ? timeStamp1
      : new Date(formatDateToTimeStamp(timeStamp1))
  const date2 =
    typeof timeStamp2 === 'number'
      ? timeStamp1
      : new Date(formatDateToTimeStamp(timeStamp2))
  return date1 > date2
}
