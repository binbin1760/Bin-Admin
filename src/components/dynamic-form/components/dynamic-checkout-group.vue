<template>
  <NCheckboxGroup v-model:value="data">
    <n-checkbox
      v-for="(item, index) in options"
      :key="index"
      :value="item.value"
    >
      {{ item.label }}
    </n-checkbox>
  </NCheckboxGroup>
</template>

<script setup lang="ts">
  import { NCheckboxGroup, NCheckbox } from 'naive-ui'

  const props = defineProps<{
    options: Array<{ label: string; value: string }>
  }>()

  const data = defineModel('value', {
    type: Object as PropType<(string | number)[] | null | undefined>,
    required: true
  })
  const { options } = toRefs(props)
</script>
<style scoped lang="less"></style>
