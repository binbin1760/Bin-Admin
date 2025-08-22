<template>
  <n-drawer
    style="width: 600px"
    v-model:show="show"
    placement="right"
    :show-mask="false"
    :mask-closable="false"
    display-directive="if"
    preset="card"
    @after-enter="drawOnShow"
  >
    <n-drawer-content
      title="分解指标"
      closable
    >
      <n-space vertical>
        <n-form-item label="创建人">
          <n-input
            v-model:value="indicator.creator"
            disabled
          />
        </n-form-item>
        <n-form-item label="指标名称">
          <n-input
            v-model:value="indicator.name"
            disabled
          />
        </n-form-item>
        <n-form-item label="指标维度">
          <n-select
            v-model:value="indicator.dismension"
            :options="dimensionOptions"
            disabled
          />
        </n-form-item>
        <n-form-item label="年度">
          <n-date-picker
            v-model:value="indicator.executeTime"
            type="year"
            disabled
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
            disabled
          />
        </n-form-item>
        <!-- 验证信息表单 -->
        <n-form
          ref="divideFormRef"
          :model="divideInfo"
        >
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
              v-model:value="divideInfo.target"
              :placeholder="indicator.target + ''"
            />
          </n-form-item>
          <n-form-item
            label="单位"
            path="unit"
            :rule="{
              required: true,
              message: '请输入目标单位',
              type: 'string',
              trigger: ['blur']
            }"
          >
            <n-input
              v-model:value="divideInfo.unit"
              :placeholder="indicator.unit"
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
              v-model:value="divideInfo.examWay"
              :placeholder="indicator.examWay"
            />
          </n-form-item>
          <n-form-item
            label="指标描述"
            path="des"
            :rule="{
              required: true,
              message: '请输入目标单位',
              type: 'string',
              trigger: ['blur']
            }"
          >
            <n-input
              type="textarea"
              :maxlength="1000"
              :show-count="true"
              v-model:value="divideInfo.des"
              :placeholder="indicator.des"
            />
          </n-form-item>
          <n-form-item
            label="分解对象"
            path="type"
            :rule="{
              required: true,
              message: '请确认分解对象类型',
              type: 'number',
              trigger: ['blur', 'change']
            }"
          >
            <n-radio-group v-model:value="divideInfo.type">
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
            v-if="divideInfo.type === 0"
            path="ownerId"
            :rule="{
              required: true,
              message: '请选择承接对象',
              type: 'string',
              trigger: ['blur', 'change']
            }"
          >
            <n-tree-select
              placement="top"
              v-model:value="divideInfo.ownerId"
              :options="[initData]"
              :on-load="userOnLoad"
              @update:value="updateOwnerNameDivideInfo"
            />
          </n-form-item>
          <n-form-item
            label="承接对象(部门)"
            v-if="divideInfo.type === 1"
            path="ownerId"
            :rule="{
              required: true,
              message: '请选择承接对象',
              type: 'string',
              trigger: ['blur', 'change']
            }"
          >
            <n-tree-select
              placement="top"
              v-model:value="divideInfo.ownerId"
              :options="[initDepData]"
              :on-load="depOnload"
              @update:value="updateOwnerNameDivideInfo"
            />
          </n-form-item>
        </n-form>
      </n-space>
      <template #footer>
        <div class="divide-footer-btns">
          <n-button
            type="info"
            @click="submitDivideIndicator"
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
  import { BaseIndicator, DivideParams } from '../../baseType'
  import { DIMENSION_FIELDS } from '../../baseType'
  import { DepartmentType } from '@/views/view-department/baseType'
  import { divideIndicator } from '@/api'
  const {
    getDepAndUserSelectNodeData,
    initData,
    getDepChildNdoeData,
    initDepData
  } = useUserAndDepSelectHook()
  const msessage = useMessage()
  const divideFormRef = ref<any>()
  const show = defineModel('show', { type: Boolean, default: false })
  const defaultDivideInfo: Nullable<DivideParams> = {
    type: null,
    ownerId: null,
    ownerName: null,
    ownerCode: null,
    indicatorId: null,
    des: null,
    target: null,
    unit: null,
    examWay: null
  }
  const indicator = defineModel('indicator', {
    type: Object as () => BaseIndicator,
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
      score: 0
    })
  })
  const divideInfo = ref<DivideParams>(
    JSON.parse(JSON.stringify(defaultDivideInfo))
  )
  const emit = defineEmits(['refresh'])
  const dimensionOptions = DIMENSION_FIELDS.map((item, index) => ({
    label: item,
    value: index
  }))

  const divideTypeRadios = [
    { label: '个人', value: 0 },
    { label: '部门', value: 1 }
  ]

  async function submitDivideIndicator() {
    divideFormRef.value?.validate(async (errors) => {
      if (!errors) {
        divideInfo.value.indicatorId = indicator.value.id
        const res = await divideIndicator(divideInfo.value)
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
      divideInfo.value.ownerName = nodeData.name
      divideInfo.value.ownerCode = nodeData.code
    }
  }

  function drawOnShow() {
    divideInfo.value = JSON.parse(JSON.stringify(defaultDivideInfo))
  }
</script>
<style scoped lang="less">
  .divide-footer-btns {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: right;
    gap: 12px;
  }
</style>
