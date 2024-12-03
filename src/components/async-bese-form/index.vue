<template>
  <div>
    <n-form
      ref="formRef"
      label-placement="left"
      :model="props.model"
      :label-width="props.labelWidth ? labelWidth : 80"
      :label-align="props.labelAlign ? props.labelAlign : 'right'"
    >
      <n-grid
        :cols="props.cols ? props.cols : 12"
        :x-gap="props.xGap ? props.xGap : 24"
        :y-gap="props.yGap ? props.yGap : 24"
      >
        <template
          v-for="(item, index) in props.config"
          :key="index"
        >
          <n-form-item-gi
            :label="item.label"
            :span="props.gridSpan ? props.gridSpan : 12"
            :path="item.path"
          >
            <n-input
              v-if="item.type === 'input'"
              v-model:value="item.value"
              :placeholder="item.placeholder"
              :disabled="item.disabled"
              v-bind="{ ...item.otherProps }"
            />

            <n-select
              v-else-if="item.type === 'select'"
              v-model:value="item.value"
              :options="item.options"
              :disabled="item.disabled"
              :placeholder="item.placeholder"
              v-bind="{ ...item.otherProps }"
            ></n-select>

            <n-input
              v-else-if="item.type === 'textarea'"
              type="textarea"
              v-model:value="item.value"
              :disabled="item.disabled"
              :placeholder="item.placeholder"
              :maxlength="item.maxlength"
              v-bind="{ ...item.otherProps }"
            />
            <n-input-number
              id="input-number"
              style="width: 100%"
              v-else-if="item.type === 'number'"
              v-model:value="item.value"
              :disabled="item.disabled"
              :placeholder="item.placeholder"
              v-bind="{ ...item.otherProps }"
            />
            <n-date-picker
              v-else-if="item.type === 'date'"
              v-model:value="item.value"
              :disabled="item.disabled"
              :placeholder="item.placeholder"
              v-bind="{ ...item.otherProps }"
            />
            <n-checkbox-group
              v-else-if="item.type === 'checkbox'"
              v-model:value="item.value"
              :disabled="item.disabled"
              v-bind="{ ...item.otherProps }"
            >
              <n-checkbox
                v-for="(check, checkIndex) in item.options"
                :key="checkIndex"
                :value="check.value"
                :label="check.label"
              />
            </n-checkbox-group>
          </n-form-item-gi>
        </template>
      </n-grid>
    </n-form>
    <div class="foot">
      <n-button
        type="default"
        @click="cancelForm"
      >
        取 消
      </n-button>
      <n-button
        type="info"
        @click="configForm"
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
  const props = defineProps<{
    config: Array<AsyncBaseFormConfig>
    model: any
    labelWidth?: number
    labelAlign?: 'left' | 'right'
    gridSpan?: number
    xGap?: number
    yGap?: number
    cols?: number
  }>()
  const emit = defineEmits(['cancel', 'confirm'])

  function cancelForm() {
    emit('cancel', props.config)
  }

  function configForm() {
    emit('confirm', props.config)
  }
</script>
<style scoped lang="less">
  .foot {
    display: flex;
    justify-content: end;
    gap: 10px;
  }
  /* 隐藏输入框上下箭头 */
  #number-input::-webkit-inner-spin-button,
  #number-input::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  // /* 兼容Firefox */
  // #number-input[type='number'] {
  //   -moz-appearance: textfield;
  // }
  #input-number:deep(.n-input__suffix) {
    display: none;
  }
</style>
