import { ref, nextTick } from 'vue'

export const useScrollHook = (containRef: any, contentRef: any) => {
  const scrollEnable = ref<boolean>(true)
  const lastScrollHeight = ref<number>(0)
  const scrollToBottom = async () => {
    if (!scrollEnable.value && !containRef.value) return
    await nextTick()
    if (lastScrollHeight.value !== containRef.value.scrollHeight) {
      containRef.value.scrollTop = containRef.value.scrollHeight
      lastScrollHeight.value = containRef.value.scrollHeight
    }
  }

  const toggleAutoScroll = (enabled: boolean) => {
    scrollEnable.value = enabled
  }

  return {
    scrollToBottom,
    toggleAutoScroll
  }
}
