<template>
  <n-config-provider
    :theme-overrides="themeOverrides"
    :locale="zhCN"
    :date-locale="dateZhCN"
  >
    <router-view />
  </n-config-provider>
</template>

<script setup lang="ts">
  import { GlobalThemeOverrides } from 'naive-ui'
  import { useSystemStyleSettingStore } from '@/store/modules/systemStyleSetting'
  import { zhCN, dateZhCN } from 'naive-ui'
  const useSystemStyleSetting = useSystemStyleSettingStore()
  const themeOverrides: GlobalThemeOverrides =
    useSystemStyleSetting.getNaiveComponentStyle
</script>
<style lang="less">
  :root {
    --color-font: #333333;
    --color-main-bg: #ffffff;
    --color-sider-bg: #f2f2f2;
    --color-header-bg: #f2f2f2;
    --color-content-bg: #f2f2f2;
    --fontSize-main-min: 12px;
    --fontSize-main-normal: 14px;
    --fontSize-main-max: 18px;
    --margin-main: 10px;
    --margin-main-top: 10px;
    --margin-main-bottom: 10px;
    --margin-main-left: 8px;
    --margin-main-right: 8px;
    --padding-mian: 10px;
    --padding-main-top: 10px;
    --padding-main-bottom: 10px;
    --padding-mian-left: 8px;
    --padding-main-right: 8px;
    --main-gap: 4px;
  }
</style>
