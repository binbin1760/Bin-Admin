<template>
  <div class="set-color">
    <div>设置颜色</div>
    <n-color-picker
      v-model:value="colcorVal"
      :show-alpha="false"
      :show="show"
      placement="right"
      size="small"
      :to="false"
      @click.stop="showPlane"
    />
  </div>
</template>

<script setup lang="ts">
  const colcorVal = ref('#ffffff')
  const show = ref(false)

  function showPlane() {
    show.value = !show.value
  }
</script>
<style scoped lang="less">
  .set-color {
    width: 100%;
    display: flex;
    align-items: center;
    padding: 4px 12px;
    cursor: pointer;
    white-space: nowrap;
    box-sizing: border-box;
  }
</style>
