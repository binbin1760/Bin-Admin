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
      title="查看指标"
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
              :disabled="true"
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
              :disabled="true"
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
              :disabled="true"
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
              :disabled="true"
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
              :disabled="true"
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
              :disabled="true"
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
              :disabled="true"
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
              :disabled="true"
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
            <n-radio-group
              v-model:value="indicator.divideInfo.type"
              :disabled="true"
            >
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
            <n-input
              v-model:value="indicator.divideInfo.ownerName"
              :disabled="true"
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
            <n-input
              v-model:value="indicator.divideInfo.ownerName"
              :disabled="true"
            />
          </n-form-item>
        </n-form>
      </n-space>
    </n-drawer-content>
  </n-drawer>
</template>

<script setup lang="ts">
  import { DIMENSION_FIELDS, indicatorInTable } from '../../baseType'
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
