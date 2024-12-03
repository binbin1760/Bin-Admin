<template>
  <div class="header">
    <n-breadcrumb>
      <n-breadcrumb-item
        v-for="(item, index) in breadCrumbItem"
        :key="index"
      >
        <span @click="clickItem(item.key)">{{ item.name }}</span>
      </n-breadcrumb-item>
    </n-breadcrumb>

    <div class="base-info">
      <n-icon
        class="user-message"
        size="20"
      >
        <MessageOutlined />
      </n-icon>
      <n-icon
        class="system-setting"
        size="20"
        @click="showSystemSetDrawer"
      >
        <MdSettings />
      </n-icon>
      <n-icon
        class="user-avatar"
        size="20"
      >
        <UserOutlined />
      </n-icon>
    </div>
    <n-drawer
      v-model:show="showSystemSet"
      width="500"
      closable
      :placement="systemDrawerPlacement"
      default-widt="500"
      resizable
    >
      <n-drawer-content closable>
        <template #header>
          <div class="drawer-header">
            <div class="drawer-header-title">系统设置抽屉</div>
            <div
              class="iconfont icon-drawer_top cur"
              @click="setShowSystemDrawerPlacement('top')"
            ></div>
            <div
              class="iconfont icon-drawer_right cur"
              @click="setShowSystemDrawerPlacement('right')"
            ></div>
            <div
              class="iconfont icon-drawer_bottom cur"
              @click="setShowSystemDrawerPlacement('bottom')"
            ></div>
            <div
              class="iconfont icon-drawer_left cur"
              @click="setShowSystemDrawerPlacement('left')"
            ></div>
          </div>
        </template>
        <SystemSetDraw v-model:show-draw="showSystemSet" />
        <template #footer>
          <div class="drawer-footer">
            <n-button
              type="default"
              @click="showSystemSet = false"
            >
              取消
            </n-button>
            <n-button type="info">确认</n-button>
          </div>
        </template>
      </n-drawer-content>
    </n-drawer>
  </div>
</template>

<script setup lang="ts">
  import { MdSettings } from '@vicons/ionicons4'
  import { UserOutlined, MessageOutlined } from '@vicons/antd'
  import { SystemSetDraw } from './components'
  import { DrawerPlacement } from 'naive-ui'
  const route = useRoute()
  const router = useRouter()
  const breadCrumbItem = computed({
    get() {
      return route.matched.map((item) => {
        return { key: item.path, name: item.meta.name }
      })
    },
    set() {
      return route.matched.map((item) => {
        return { key: item.path, name: item.meta.name }
      })
    }
  })
  //系统设置抽屉
  const showSystemSet = ref<boolean>(false)
  const systemDrawerPlacement = ref<DrawerPlacement>('right')
  function showSystemSetDrawer() {
    showSystemSet.value = true
  }
  function setShowSystemDrawerPlacement(placement: DrawerPlacement) {
    systemDrawerPlacement.value = placement
  }
  const clickItem = (key: string) => {
    router.push(key)
  }
</script>
<style scoped lang="less">
  .header {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: nowrap;
    box-sizing: border-box;
    background-color: var(--color-main-bg);
    padding: 8px 0;
    padding-left: var(--main-gap);
    .base-info {
      display: flex;
      align-items: center;
      flex-wrap: nowrap;
      padding: 0 calc(2.5 * var(--main-gap));
      gap: var(--main-gap);
    }
    .system-setting,
    .user-avatar,
    .user-message {
      cursor: pointer;
    }
  }
  .drawer-header {
    display: flex;
    align-items: center;
    gap: calc(var(--main-gap) * 2);
  }
  .cur {
    cursor: pointer;
  }
  .drawer-footer {
    display: flex;
    align-items: center;
    gap: var(--margin-main);
  }
</style>
