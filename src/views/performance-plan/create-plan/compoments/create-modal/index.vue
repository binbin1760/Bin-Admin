<template>
  <n-modal
    style="width: 480px"
    v-model:show="show"
    preset="card"
    title="新增部门"
    :on-esc="onCLoseModalClearModel"
  >
    <AsyncBaseForm
      ref="asyncBaseForm"
      :model="createModel"
      :config="createPlanModalConfig"
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
  import { usePlanHooks } from '@/views/performance-plan/usePlanHooks'
  import { AsyncBaseForm } from '@/components'
  const show = defineModel('show', { type: Boolean, default: false })
  const asyncBaseForm = ref<any>(null)
  const { createModel, createPlanModalConfig } = usePlanHooks()
  function onCLoseModalClearModel() {
    show.value = false
    asyncBaseForm.value?.reSetFormValue()
  }

  function cancelFn() {
    show.value = false
    asyncBaseForm.value?.reSetFormValue()
  }

  function confirmFn() {}
</script>
<style scoped lang="less"></style>
