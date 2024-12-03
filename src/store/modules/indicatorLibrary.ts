import { store } from '../index'
import { defineStore } from 'pinia'

export interface IndicatoryType {
  id: string
  name: string
  type: number
  status: number
  expectation: string
  infact: string
  unit: string
  des: string //指标信息
}

export interface IndicatoryStoreType {
  list: Array<IndicatoryStoreType>
}
export const indicatoryLibraryStore = defineStore({
  id: 'indiactory-library',
  state: (): IndicatoryStoreType => ({
    list: []
  }),
  getters: {
    getList: (state) => state.list
  }
})

export function indiactoryLibrary() {
  return indicatoryLibraryStore(store)
}
