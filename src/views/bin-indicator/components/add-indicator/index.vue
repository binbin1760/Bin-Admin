<template>
  <n-modal
    style="width: 600px"
    v-model:show="show"
    preset="card"
    title="创建指标"
    :on-esc="onCLoseModalClearModel"
  >
    <AsyncBaseForm
      ref="asyncBaseForm"
      :model="mode"
      :config="editFormConfig"
      :label-width="80"
      :grid-span="6"
      :x-gap="10"
      :y-gap="1"
      @cancel="cancelFn"
      @confirm="confirmFn"
    />
  </n-modal>
</template>

<script setup lang="ts">
  import { useIndicatorHooks } from '@/views/bin-indicator/indicatorHooks'
  import { BaseIndicator } from '../../baseType'
  import { createIndicator } from '@/api'
  import { AsyncBaseForm } from '@/components'
  const message = useMessage()
  const emit = defineEmits(['refresh'])
  const asyncBaseForm = ref<any>()
  const show = defineModel('show', { type: Boolean, default: false })

  const { mode, editFormConfig } = useIndicatorHooks()

  function onCLoseModalClearModel() {
    show.value = false
    asyncBaseForm.value?.reSetFormValue()
  }

  function cancelFn() {
    show.value = false
    asyncBaseForm.value?.reSetFormValue()
  }

  async function confirmFn(_data: BaseIndicator) {
    const res = await createIndicator(_data)
    if (res.code === 200) {
      message.success(res.message)
      emit('refresh')
      show.value = false
    } else {
      message.error(res.message)
    }
  }
</script>
<style scoped lang="less"></style>
