<template>
  <n-drawer
    style="width: 600px"
    v-model:show="show"
    placement="right"
    :show-mask="true"
    :mask-closable="true"
    display-directive="if"
    preset="card"
  >
    <n-drawer-content
      title="分解指标"
      closable
    >
      <n-space vertical>
        <!-- 验证信息表单 -->
        <n-form
          ref="indicatorFormRef"
          :model="indicator"
        >
          <n-form-item label="创建人">
            <n-input
              v-model:value="indicator.creator"
              disabled
            />
          </n-form-item>
          <n-form-item
            label="指标名称"
            path="name"
            :rule="{
              required: true,
              message: '请输入指标名称',
              type: 'string',
              trigger: ['blur']
            }"
          >
            <n-input
              v-model:value="indicator.name"
              placeholder="请输入指标名称"
              :disabled="indicator.deep !== 1 && indicator.deep !== 0"
            />
          </n-form-item>
          <n-form-item
            label="指标维度"
            path="dismension"
            :rule="{
              required: true,
              message: '请选择指标维度',
              type: 'number',
              trigger: ['blur', 'change']
            }"
          >
            <n-select
              v-model:value="indicator.dismension"
              :options="dimensionOptions"
              placeholder="请选择指标维度"
            />
          </n-form-item>
          <n-form-item
            label="年度"
            path="executeTime"
            :rule="{
              required: true,
              message: '请选择年份',
              type: 'number',
              trigger: ['blur', 'change']
            }"
          >
            <n-date-picker
              v-model:value="indicator.executeTime"
              type="year"
              placeholder="请选择年份"
            />
          </n-form-item>
          <n-form-item label="指标得分">
            <n-input-number
              v-model:value="indicator.score"
              placeholder="指标得分"
              disabled
            />
          </n-form-item>
          <n-form-item label="完成进度">
            <n-input
              v-model:value="indicator.progress"
              placeholder="请输入实际完成进度"
            />
          </n-form-item>
          <n-form-item
            label="指标目标"
            path="target"
            :rule="{
              required: true,
              message: '请设置指标目标值',
              type: 'number',
              trigger: ['blur']
            }"
          >
            <n-input-number
              v-model:value="indicator.target"
              placeholder="请输入目标值"
            />
          </n-form-item>
          <n-form-item
            label="单位"
            path="unit"
            :rule="{
              required: true,
              message: '请输入单位',
              type: 'string',
              trigger: ['blur']
            }"
          >
            <n-input
              v-model:value="indicator.unit"
              placeholder="请输入单位"
            />
          </n-form-item>
          <n-form-item
            label="考核方式"
            path="examWay"
            :rule="{
              required: true,
              message: '请输入考核方式',
              type: 'string',
              trigger: ['blur']
            }"
          >
            <n-input
              v-model:value="indicator.examWay"
              placeholder="请输入考核方式"
            />
          </n-form-item>
          <n-form-item
            label="指标描述"
            path="des"
            :rule="{
              required: true,
              message: '请输入指标描述',
              type: 'string',
              trigger: ['blur']
            }"
          >
            <n-input
              type="textarea"
              :maxlength="1000"
              :show-count="true"
              v-model:value="indicator.des"
              :placeholder="indicator.des"
            />
          </n-form-item>
          <n-form-item
            label="分解对象"
            path="divideInfo.type"
            :rule="{
              required: true,
              message: '请确认分解对象类型',
              type: 'number',
              trigger: ['blur', 'change']
            }"
          >
            <n-radio-group v-model:value="indicator.divideInfo.type">
              <n-radio
                v-for="(item, index) in divideTypeRadios"
                :key="index"
                :value="item.value"
              >
                {{ item.label }}
              </n-radio>
            </n-radio-group>
          </n-form-item>
          <n-form-item
            label="承接对象(员工)"
            v-if="indicator.divideInfo?.type === 0"
            path="divideInfo.ownerId"
            :rule="{
              required: true,
              message: '请选择承接对象',
              type: 'string',
              trigger: ['blur', 'change']
            }"
          >
            <n-tree-select
              placement="top"
              v-model:value="indicator.divideInfo.ownerId"
              :placeholder="indicator.divideInfo.ownerName ?? '请选择'"
              :options="[initData]"
              :on-load="userOnLoad"
              @update:value="updateOwnerNameDivideInfo"
            />
          </n-form-item>
          <n-form-item
            label="承接对象(部门)"
            v-if="indicator.divideInfo?.type === 1"
            path="divideInfo.ownerId"
            :rule="{
              required: true,
              message: '请选择承接对象',
              type: 'string',
              trigger: ['blur', 'change']
            }"
          >
            <n-tree-select
              placement="top"
              v-model:value="indicator.divideInfo.ownerId"
              :placeholder="indicator.divideInfo.ownerName ?? '请选择'"
              :options="[initDepData]"
              :on-load="depOnload"
              @update:value="updateOwnerNameDivideInfo"
            />
          </n-form-item>
        </n-form>
      </n-space>
      <template #footer>
        <div class="edit-footer-btns">
          <n-button
            type="info"
            @click="submitEditIndicator"
          >
            确认
          </n-button>
          <n-button @click="show = false">取消</n-button>
        </div>
      </template>
    </n-drawer-content>
  </n-drawer>
