<template>
  <n-drawer
    :width="400"
    v-model:show="show"
    :show-mask="true"
    :mask-closable="true"
  >
    <n-drawer-content
      title="编辑部门信息"
      closable
    >
      <AsyncBeseForm
        ref="asyncBaseForm"
        :model="data"
        :config="editDepformConfig"
        :grid-span="12"
        :x-gap="10"
        :y-gap="1"
        @cancel="cancelFn"
        @confirm="confirmFn"
      ></AsyncBeseForm>
    </n-drawer-content>
  </n-drawer>
</template>

<script setup lang="ts">
  import { DepartmentType } from '../../baseType'
  import { editDepartment } from '@/api'
  import { useDepartmentHook } from '../../useDepartmentHook'
  const message = useMessage()
  const emit = defineEmits(['refresh'])
  const show = defineModel('show', { type: Boolean, default: false })
  const data = defineModel('data', { type: Object as PropType<DepartmentType> })
  const { editDepformConfig } = useDepartmentHook()
  const asyncBaseForm = ref<any>(null)
  function cancelFn(_data: DepartmentType) {
    show.value = false
  }
  async function confirmFn(_data: DepartmentType) {
    const res = await editDepartment(_data)
    message.info(res.message, { duration: 3000, closable: true })
    if (res.code === 200) {
      asyncBaseForm.value?.reSetFormValue()
      show.value = false
      emit('refresh')
    }
  }
</script>
<style scoped lang="less"></style>
