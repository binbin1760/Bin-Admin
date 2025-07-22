<template>
  <n-modal
    style="width: 600px"
    v-model:show="show"
    preset="card"
    title="新增部门"
    :on-esc="onCLoseModalClearModel"
  >
    <AsyncBaseForm
      ref="asyncBaseForm"
      :model="depFormModel"
      :config="depFormConfig"
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
  import { DepartmentType } from '../../baseType'
  import { AsyncBaseForm } from '@/components'
  import { addDepartment } from '@/api'
  import { depStaffStore } from '@/store/modules/departmentAndStaff'
  import { useDepartmentHook } from '../../useDepartmentHook'

  const message = useMessage()
  const asyncBaseForm = ref<any>(null)
  const emit = defineEmits(['refresh'])
  const parentInfo = defineModel('parent', {
    type: Object as PropType<DepartmentType>
  })
  const useDepStaffStore = depStaffStore()
  const show = defineModel('show', { type: Boolean, default: false })
  const { depFormConfig, depFormModel } = useDepartmentHook()

  function cancelFn(_data: DepartmentType) {
    show.value = false
  }

  function onCLoseModalClearModel() {
    show.value = false
    asyncBaseForm.value?.reSetFormValue()
  }

  async function confirmFn(_data: Nullable<DepartmentType>) {
    const parentDep = useDepStaffStore.getCurrentSelectDep
    _data.parentName = parentDep.depName
    _data.parentId = parentDep.depId
    _data.treeLevel = parentDep.treeLevel ? parentDep.treeLevel + 1 : 1
    if (parentDep.treeLevel !== 0 && !parentDep.treeLevel) {
      message.error('节点层级异常')
    } else {
      const res = await addDepartment(_data as DepartmentType)
      message.success(res.message)
      show.value = false
      emit('refresh')
    }
  }
</script>
<style scoped lang="less"></style>
