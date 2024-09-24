<template>
  <n-menu
    v-model:value="activeMenu"
    :options="menu"
    @update:value="selectRoute"
    accordion
  />
</template>

<script setup lang="ts">
  import { useAsyncRouteStore } from '@/store/modules/asyncRoutes'
  import { NIcon, type MenuOption } from 'naive-ui'
  import { RouteRecordRaw } from 'vue-router'
  import { BookmarkOutline } from '@vicons/ionicons5'

  const route = useRoute()
  const router = useRouter()
  const useAsycRoutes = useAsyncRouteStore()
  const baseMenu = useAsycRoutes.getAsyncRoutes
  function renderIcon(icon: Component) {
    return () => h(NIcon, null, { default: () => h(icon) })
  }
  function computedMenu(baseMenu: RouteRecordRaw[]) {
    return baseMenu.map((item) => {
      if (item.children && item.children.length > 0) {
        return {
          label: item?.meta?.name,
          key: item.path,
          icon: renderIcon(BookmarkOutline),
          children: computedMenu(item.children)
        }
      }
      return {
        label: item?.meta?.name,
        key: item.path,
        icon: renderIcon(BookmarkOutline)
      }
    })
  }
  const menu: MenuOption[] = computedMenu(baseMenu)
  const activeMenu = computed({
    get() {
      return route.fullPath
    },
    set() {
      return route.fullPath
    }
  })
  const selectRoute = (key: string) => {
    router.push(key)
  }
</script>
<style scoped lang="less"></style>
