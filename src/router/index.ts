import {
  createRouter,
  createWebHistory,
  RouteRecordRaw,
  RouterHistory,
  RouterOptions
} from 'vue-router'

import { App } from 'vue'
import { createRouterGuards } from './guards'
/***
 *asyncRoutes 需要权限验证的路由
 *constantRouter 普通路由
 */
// 计算全部asyncRoutes
export interface IModuleType {
  default: Array<RouteRecordRaw> | RouteRecordRaw
}
const modules = import.meta.glob<IModuleType>('./modules/**/*.ts', {
  eager: true
})

const ModuleList: RouteRecordRaw[] = Object.keys(
  modules
) as unknown as RouteRecordRaw[]
const routesModuleList = ModuleList.reduce((list, key) => {
  const mod = modules[key as unknown as string].default ?? {}
  const modList = Array.isArray(mod) ? [...mod] : [mod]
  return [...list, ...modList]
}, [])

function RoutesSort(a, b) {
  return (a.meta?.sort ?? 0) - (b.meta?.sort ?? 0)
}

routesModuleList.sort(RoutesSort)
interface CustomRouterOptions extends RouterOptions {
  constantRoute?: RouteRecordRaw[]
}

export const whiteList = ['/login', '/redirect', '/redirect/all']
export const asyncRoutes = [...routesModuleList]
export const constantRoute: Array<RouteRecordRaw> = [
  {
    path: '/login',
    name: 'login',
    meta: { name: '登录', hidden: true },
    component: () => import('@/views/bin-login/index.vue')
  },
  {
    path: '/',
    meta: {
      name: '重定向login'
    },
    redirect: '/login'
  }
]
const routes = [...constantRoute, ...asyncRoutes]

const routerHistory: RouterHistory = createWebHistory()
const customRouterOptions: CustomRouterOptions = {
  history: routerHistory,
  routes: routes
}
const router = createRouter(customRouterOptions)

export function setupRouter(app: App) {
  app.use(router)
  // 创建路由守卫
  createRouterGuards(router)
}
export default router
