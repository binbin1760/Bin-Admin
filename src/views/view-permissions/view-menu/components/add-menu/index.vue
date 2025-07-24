<template>
  <n-modal
    v-model:show="show"
    style="width: 700px"
    preset="card"
    title="新增菜单"
    :on-esc="onCLoseModalClearModel"
  >
    <AsyncBaseForm
      ref="asyncBaseForm"
      :model="menuEditModel"
      :config="menuFormConfig"
      :cols="6"
      :x-gap="10"
      :y-gap="1"
      :label-width="110"
      @confirm="confirmFn"
      @cancel="cancelFn"
    />
  </n-modal>
</template>

<script setup lang="ts">
  import { BaseMenu } from '@/views/view-permissions/baseType'
  import { useMenuHook } from '../../useMenuHook'
  import { AsyncBaseForm } from '@/components'

  const show = defineModel('show', { type: Boolean, default: false })
  const emit = defineEmits(['refresh'])
  const { menuEditModel, menuFormConfig } = useMenuHook()
  const asyncBaseForm = ref()
  function onCLoseModalClearModel() {
    show.value = false
    asyncBaseForm.value?.reSetFormValue()
  }
  function cancelFn() {
    show.value = false
  }
  function confirmFn(_data: BaseMenu) {
    console.log(_data)
    emit('refresh')
  }
</script>
<style scoped lang="less"></style>
