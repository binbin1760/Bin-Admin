<template>
  <n-drawer
    :width="400"
    v-model:show="show"
    :show-mask="true"
    :mask-closable="true"
  >
    <n-drawer-content
      title="菜单配置"
      closable
    >
      <AsyncBaseForm
        ref="asyncBaseForm"
        :model="data"
        :config="menuFormConfig"
        :cols="6"
        :x-gap="10"
        :y-gap="1"
        :label-width="110"
        @confirm="confirmFn"
        @cancel="cancel"
      />
    </n-drawer-content>
  </n-drawer>
</template>

<script setup lang="ts">
  import { BaseMenu } from '@/views/view-permissions/baseType'
  import { useMenuHook } from '../../useMenuHook'
  import { AsyncBaseForm } from '@/components'
  import { editOrAddSidemenu } from '@/api'

  const message = useMessage()
  const show = defineModel('show', { type: Boolean, default: false })
  const data = defineModel('data', { type: Object })
  const emit = defineEmits(['refresh'])

  const { menuFormConfig } = useMenuHook()
  const asyncBaseForm = ref()
  async function confirmFn(_data: BaseMenu) {
    const res = await editOrAddSidemenu(_data)
    if (res.code === 200) {
      message.success(res.message)
      show.value = false
      emit('refresh')
    } else {
      message.error(res.message)
    }
  }
  function cancel() {
    show.value = false
  }
</script>
<style scoped lang="less">
  .edit-menu-button {
    display: flex;
    flex-direction: column;
  }
  .add-btn-form,
  .edit-menu-form {
    display: flex;
    flex-direction: column;
  }
</style>
