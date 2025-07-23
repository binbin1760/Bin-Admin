<template>
  <n-drawer
    v-model:show="active"
    :width="400"
    :show-mask="false"
  >
    <n-drawer-content title="编辑员工信息">
      <AsyncBaseForm
        ref="asyncBaseForm"
        :model="data"
        :config="userFormEditConfig"
        :grid-span="12"
        :x-gap="10"
        :y-gap="1"
        :label-width="110"
        @confirm="confirmFn"
        @cancel="cancelFn"
      />
    </n-drawer-content>
  </n-drawer>
</template>

<script setup lang="ts">
  import { AsyncBaseForm } from '@/components'
  import { editUserInfo } from '@/api/userInfo'
  import { StaffType } from '@/views/view-department/baseType'
  import { useDepartmentHook } from '../../useDepartmentHook'
  const active = defineModel('active', { type: Boolean, default: false })
  const data = defineModel('data', {
    type: Object as PropType<StaffType>
  })
  const emit = defineEmits(['refresh'])
  const { userFormEditConfig } = useDepartmentHook()
  //form config
  const asyncBaseForm = ref<any>()
  const message = useMessage()
  //submit add user form
  async function confirmFn(_data: StaffType) {
    const res = await editUserInfo(_data)
    message.info(res.message, { duration: 3000, closable: true })
    if (res.code === 200) {
      active.value = false
      asyncBaseForm.value?.reSetFormValue()
      emit('refresh')
      return
    }
  }

  function cancelFn() {
    active.value = false
  }
</script>
<style scoped lang="less"></style>
