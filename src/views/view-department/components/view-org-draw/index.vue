<template>
  <n-drawer
    :width="400"
    v-model:show="show"
    :show-mask="false"
  >
    <n-drawer-content title="编辑部门信息">
      <AsyncBeseForm
        ref="asyncBaseForm"
        :model="data"
        :config="editDepformConfig"
        :grid-span="12"
        :x-gap="10"
        :y-gap="1"
        :show-foot="false"
        :disabled="true"
      ></AsyncBeseForm>
    </n-drawer-content>
  </n-drawer>
</template>

<script setup lang="ts">
  import { DepartmentType } from '../../baseType'
  import { useDepartmentHook } from '../../useDepartmentHook'
  const show = defineModel('show', { type: Boolean, default: false })
  const data = defineModel('data', { type: Object as PropType<DepartmentType> })
  const asyncBaseForm = ref<any>(null)
  const { editDepformConfig } = useDepartmentHook()
</script>
<style scoped lang="less"></style>
