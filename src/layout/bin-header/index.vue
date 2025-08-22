<template>
  <div class="header">
    <div class="refresh-breadcrimb">
      <n-icon size="18">
        <div
          class="refresh-box"
          @click="reLoadpage"
        >
          <Refresh />
        </div>
      </n-icon>
      <n-breadcrumb>
        <n-breadcrumb-item
          v-for="(item, index) in breadCrumbItem"
          :key="index"
        >
          <span @click="clickItem(item.key)">{{ item.name }}</span>
        </n-breadcrumb-item>
      </n-breadcrumb>
    </div>

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

      <n-popover>
        <template #trigger>
          <div class="userinfo-popover">
            <n-icon
              class="user-avatar"
              size="20"
            >
              <UserOutlined />
            </n-icon>
            <div class="userinfo-name">{{ userInfo?.name }}</div>
          </div>
        </template>
        <div class="user-base-info">
          <div class="label-value">
            <div class="label">所属部门</div>
            <div class="value">{{ userInfo?.department }}</div>
          </div>
          <n-button
            type="primary"
            style="width: 100%"
            @click="logOut"
          >
            推出登录
          </n-button>
        </div>
      </n-popover>
    </div>
    <n-drawer
      v-model:show="showSystemSet"
      width="500"
      closable
      :placement="systemDrawerPlacement"
      default-widt="500"
      :show-mask="false"
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
  import { Refresh } from '@vicons/ionicons5'
  import { SystemSetDraw } from './components'
  import { DrawerPlacement } from 'naive-ui'
  import {
    clearUserInfo,
    getUserInfo,
    userInfoType
  } from '@/unitls/userInfoStorage'
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
  const userInfo = ref<userInfoType>()
  function showSystemSetDrawer() {
    showSystemSet.value = true
  }
  function setShowSystemDrawerPlacement(placement: DrawerPlacement) {
    systemDrawerPlacement.value = placement
  }
  const clickItem = (key: string) => {
    router.push(key)
  }

  function logOut() {
    clearUserInfo()
    router.push('/login')
  }

  function reLoadpage() {
    const data = route.query
    router.push({
      path: '/redirect/all',
      query: {
        pathdata: route.path,
        ...data
      }
    })
  }

  userInfo.value = getUserInfo()
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
    .refresh-breadcrimb {
      display: flex;
      align-items: center;
      gap: 4px;
    }
    .refresh-box {
      cursor: pointer;
      border-radius: 2px;
    }
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
  .user-base-info {
    width: 180px;
    display: flex;
    flex-direction: column;
    align-items: center;
    .label-value {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: start;
      .label {
        width: 100%;
        padding-bottom: 4px;
        border-bottom: 1px solid var(--main-border-color);
      }
      .value {
        font-weight: bolder;
        width: 100%;
        padding: 12px 0;
        font-size: 16px;
        border-bottom: 1px solid var(--main-border-color);
      }
    }
  }
  .userinfo-popover {
    display: flex;
    align-items: center;
    .userinfo-name {
      font-size: 12px;
      padding-top: 5px;
      cursor: pointer;
      color: #333333;
    }
    .userinfo-name:hover {
      color: #55babe;
    }
  }
</style>
