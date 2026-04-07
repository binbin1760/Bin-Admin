<template>
  <div>
    <div>主页</div>
    <div>#todo list 重写 绩效方案模块的表格</div>
    <dynamicForm
      ref="dyRef"
      :grid-columns="gridColumns"
      :config="test"
      :btn-config="btn"
    />
  </div>
</template>

<script setup lang="ts">
  import { BtnConfig, dynamicForm, DynamicFormItem } from '@/components'
  import { evaluationCycleOptions } from '@/views/performance-plan/index'
  const gridColumns = 'repeat(2, 1fr)'
  const test = ref<DynamicFormItem[]>([
    {
      label: '方案名称:',
      path: 'name',
      value: '',
      componentName: 'NInput',
      placeholder: '请输入方案名称'
    },
    {
      label: '周期类型:',
      path: 'evaluationCycle',
      componentName: 'NSelect',
      value: 1,
      options: evaluationCycleOptions,
      realatedField: {
        path: 'cycle',
        value: 1,
        callBack: (target, current) => {
          if (current.value === 1) {
            target.otherProps.type = 'month'
          } else if (current.value === 2) {
            target.otherProps.type = 'quarter'
          } else if (current.value === 3) {
            target.otherProps.type = 'year'
          }
        }
      }
    },
    {
      label: '考核周期:',
      path: 'cycle',
      componentName: 'NDatePicker',
      value: null,
      otherProps: {
        type: 'month'
      }
    }
  ])
  const dyRef = ref<any>()
  const btn = ref<BtnConfig[]>([
    {
      text: '确 认',
      type: 'info',
      valid: true,
      callBack: (data: Record<string, any>) => {
        console.log(data)
      }
    },
    {
      text: '重 置',
      type: 'default',
      valid: false,
      callBack: (_data, originalConfig) => {
        if (originalConfig) {
          test.value = originalConfig
          dyRef.value?.resetForm()
        }
      }
    }
  ])
</script>
<style scoped lang="less"></style>
