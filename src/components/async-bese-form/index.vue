<template>
  <div>
    <n-form
      ref="formRef"
      label-placement="left"
      :model="props.model"
      :label-width="props.labelWidth ? labelWidth : 80"
      :label-align="props.labelAlign ? props.labelAlign : 'right'"
      :require-mark-placement="
        props.requireMarkPlacement ? props.requireMarkPlacement : 'left'
      "
      :disabled="props.disabled"
    >
      <n-grid
        :cols="props.cols ? props.cols : 12"
        :x-gap="props.xGap ? props.xGap : 24"
        :y-gap="props.yGap ? props.yGap : 24"
      >
        <template
          v-for="(item, index) in config"
          :key="index"
        >
          <n-form-item-gi
            :label="item.label"
            :span="item.gridSpan ? item.gridSpan : 12"
            :path="item.path"
            :rule="item.rule"
          >
            <n-input
              v-if="item.type === 'input'"
              v-model:value="formData[item.path]"
              :placeholder="item.placeholder"
              :disabled="item.disabled"
              v-on:update:value="
                (value: string) => {
                  item.upadteValue && item.upadteValue(value)
                }
              "
              v-bind="{ ...item.otherProps }"
            />

            <n-select
              v-else-if="item.type === 'select'"
              v-model:value="formData[item.path]"
              :options="item.options"
              :disabled="item.disabled"
              :placeholder="item.placeholder"
              v-bind="{ ...item.otherProps }"
              @update-value="
                (value: string, option: SelectOption) => {
                  item.upadteValue && item.upadteValue({ value, option })
                }
              "
            ></n-select>

            <n-input
              v-else-if="item.type === 'textarea'"
              type="textarea"
              v-model:value="formData[item.path]"
              :disabled="item.disabled"
              :placeholder="item.placeholder"
              :maxlength="item.maxlength"
              v-on:update:value="
                (value: string) => {
                  item.upadteValue && item.upadteValue(value)
                }
              "
              v-bind="{ ...item.otherProps }"
            />
            <n-input-number
              id="input-number"
              style="width: 100%"
              v-else-if="item.type === 'number'"
              v-model:value="formData[item.path]"
              :disabled="item.disabled"
              :placeholder="item.placeholder"
              @update:value="
                (value: number) => {
                  item.upadteValue && item.upadteValue(value)
                }
              "
              v-bind="{ ...item.otherProps }"
            />
            <n-date-picker
              v-else-if="item.type === 'date'"
              v-model:value="formData[item.path]"
              :disabled="item.disabled"
              :placeholder="item.placeholder"
              @update:value="
                (value: Number | null, formatData: string | null) => {
                  item.upadteValue && item.upadteValue({ value, formData })
                }
              "
              v-bind="{ ...item.otherProps }"
            />
            <n-checkbox-group
              v-else-if="item.type === 'checkbox'"
              v-model:value="formData[item.path]"
              :disabled="item.disabled"
              v-bind="{ ...item.otherProps }"
              @update:value="
                (value: Array<string | number>, meta) => {
                  item.upadteValue && item.upadteValue({ value, meta })
                }
              "
            >
              <n-checkbox
                v-for="(check, checkIndex) in item.options"
                :key="checkIndex"
                :value="check.value"
                :label="check.label"
              />
            </n-checkbox-group>
            <n-radio-group
              v-else-if="item.type === 'radio'"
              v-model:value="formData[item.path]"
              :disabled="item.disabled"
              v-bind="{ ...item.otherProps }"
              @update:value="
                (value: Array<string | number>, meta) => {
                  item.upadteValue && item.upadteValue({ value, meta })
                }
              "
            >
              <n-radio
                v-for="(radio, radioIndex) in item.options"
                :value="radio.value"
                :key="radioIndex"
              >
                {{ radio.label }}
              </n-radio>
            </n-radio-group>
            <n-tree-select
              v-else-if="item.type === 'tree-select'"
              v-model:value="formData[item.path]"
              :disabled="item.disabled"
              :placeholder="item.placeholder"
              :options="item.options"
              @update-value="
                (value, option, meta) => {
                  item.upadteValue && item.upadteValue({ value, option, meta })
                }
              "
              v-bind="{ ...item.otherProps }"
            ></n-tree-select>
          </n-form-item-gi>
        </template>
      </n-grid>
    </n-form>
    <div
      class="foot"
      v-if="props.showFoot"
    >
      <n-button
        type="default"
        @click="cancelForm"
      >
        取 消
      </n-button>
      <n-button
        type="info"
        @click="confirmForm"
      >
        确 认
      </n-button>
    </div>
  </div>
</template>

<script setup lang="ts">
  // @ts-nocheck
  import { it } from 'node:test'
  import { AsyncBaseFormConfig } from './types'
  //config的path目前只支持第一层，无法获取对象中对象的值
  const props = withDefaults(
    defineProps<{
      config: Array<AsyncBaseFormConfig>
      model: any
      labelWidth?: number
      labelAlign?: 'left' | 'right'
      requireMarkPlacement?: 'left' | 'right'
      gridSpan?: number
      xGap?: number
      yGap?: number
      cols?: number
      disabled?: boolean
      showFoot?: boolean
    }>(),
    {
      showFoot: true
    }
  )

  const emit = defineEmits(['cancel', 'confirm'])
  const formData = ref<any>(props.model)
  const originFormData = ref<any>(JSON.parse(JSON.stringify(props.model)))
  const formRef = ref<any>(null)
  const config = ref(props.config)
  function cancelForm() {
    reSetFormValue()
    emit('cancel')
  }

  function confirmForm() {
    formRef.value?.validate((errors) => {
      if (!errors) {
        emit('confirm', formData.value)
      }
    })
  }

  //to reset FormComponent value
  function reSetFormValue() {
    formRef.value?.restoreValidation()
    formData.value = originFormData.value
  }
  defineExpose({
    reSetFormValue,
    formRef
  })
  watch(
    () => props.config,
    (newVal) => {
      config.value = newVal
    },
    {
      immediate: true,
      deep: true
    }
  )
</script>
<style scoped lang="less">
  .foot {
    display: flex;
    justify-content: end;
    gap: 10px;
  }
</style>
