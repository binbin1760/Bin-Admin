import { defineStore } from 'pinia'
import { asyncRoutes } from '@/router/index'
import { RouteRecordRaw } from 'vue-router'
import { store } from '../index'

export interface asyncRoutesType {
  asyncRoutes: RouteRecordRaw[]
}

export const useAsyncRouteStore = defineStore({
  id: 'app-sync-route',
  state: (): asyncRoutesType => ({
    asyncRoutes: asyncRoutes
  }),
  getters: {
    getAsyncRoutes(): RouteRecordRaw[] {
      return this.asyncRoutes
    }
  },
  actions: {}
})
// use  outside setup
export function useAsyncRoute() {
  return useAsyncRouteStore(store)
}
