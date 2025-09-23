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
        collapse-mode="width"
        :collapsed-width="60"
        :width="200"
        :collapsed="!showName"
        @update-collapsed="isCollapsed"
      >
        <div class="name">
          <n-icon size="32">
            <bin-logo />
          </n-icon>
          <div v-if="showName">{{ companyName }}</div>
        </div>
        <side-menu />
      </n-layout-sider>
      <n-layout
        class="main"
        style="height: 100vh; display: flex; flex-direction: column"
      >
        <n-layout-header>
          <BinHeader v-model:collapse-status="showName" />
          <TagViews />
        </n-layout-header>
        <n-layout-content content-style="padding: 12px;">
          <router-view v-slot="{ Component }">
            <transition enter-active-class="animate__animated animate__fadeIn">
              <component :is="Component" />
            </transition>
          </router-view>
        </n-layout-content>
      </n-layout>
    </n-layout>
  </n-space>
</template>

<script setup lang="ts">
  import { getTopDep } from '@/api'
  import { saveTopDep } from '@/unitls'
  const showName = ref<boolean>(true)
  const companyName = ref<string>()
  function isCollapsed(val: boolean) {
    showName.value = !val
  }

  async function getCompanyInfo() {
    const result = await getTopDep()
    if (result.code === 200) {
      companyName.value = result.data.name
      saveTopDep({ id: result.data.id, name: result.data.name, treeLevl: 0 })
    } else {
      throw new Error('获取company info 失败')
    }
  }
  getCompanyInfo()
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
    background: #303438;
    height: 100vh;
    .name {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      font-size: 18px;
      font-weight: 500;
      white-space: nowrap;
      color: #ffffff;
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
