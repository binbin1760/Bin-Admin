<template>
  <n-modal
    v-model:show="show"
    style="width: 700px"
    preset="card"
    title="新增员工"
    ::on-esc="onCLoseModalClearModel"
  >
    <AsyncBaseForm
      ref="asyncBaseForm"
      :model="userFormModel"
      :config="userFormConfig"
      :grid-span="6"
      :x-gap="10"
      :y-gap="1"
      :label-width="110"
      @confirm="confirmFn"
      @cancel="cancelFn"
    />
  </n-modal>
</template>

<script setup lang="ts">
  import { StaffType } from '../../baseType'
  import { AsyncBaseForm } from '@/components'
  import { useDepartmentHook } from '../../useDepartmentHook'
  import { depStaffStore } from '@/store/modules/departmentAndStaff'
  import { addUser } from '@/api'

  const { userFormModel, userFormConfig } = useDepartmentHook()
  const message = useMessage()
  const emit = defineEmits(['refreshTable'])
  const asyncBaseForm = ref<any>()
  const show = defineModel('show', { type: Boolean, default: false })
  const useDepStaffStore = depStaffStore()

  function onCLoseModalClearModel() {
    show.value = false
    asyncBaseForm.value?.reSetFormValue()
  }

  async function confirmFn(_data: StaffType) {
    const parentDep = useDepStaffStore.getCurrentSelectDep
    if (parentDep.depId && parentDep.depName) {
      _data.department = parentDep.depName
      _data.departmentId = parentDep.depId
      const res = await addUser(_data)
      message.info(res.message)
      if (res.code === 200) {
        show.value = false
        emit('refreshTable')
      }
    }
  }

  function cancelFn() {
    show.value = false
  }
</script>
<style scoped lang="less"></style>
