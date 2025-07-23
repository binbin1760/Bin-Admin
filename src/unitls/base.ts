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
