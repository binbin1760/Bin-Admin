<template>
  <n-menu
    ref="Nmenu"
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
  const Nmenu = ref<any>()
  const route = useRoute()
  const router = useRouter()
  const useAsycRoutes = useAsyncRouteStore()
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
  let menu = ref<MenuOption[]>([])
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

  watch(
    route,
    (newVal) => {
      const { fullPath } = newVal
      Nmenu.value?.showOption(fullPath)
    },
    { immediate: true }
  )

  watch(
    useAsycRoutes.getAsyncRoutes,
    (newVal) => {
      menu.value = computedMenu(newVal)
    },
    { immediate: true }
  )
</script>
<style scoped lang="less"></style>
