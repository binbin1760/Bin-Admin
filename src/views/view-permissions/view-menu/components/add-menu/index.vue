<template>
  <n-modal
    v-model:show="show"
    style="width: 700px"
    preset="card"
    title="新增菜单"
    :on-esc="onCLoseModalClearModel"
    @update-show="whenShowModal"
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
  import { addNewSideMenu } from '@/api'

  const show = defineModel('show', { type: Boolean, default: false })
  const emit = defineEmits(['refresh'])
  const message = useMessage()
  const { menuEditModel, menuFormConfig } = useMenuHook()
  const asyncBaseForm = ref()

  function onCLoseModalClearModel() {
    show.value = false
  }

  function whenShowModal(show: boolean) {
    if (!show) {
      asyncBaseForm.value?.reSetFormValue()
    }
  }

  function cancelFn() {
    show.value = false
  }
  async function confirmFn(_data: BaseMenu) {
    const res = await addNewSideMenu(_data)
    if (res.code === 200) {
      message.info(res.message)
      emit('refresh')
      show.value = false
    } else {
      message.error(res.message)
    }
  }
</script>
<style scoped lang="less"></style>
