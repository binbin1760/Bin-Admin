<template>
  <n-modal
    v-model:show="show"
    style="width: 500px"
    preset="card"
    title="新增角色"
    :on-esc="onCLoseModalClearModel"
    @update-show="whenShowModal"
  >
    <AsyncBaseForm
      ref="asyncBaseForm"
      :model="roleModel"
      :config="roleFormCofnig"
      :cols="6"
      :x-gap="10"
      :y-gap="1"
      :label-width="110"
      @confirm="confirmFn"
    />
  </n-modal>
</template>

<script setup lang="ts">
  import { BaseRole } from '@/views/view-permissions/baseType'
  import { useRoleHooks } from '../../useRoleHook'
  import { AsyncBaseForm } from '@/components'
  import { addNewRole } from '@/api'
  const show = defineModel('show', { type: Boolean, default: false })
  const emit = defineEmits(['refresh'])
  const message = useMessage()
  const asyncBaseForm = ref()
  const { roleFormCofnig, roleModel } = useRoleHooks()

  async function confirmFn(_data: BaseRole) {
    _data.updateTime = Date.now()
    _data.createTime = Date.now()
    const res = await addNewRole(_data)
    if (res.code === 200) {
      message.success(res.message)
      emit('refresh')
      show.value = false
      asyncBaseForm.value?.reSetFormValue()
    } else {
      message.error(res.message)
    }
  }

  function whenShowModal() {
    if (!show) {
      asyncBaseForm.value?.reSetFormValue()
    }
  }

  function onCLoseModalClearModel() {
    asyncBaseForm.value?.reSetFormValue()
  }
</script>
<style scoped lang="less"></style>
