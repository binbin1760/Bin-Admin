<template>
  <n-space
    vertical
    size="large"
  >
    <n-layout
      class="layout"
      has-sider
    >
      <n-layout-sider
        content-style="padding: 4px;"
        bordered
        :native-scrollbar="false"
        show-trigger="arrow-circle"
        collapse-mode="width"
        :collapsed-width="60"
        :width="200"
        @update-collapsed="isCollapsed"
      >
        <div class="name">
          <n-icon size="32">
            <bin-logo />
          </n-icon>
          <div v-if="showName">Bin-Admin</div>
        </div>
      </n-layout-sider>
      <n-layout
        class="main"
        style="height: 100vh; display: flex; flex-direction: column"
      >
        <n-layout-header>
          <BinHeader />
          <TagViews />
        </n-layout-header>
        <n-layout-content content-style="padding: 12px;">
          <AppProvider>
            <RouterView></RouterView>
          </AppProvider>
        </n-layout-content>
      </n-layout>
    </n-layout>
  </n-space>
</template>

<script setup lang="ts">
  const showName = ref<boolean>(true)
  function isCollapsed(val: boolean) {
    showName.value = !val
  }
</script>
<style scoped lang="less">
  .n-layout-header {
    background-color: var(--color-header-bg);
    padding: calc(2 * var(--main-gap)) 0;
    display: flex;
    flex-direction: column;
    gap: calc(2 * var(--main-gap));
  }

  .n-layout-sider {
    background: var(--color-main-bg);
    height: 100vh;
    .name {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      font-size: 18px;
      font-weight: 500;
      white-space: nowrap;
    }
  }
  .main {
    height: 100vh;
    padding-left: 8px;
    background-color: var(--color-content-bg);
  }
  .main:deep(.n-layout-scroll-container) {
    display: flex;
    flex-direction: column;
  }
  .n-layout-content {
    background-color: var(--color-main-bg);
    flex: 1;
    flex-basis: 0;
  }
</style>
