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
  }
})

export function systemStyleStting() {
  return useSystemStyleSettingStore(store)
}
