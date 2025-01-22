import { defineStore } from 'pinia'
import { asyncRoutes } from '@/router/index'
import { RouteRecordRaw } from 'vue-router'
import { store } from '../index'
import { menuType } from '@/api'
export interface RootMenu {
  path: string
  name: string
}
export interface asyncRoutesType {
  localRoutes: RouteRecordRaw[]
  asyncRoutes: menuType[]
  currentAddMenu?: RootMenu
  currentEditMenu?: RouteRecordRaw
}

function findRoutesByPath(
  routes: RouteRecordRaw[],
  targetPath: string
): RouteRecordRaw[] {
  let matchedRoutes: RouteRecordRaw[] = []

  for (const route of routes) {
    // 检查当前路由的 path 是否匹配
    if (route.path === targetPath) {
      matchedRoutes.push(route)
    }

    // 如果有子路由，递归查找
    if (route.children) {
      const childMatches = findRoutesByPath(route.children, targetPath)
      matchedRoutes = matchedRoutes.concat(childMatches)
    }
  }

  return matchedRoutes
}
function accaccordingToAsyncRoutesUpdateLocalRoutes(
  localRoutes: RouteRecordRaw[],
  asyncRoutes: menuType[]
) {
  for (const route of localRoutes) {
    const asyncRoute = asyncRoutes.filter((item) => item.path === route.path)[0]
    if (asyncRoute) {
      route.meta = asyncRoute?.meta
      route.path = asyncRoute?.path ? asyncRoute.path : route.path
      route.redirect = asyncRoute?.redirect
    }
    if (route.children && route.children.length > 0) {
      accaccordingToAsyncRoutesUpdateLocalRoutes(route.children, asyncRoutes)
    }
  }
}

export const useAsyncRouteStore = defineStore({
  id: 'app-sync-route',
  state: (): asyncRoutesType => ({
    localRoutes: asyncRoutes,
    currentAddMenu: undefined,
    currentEditMenu: undefined,
    asyncRoutes: []
  }),
  getters: {
    getAsyncRoutes(): RouteRecordRaw[] {
      return this.localRoutes
    },
    getCurrentAddMenu(): RootMenu | undefined {
      return this.currentAddMenu
    },
    getCurrentEditMenu(): RouteRecordRaw | undefined {
      return this.currentEditMenu
    }
  },
  actions: {
    setRootMenu(data: RootMenu) {
      this.currentAddMenu = {
        path: data.path,
        name: data.name
      }
    },
    setCurrentEditMenu(path: string) {
      this.currentEditMenu = findRoutesByPath(this.localRoutes, path)[0]
    },
    getCurrentEditMenuId(path: string) {
      return this.asyncRoutes.filter((item) => item.path === path)[0]?.id
    },
    setAsyncRoutes(data: menuType[]) {
      this.asyncRoutes = data
      accaccordingToAsyncRoutesUpdateLocalRoutes(this.localRoutes, data)
    }
  }
})
// use  outside setup
export function useAsyncRoute() {
  return useAsyncRouteStore(store)
}
