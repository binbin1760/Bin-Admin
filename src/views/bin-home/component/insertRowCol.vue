<
<template>
  <div class="insert-row-col">
    <div>{{ tips }}</div>
    <n-input-number
      style="width: 120px"
      size="tiny"
      :min="1"
      placeholder="请输入数量"
      v-model:value="num"
      @click.stop
    />
    <div>{{ tips2 }}</div>
  </div>
</template>

<script setup lang="ts">
  interface props {
    type:
      | 'insert_row_above'
      | 'insert_row_down'
      | 'insert_col_left'
      | 'insert_col_right'
  }

  const props = defineProps<props>()
  const emit = defineEmits(['change'])
  const num = defineModel<number>('num', { default: 1 })
  const tips = computed(() => {
    switch (props.type) {
      case 'insert_row_above':
        return `向上插入`
      case 'insert_row_down':
        return `向下插入`
      case 'insert_col_left':
        return `向左插入`
      case 'insert_col_right':
        return `向右插入`
    }
  })

  const tips2 = computed(() => {
    switch (props.type) {
      case 'insert_row_above':
      case 'insert_row_down':
        return `行`
      case 'insert_col_left':
      case 'insert_col_right':
        return `列`
    }
  })
  watch(
    num,
    () => {
      emit('change', num.value)
    },
    { immediate: true }
  )
</script>
<style scoped lang="less">
  .insert-row-col {
    display: flex;
    align-items: center;
    gap: 4px;
    padding: 4px 12px;
    cursor: pointer;
  }

  .insert-row-col:hover {
    background-color: #ecf5ff;
    color: #409eff;
  }
</style>
