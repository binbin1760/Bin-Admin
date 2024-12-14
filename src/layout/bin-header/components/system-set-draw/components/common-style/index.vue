<template>
  <n-collapse-item title="公共样式">
    <div class="collapse-transition-main">
      <div>正常字体:</div>
      <n-input
        placeholder="请输入"
        v-model:value="data.common!.fontSize"
      />
      <!-- <div class="setting">大号字体:</div>
      <n-input
        placeholder="请输入"
        v-model:value="data.common!.fontSizeHuge"
      />
      <div class="setting">小号字体:</div>
      <n-input
        placeholder="请输入"
        v-model:value="data.common!.fontSizeMini"
      /> -->
      <div class="setting">字体粗细:</div>
      <n-input
        placeholder="请输入"
        v-model:value="data.common!.fontWeight"
      />
      <!-- <div class="setting">加粗字体:</div>
      <n-input
        placeholder="请输入"
        v-model:value="data.common!.fontWeightStrong"
      /> -->
      <div class="setting">圆角:</div>
      <n-input
        placeholder="请输入"
        v-model:value="data.common!.borderRadius"
      />
      <!-- <div class="setting">小号圆角:</div>
      <n-input
        placeholder="请输入"
        v-model:value="data.common!.borderRadiusSmall"
      /> -->
      <div class="setting">主要颜色</div>
      <n-color-picker
        v-model:value="data.common!.primaryColor"
        :show-alpha="false"
      />
      <div class="setting">主要悬停颜色</div>
      <n-color-picker
        v-model:value="data.common!.primaryColorHover"
        :show-alpha="false"
      />
      <div class="setting">主要点击颜色</div>
      <n-color-picker
        v-model:value="data.common!.primaryColorPressed"
        :show-alpha="false"
      />
      <div class="setting">INFO颜色</div>
      <n-color-picker
        v-model:value="data.common!.infoColor"
        :show-alpha="false"
      />
      <div class="setting">INFO悬停颜色</div>
      <n-color-picker
        v-model:value="data.common!.infoColorHover"
        :show-alpha="false"
      />
      <div class="setting">INFO点击颜色</div>
      <n-color-picker
        v-model:value="data.common!.infoColorPressed"
        :show-alpha="false"
      />
      <div class="setting">SUCCESS颜色</div>
      <n-color-picker
        v-model:value="data.common!.successColor"
        :show-alpha="false"
      />
      <div class="setting">SUCCESS悬停颜色</div>
      <n-color-picker
        v-model:value="data.common!.successColorHover"
        :show-alpha="false"
      />
      <div class="setting">SUCCESS点击颜色</div>
      <n-color-picker
        v-model:value="data.common!.successColorPressed"
        :show-alpha="false"
      />
      <div class="setting">Warning颜色</div>
      <n-color-picker
        v-model:value="data.common!.warningColor"
        :show-alpha="false"
      />
      <div class="setting">Warning悬停颜色</div>
      <n-color-picker
        v-model:value="data.common!.warningColorHover"
        :show-alpha="false"
      />
      <div class="setting">warning点击颜色</div>
      <n-color-picker
        v-model:value="data.common!.warningColorPressed"
        :show-alpha="false"
      />
      <div class="setting">Error点击颜色</div>
      <n-color-picker
        v-model:value="data.common!.errorColor"
        :show-alpha="false"
      />
      <div class="setting">Error悬浮颜色</div>
      <n-color-picker
        v-model:value="data.common!.errorColorHover"
        :show-alpha="false"
      />
      <div class="setting">Error点击颜色</div>
      <n-color-picker
        v-model:value="data.common!.errorColorPressed"
        :show-alpha="false"
      />
    </div>
  </n-collapse-item>
</template>

<script setup lang="ts">
  import { useSystemStyleSettingStore } from '@/store/modules/systemStyleSetting'
  import { GlobalThemeOverrides, NColorPicker } from 'naive-ui'
  const systemSetStore = useSystemStyleSettingStore()
  const data = reactive<GlobalThemeOverrides>(
    systemSetStore.naiveComponentStyle
  )
</script>
<style scoped lang="less">
  .collapse-transition-main {
    .setting {
      margin-top: calc(var(--main-gap) * 3);
    }
  }
</style>
