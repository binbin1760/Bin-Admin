<template>
  <n-drawer
    v-model:show="active"
    :width="400"
    :show-mask="false"
  >
    <n-drawer-content title="查看员工信息">
      <AsyncBaseForm
        ref="asyncBaseForm"
        :model="data"
        :config="config"
        :grid-span="12"
        :x-gap="10"
        :y-gap="1"
        :label-width="110"
        :disabled="true"
        :show-foot="false"
      />
    </n-drawer-content>
  </n-drawer>
</template>

<script setup lang="ts">
  import { STAFF_STATUS } from '../../baseType'
  import { AsyncBaseForm, AsyncBaseFormConfig } from '@/components'
  import { StaffType } from '@/views/view-department/baseType'

  const active = defineModel('active', { type: Boolean, default: false })
  const data = defineModel('data', {
    type: Object as PropType<StaffType>
  })
  //form config
  const config = ref<Array<AsyncBaseFormConfig>>([
    {
      type: 'input',
      label: '员工名称',
      path: 'name',
      value: null,
      rule: {
        required: true,
        message: '员工名称不能为空',
        trigger: ['blur']
      }
    },
    {
      type: 'number',
      label: '员工编号',
      path: 'code',
      value: null,
      rule: {
        type: 'number',
        required: true,
        message: '员工编号不能为空',
        trigger: ['blur']
      }
    },
    {
      type: 'input',
      label: 'E-mail',
      path: 'email',
      value: null,
      rule: {
        required: true,
        message: 'E-mail不能为空',
        trigger: ['blur']
      }
    },
    {
      type: 'input',
      label: '联系电话',
      path: 'phone',
      value: null,
      rule: {
        required: true,
        message: '联系电话不能为空',
        trigger: ['blur']
      }
    },
    {
      type: 'input',
      label: '所属部门',
      path: 'department',
      value: null
    },
    {
      type: 'tree-select',
      label: '直属领导',
      path: 'directSuperior',
      value: null,
      options: [
        {
          label: '顶级部门',
          key: '321321',
          children: [
            { label: '子部门1', key: '1' },
            { label: '子部门2', key: '56456' },
            { label: '子部门3', key: '11114' }
          ]
        }
      ]
    },
    {
      type: 'select',
      label: '职位',
      path: 'position',
      value: null,
      options: [
        { label: '员工', value: 1 },
        { label: '管理', value: 2 }
      ]
    },
    {
      type: 'select',
      label: '状态',
      path: 'status',
      value: null,
      options: [
        { label: STAFF_STATUS.STAFF_STATUS_1, value: 1 },
        { label: STAFF_STATUS.STAFF_STATUS_2, value: 2 },
        { label: STAFF_STATUS.STAFF_STATUS_3, value: 3 }
      ]
    }
  ])
</script>
<style scoped lang="less"></style>
