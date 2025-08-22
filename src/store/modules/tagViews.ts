import { getUserTagHistory, saveUserTagHistory } from '@/unitls'
import { store } from '../index'
import { defineStore } from 'pinia'
import {
  RouteLocationNormalizedLoadedGeneric,
  RouteRecordRaw
} from 'vue-router'

export type tagType = {
  key: string
  label: string
  affix: boolean
  lastPage?: boolean
}

export interface tagViewsType {
  tagList: Array<tagType>
}
export const useTagViewsStore = defineStore({
  id: 'tag-views-store',
  state: (): tagViewsType => ({
    tagList: []
  }),
  getters: {
    getFixTags(): Array<tagType> {
      return this.tagList.filter((item) => item.affix === true)
    },
    getDragTags(): Array<tagType> {
      return this.tagList.filter((item) => item.affix === false)
    },
    getTagListLength(): number {
      return this.tagList.length
    },
    getTagList(): Array<tagType> {
      return this.tagList
    }
  },
  actions: {
    //新增
    addTag(route: RouteLocationNormalizedLoadedGeneric) {
      const tag = {
        key: route.fullPath,
        label: route?.meta?.name,
        affix: route?.meta?.affix
      } as unknown as tagType
      const isAdd =
        this.tagList.length > 0
          ? this.tagList.every((item) => item.key !== tag.key)
          : true
      isAdd && this.tagList.push(tag)
    },
    //设置为可以拖动
    setCanDrag(route: RouteRecordRaw) {
      this.tagList.forEach((item) => {
        if (item.key === route.path) {
          item.affix = true
        }
      })
    },
    //设置为固定
    setCantDrag(route: RouteRecordRaw) {
      this.tagList.forEach((item) => {
        if (item.key === route.path) {
          item.affix = false
        }
      })
    },
    //清空浏览记录
    clearHistory() {
      this.tagList = []
    },
    //关闭其他
    closeOthers(tag: tagType) {
      this.tagList = this.tagList.filter((item) => item.key === tag.key)
    },
    //关闭左侧
    closeLeft(tag: tagType) {
      const tagIndex = this.tagList.findIndex((item) => item.key === tag.key)
      this.tagList = this.tagList.filter((_item, index) => index < tagIndex)
    },
    //关闭右侧
    closeRight(tag: tagType) {
      const tagIndex = this.tagList.findIndex((item) => item.key === tag.key)
      this.tagList = this.tagList.filter((_item, index) => index > tagIndex)
    },
    //关闭当前选中项
    closeItem(tag: tagType) {
      this.tagList = this.tagList.filter((item) => item.key !== tag.key)
    },
    //注册标签页列表
    initTagViews() {
      this.tagList = getUserTagHistory()
    },
    //缓存记录
    saveTagViews(url: string) {
      url &&
        this.tagList.forEach((item) => {
          if (item.key === url) {
            item.lastPage = true
          } else {
            item.lastPage = false
          }
        })

      this.tagList = this.tagList.filter((item) => {
        return (
          !item.key.includes('/redirect') || !item.key.includes('/redirect/all')
        )
      })
      saveUserTagHistory(this.tagList)
    }
  }
})

export function useTagViews() {
  return useTagViewsStore(store)
}
