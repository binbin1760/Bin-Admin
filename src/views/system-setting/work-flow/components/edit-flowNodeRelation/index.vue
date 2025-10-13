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
  import { workFlowStore } from '@/store/modules/workFlow'
  import { storeToRefs } from 'pinia'
  import { EditRelationBase } from '@/views/system-setting/base'
  import { getFlowNodeDetailByIid, updateFlowNodeRelationBase } from '@/api'
  import { FormRules } from 'naive-ui'

  const formRef = ref<any>(null)
  const useWorkFlow = workFlowStore()

  const { flowNodeOptions } = storeToRefs(useWorkFlow)
  const props = defineProps<{
    id?: string
  }>()

  const show = defineModel('show', { required: true, default: false })
  const emit = defineEmits(['cancel', 'confirm'])
  const mode = reactive<{
    id: string
    path: string
    name: string
    flowNodeId: string | null
    type: string
  }>({
    id: '',
    path: '',
    name: '',
    flowNodeId: null,
    type: ''
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
    if (props.id) {
      const data: EditRelationBase = {
        id: props.id,
        name: mode.name,
        path: mode.path,
        flowNodeId: mode.flowNodeId ?? ''
      }

      formRef.value?.validate(async (errors: Error) => {
        if (!errors) {
          const res = await updateFlowNodeRelationBase(data)
          if (res.code === 200) {
            emit('confirm')
            show.value = false
          }
        }
      })
    }
  }

  function cancelSubmit() {
    show.value = false
  }

  async function getEditNode() {
    if (props.id) {
      const res = await getFlowNodeDetailByIid(props.id)
      if (res.code === 200) {
        mode.id = res.data.id
        mode.name = res.data.name
        mode.path = res.data.path
        mode.flowNodeId = res.data.flowNode.id
        mode.type = res.data.type
      }
    }
  }

  watch(props, () => {
    getEditNode()
  })
</script>
<style scoped lang="less">
  .draw-footer {
    width: 100%;
    display: flex;
    justify-content: flex-end;
    gap: 12px;
  }
</style>
