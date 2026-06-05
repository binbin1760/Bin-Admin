export async function clickCopy(
  content: string,
  succ?: Function,
  fail?: Function
) {
  try {
    await navigator.clipboard.writeText(content)
    if (succ) {
      succ()
    }
  } catch (e) {
    if (fail) {
      fail()
    }
  }
}

/**
 * 生成全局唯一的随机ID
 * 组合：时间戳 + 随机字符串 + 自增计数器（确保绝对不重复）
 */
let uniqueIdCounter = 0
export function generateUniqueId(): string {
  // 自增计数器（防止同一毫秒内生成重复）
  uniqueIdCounter = (uniqueIdCounter + 1) % 10000

  // 1. 时间戳（精确到毫秒）
  const timestamp = Date.now().toString(36)

  // 2. 随机字符串
  const randomStr = Math.random().toString(36).substring(2, 10)

  // 3. 计数器补位
  const counter = uniqueIdCounter.toString(36).padStart(4, '0')

  // 拼接最终ID
  return `${timestamp}-${randomStr}-${counter}`
}
