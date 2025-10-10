<template>
  <n-drawer
    v-model:show="show"
    :width="502"
    @after-leave="cancelSubmit"
  >
    <n-drawer-content
      title="节点配置"
      closable
    >
      <n-form
        ref="formRef"
        :label-width="80"
        :model="mode"
        :rules="rules"
      >
        <n-form-item
          label="节点名称"
          path="name"
        >
          <n-input
            v-model:value="mode.name"
            :maxlength="250"
            :show-count="true"
            placeholder="请输入"
          />
        </n-form-item>
        <n-form-item
          path="flowNodeId"
          label="组件名称"
        >
          <n-select
            v-model:value="mode.flowNodeId"
            :options="flowNodeOptions"
            placeholder="请选择"
          />
        </n-form-item>
        <n-form-item
          label="组件路径"
          path="path"
        >
          <n-input
            v-model:value="mode.path"
            :maxlength="250"
            :show-count="true"
            placeholder="请输入"
          />
        </n-form-item>
      </n-form>
      <template #footer>
        <div class="draw-footer">
          <n-button
            type="default"
            @click="cancelSubmit"
          >
            取 消
          </n-button>
          <n-button
            type="primary"
            @click="submitRelation"
          >
            提 交
          </n-button>
        </div>
      </template>
    </n-drawer-content>
  </n-drawer>
</template>

<script setup lang="ts">
  import { LogicFlow } from '@logicflow/core'
  import { workFlowStore } from '@/store/modules/workFlow'
  import { storeToRefs } from 'pinia'
  import { createFLowNodeRelation } from '@/views/system-setting/base'
  import { addFlowNodeRelation } from '@/api'
  import { FormRules } from 'naive-ui'

  const formRef = ref<any>(null)
  const useWorkFlow = workFlowStore()

  const { selectFlow, flowNodeOptions } = storeToRefs(useWorkFlow)
  const props = defineProps<{
    node?: LogicFlow.NodeConfig
  }>()

  const show = defineModel('show', { required: true, default: false })
  const emit = defineEmits(['cancel', 'confirm'])
  const mode = reactive({
    path: '',
    name: '',
    flowNodeId: null
  })
  const rules = {
    path: {
      type: 'string',
      required: true,
      message: '组件路径不能为空',
      trigger: ['blur']
    },
    name: {
      type: 'string',
      required: true,
      message: '节点名称不能为空',
      trigger: ['blur']
    },
    flowNodeId: {
      type: 'string',
      required: true,
      message: '请选择组件',
      trigger: ['change', 'blur']
    }
  } as FormRules

  async function submitRelation() {
    if (props.node) {
      const data: createFLowNodeRelation = {
        name: mode.name,
        path: mode.path,
        flowNodeId: mode.flowNodeId ?? '',
        x: props.node.x,
        y: props.node.y,
        workFlowId: selectFlow.value ? selectFlow.value.id : '',
        type: props.node.type
      }

      const canSubmit = ['x', 'y', 'workFlowId', 'type'].every(
        (item) => data[item]
      )

      console.log(data)

      formRef.value?.validate(async (errors: Error) => {
        if (!errors && canSubmit) {
          const res = await addFlowNodeRelation(data)
          if (res.code === 200) {
            emit('confirm', props.node)
            show.value = false
          }
        }
      })
    }
  }

  function cancelSubmit() {
    show.value = false
    emit('cancel', props.node)
  }
</script>
<style scoped lang="less">
  .draw-footer {
    width: 100%;
    display: flex;
    justify-content: flex-end;
    gap: 12px;
  }
</style>
