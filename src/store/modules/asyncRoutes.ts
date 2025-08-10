import { defineStore } from 'pinia'
import { asyncRoutes } from '@/router/index'
import { RouteRecordRaw } from 'vue-router'
import { store } from '../index'
import type { TreeSelectOption } from 'naive-ui'
import { BaseMenu } from '@/views/view-permissions/baseType'
export interface RootMenu {
  path: string
  name: string
}
export interface asyncRoutesType {
  localRoutes: RouteRecordRaw[]
  asyncRoutes: BaseMenu[]
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

function accaccordingToAsyncRoutesGenerateTreeSelectOptions(
  data: BaseMenu[]
): Array<TreeSelectOption> {
  return data.map((item) => {
    const treeNode: TreeSelectOption = {
      label: item.name,
      key: item.id,
      nodeData: item
    }
    if (item.children && item.children.length > 0) {
      treeNode.children = accaccordingToAsyncRoutesGenerateTreeSelectOptions(
        item.children
      )
    }
    return treeNode
  })
}

function accordingToSideMenuGetPathArr(data: BaseMenu[]): Array<string> {
  return data.flatMap((item) => {
    if (item.children && item.children.length > 0) {
      return [item.path, ...accordingToSideMenuGetPathArr(item.children)]
    }
    return item.path ? [item.path] : []
  })
}

function traveresMenuTree(
  data: BaseMenu[],
  callback: (menu: BaseMenu) => void
) {
  data.forEach((item) => {
    callback(item)
    if (item.children && item.children.length > 0) {
      traveresMenuTree(item.children, callback)
    }
  })
}

/***
 *  没必要更具后端菜单数据更新本地路由数据
 *  侧栏菜单直接用后端数据进行渲染
 *  权限校验直接在路由守卫中
 */
export const useAsyncRouteStore = defineStore({
  id: 'app-sync-route',
  state: (): asyncRoutesType => ({
    localRoutes: asyncRoutes,
    asyncRoutes: [] //后端菜单数据,
  }),
  getters: {
    getAsyncRoutes(): BaseMenu[] {
      return this.asyncRoutes
    },
    getTreeSelectOptions(): Array<TreeSelectOption> {
      //this computed property returns a list of options for a tree select component  and nodeData is the tree node of the asyncRoute tree
      return accaccordingToAsyncRoutesGenerateTreeSelectOptions(
        this.asyncRoutes
      )
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
    setAsyncRoutes(data: BaseMenu[]) {
      this.asyncRoutes = data
    },
    getSideMenuPathArr(data: BaseMenu[]): Array<string> {
      return accordingToSideMenuGetPathArr(data)
    },
    //遍历菜单树
    traveresMenuTreeData(callback: (menu: BaseMenu) => void) {
      traveresMenuTree(this.asyncRoutes, callback)
    }
  }
})
// use  outside setup
export function useAsyncRoute() {
  return useAsyncRouteStore(store)
}
