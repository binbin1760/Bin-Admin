<template>
  <NRadioGroup v-model:value="data">
    <n-space>
      <n-radio
        v-for="(item, index) in options"
        :key="index"
        :value="item.value"
      >
        {{ item.label }}
      </n-radio>
    </n-space>
  </NRadioGroup>
</template>

<script setup lang="ts">
  import { NRadioGroup } from 'naive-ui'
  import { PropType } from 'vue'
  const props = defineProps<{
    options: Array<{ label: string; value: string }>
  }>()

  const data = defineModel('value', {
    type: String as PropType<string | number | boolean | null | undefined>,
    required: true
  })
  const { options } = toRefs(props)
</script>
<style scoped lang="less"></style>
