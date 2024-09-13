<template>
  <n-config-provider :theme-overrides="themeOverrides">
    <router-view />
  </n-config-provider>
</template>

<script setup lang="ts">
  import { GlobalThemeOverrides } from 'naive-ui'
  const themeOverrides: GlobalThemeOverrides = {
    Input: {
      borderHover: '#70c0e8',
      borderFocus: '#70c0e8',
      boxShadowFocus: '0 0 0 2px rgba(112,192,232,0.6)',
      caretColor: '#70c0e8'
    }
  }
</script>
<style scoped lang="less"></style>
