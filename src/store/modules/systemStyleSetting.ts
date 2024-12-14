import { defineStore } from 'pinia'
import { store } from '../index'
import { naiveComponentStyle } from '@/unitls'
import { GlobalThemeOverrides } from 'naive-ui'

export interface systemSettingType {
  naiveComponentStyle: GlobalThemeOverrides
}

export const useSystemStyleSettingStore = defineStore({
  id: 'system-style-setting',
  state: (): systemSettingType => ({
    naiveComponentStyle: naiveComponentStyle
  }),
  getters: {
    getNaiveComponentStyle(): GlobalThemeOverrides {
      return this.naiveComponentStyle
    }
  },
  actions: {
    // 保存自定义样式
    saveNaiveComponentStyleToloacl(): void {
      const data = JSON.stringify(this.$state.naiveComponentStyle)
      localStorage.setItem('styleList', data)
    },
    // 读取
    getLocalStyle() {
      const data = localStorage.getItem('styleList')
      const temp = data ? JSON.parse(data) : null
      this.naiveComponentStyle = temp ? temp : naiveComponentStyle
    },
    //重置为默认样式
    reSetTodefault(): void {
      localStorage.removeItem('styleList')
      this.naiveComponentStyle = naiveComponentStyle
    }
    //基于文档定向修改
  }
})

export function systemStyleStting() {
  return useSystemStyleSettingStore(store)
}
