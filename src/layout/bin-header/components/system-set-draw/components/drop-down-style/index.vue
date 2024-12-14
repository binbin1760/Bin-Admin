<template>
  <n-collapse-item title="下拉菜单">
    <div class="collapse-transition-main">
      <div class="setting">菜单整体背景颜色</div>
      <n-color-picker
        v-model:value="data.Dropdown!.color"
        :show-alpha="false"
      />
      <div class="setting">菜单文本颜色</div>
      <n-color-picker
        v-model:value="data.Dropdown!.optionTextColor"
        :show-alpha="false"
      />
      <div class="setting">菜单文本悬停颜色</div>
      <n-color-picker
        v-model:value="data.Dropdown!.optionTextColorHover"
        :show-alpha="false"
      />
      <div class="setting">菜单文本激活颜色</div>
      <n-color-picker
        v-model:value="data.Dropdown!.optionTextColorActive"
        :show-alpha="false"
      />
      <div class="setting">菜单项悬停颜色</div>
      <n-color-picker
        v-model:value="data.Dropdown.optionColorHover"
        :show-alpha="false"
      />
      <div class="setting">菜单项激活颜色</div>
      <n-color-picker
        v-model:value="data.Dropdown.optionColorActive"
        :show-alpha="false"
      />
      <div class="setting">菜单项前缀颜色</div>
      <n-color-picker
        v-model:value="data.Dropdown!.prefixColor"
        :show-alpha="false"
      />
    </div>
  </n-collapse-item>
</template>

<script setup lang="ts">
  import { useSystemStyleSettingStore } from '@/store/modules/systemStyleSetting'
  const systemSetStore = useSystemStyleSettingStore()
  const data = reactive<any>(systemSetStore.naiveComponentStyle)
</script>
<style scoped lang="less">
  .collapse-transition-main {
    .setting {
      margin-top: calc(var(--main-gap) * 3);
    }
  }
</style>
