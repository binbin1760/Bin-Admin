<template>
  <n-modal
    style="width: 480px"
    v-model:show="showModal"
    preset="card"
    title="新增部门"
  >
    <AsyncBaseForm
      :model="model"
      :config="config"
      :grid-span="12"
      :x-gap="10"
      :y-gap="1"
      @cancel="cancelFn"
      @confirm="confirmFn"
    />
  </n-modal>
</template>

<script setup lang="ts">
  import { DepartmentType } from '../../baseType'
  import { AsyncBaseFormConfig, AsyncBaseForm } from '@/components'
  type Nullable<T> = {
    [K in keyof T]?: T[K] | null
  }
  const show = defineModel('show', { type: Boolean })
  const model = reactive<Nullable<DepartmentType>>({
    departmentId: null,
    departmentName: null,
    departmentLeader: null,
    departmentLevel: null,
    functional: null
  })

  const showModal = ref(show)
  //form config
  const config = ref<Array<AsyncBaseFormConfig>>([
    {
      type: 'input',
      label: '部门名称',
      path: 'model.departmentName',
      value: null
    },
    {
      type: 'select',
      label: '部门领导',
      path: 'model.departmentLeader',
      value: null,
      options: [
        { label: '张三', value: 'A123' },
        { label: '李三', value: 'B123' },
        { label: '王三', value: 'C123' }
      ]
    },
    {
      type: 'number',
      label: '部门等级',
      path: 'model.departmentLevel',
      value: null
    },
    {
      type: 'select',
      label: '部门类别',
      path: 'model.functional',
      value: null,
      options: [
        { label: '财务', value: 'A123' },
        { label: '职能', value: 'B123' },
        { label: '运营', value: 'C123' },
        { label: '综合', value: 'D123' }
      ]
    }
  ])

  function cancelFn(_data: DepartmentType) {
    showModal.value = false
  }
  function confirmFn(_data: DepartmentType) {
    showModal.value = false
  }

  watch(
    show,
    (newVal) => {
      showModal.value = newVal
    },
    { immediate: true }
  )
</script>
<style scoped lang="less"></style>