</template>

<script setup lang="ts">
  import { TreeOption, TreeSelectOption } from 'naive-ui'
  import {
    DIMENSION_FIELDS,
    EditIndicatorParams,
    indicatorInTable
  } from '../../baseType'
  import { DepartmentType } from '@/views/view-department/baseType'
  import { editIndicator } from '@/api'
  const {
    getDepAndUserSelectNodeData,
    initData,
    getDepChildNdoeData,
    initDepData
  } = useUserAndDepSelectHook()
  const msessage = useMessage()
  const indicatorFormRef = ref<any>()
  const show = defineModel('show', { type: Boolean, default: false })
  const indicator = defineModel('indicator', {
    type: Object as () => indicatorInTable,
    required: false,
    default: () => ({
      id: '',
      name: '',
      deep: 0,
      dismension: 0,
      creator: '',
      isUndertake: false,
      des: '',
      executeTime: 0,
      unit: '',
      target: 0,
      progress: '',
      progressWeight: '',
      examWay: '',
      score: 0,
      divideInfo: {
        type: 0,
        ownerId: '',
        ownerName: '',
        ownerCode: null,
        indicatorId: '',
        des: '',
        target: null,
        unit: '',
        examWay: ''
      }
    })
  })
  const emit = defineEmits(['refresh'])
  const dimensionOptions = DIMENSION_FIELDS.map((item, index) => ({
    label: item,
    value: index
  }))

  const divideTypeRadios = [
    { label: '个人', value: 0 },
    { label: '部门', value: 1 }
  ]

  async function submitEditIndicator() {
    indicatorFormRef.value?.validate(async (errors) => {
      if (!errors) {
        const { children, ...rest } = indicator.value
        rest.divideInfo.des = rest.des
        rest.divideInfo.target = rest.target
        rest.divideInfo.unit = rest.unit
        rest.divideInfo.examWay = rest.examWay
        rest.divideInfo.indicatorId = rest.id
        const res = await editIndicator(rest as unknown as EditIndicatorParams)
        if (res.code === 200) {
          msessage.success(res.message)
          show.value = false
          emit('refresh')
        } else {
          msessage.error(res.message)
        }
      }
    })
  }

  async function userOnLoad(option: TreeSelectOption) {
    const res = await getDepAndUserSelectNodeData(option.key as string)
    option.children = res as unknown as TreeSelectOption[]
  }

  async function depOnload(option: TreeSelectOption) {
    const res = await getDepChildNdoeData(option.key as string)
    option.children = res as unknown as TreeSelectOption[]
  }

  function updateOwnerNameDivideInfo(
    _value: string | number | Array<string | number> | null,
    _option: TreeSelectOption | null | Array<TreeSelectOption | null>,
    meta: {
      node: TreeOption | null
      action: 'select' | 'unselect' | 'delete' | 'clear'
    }
  ) {
    if (meta.action === 'select') {
      const nodeData = meta.node?.nodeData as unknown as DepartmentType
      indicator.value.divideInfo.ownerName = nodeData.name
      indicator.value.divideInfo.ownerCode = nodeData.code
    }
  }

  watch(
    () => indicator.value,
    (newVal) => {
      if (!newVal.divideInfo) {
        newVal.divideInfo = {
          type: 0,
          ownerId: null,
          ownerName: null,
          ownerCode: null,
          indicatorId: '',
          des: '',
          target: null,
          unit: '',
          examWay: ''
        }
      }
      indicator.value = newVal
    }
  )
</script>
<style scoped lang="less">
  .edit-footer-btns {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: right;
    gap: 12px;
  }
</style>
