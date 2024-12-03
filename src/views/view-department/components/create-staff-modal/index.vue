<template>
  <n-modal
    v-model:show="showModal"
    style="width: 480px"
    preset="card"
    title="新增员工"
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
  import { StaffType } from '../../baseType'
  import { AsyncBaseFormConfig, AsyncBaseForm } from '@/components'
  type Nullable<T> = {
    [K in keyof T]?: T[K] | null
  }
  const show = defineModel('show', { type: Boolean })
  const model = reactive<Nullable<StaffType>>({
    name: null,
    position: null,
    phone: null,
    rank: null
  })

  const showModal = ref(show)
  //form config
  const config = ref<Array<AsyncBaseFormConfig>>([
    {
      type: 'input',
      label: '员工名称',
      path: 'model.name',
      value: null
    },
    {
      type: 'select',
      label: '员工职位',
      path: 'model.position',
      value: null,
      options: [
        { label: '张三', value: 'A123' },
        { label: '李三', value: 'B123' },
        { label: '王三', value: 'C123' }
      ]
    },
    {
      type: 'number',
      label: '联系方式',
      path: 'model.phone',
      value: null
    },
    {
      type: 'number',
      label: '职级',
      path: 'model.rank',
      value: null
    }
  ])

  function cancelFn(_data: StaffType) {
    showModal.value = false
  }
  function confirmFn(_data: StaffType) {
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
