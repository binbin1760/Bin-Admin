<template>
  <n-scrollbar x-scrollable>
    <div
      ref="tabViewsRef"
      class="tab-views"
      @wheel="scrollX"
    >
      <div class="fix-tags">
        <n-dropdown
          :options="options"
          v-for="(item, index) in tagViews.getFixTags"
          :key="index"
          :show="showIndex === index"
          @clickoutside="() => (showIndex = undefined)"
          @select="fixSelectItem($event, item)"
        >
          <n-tag
            size="medium"
            :type="item.key === activeTag ? 'info' : 'default'"
            :closable="item.key !== '/home/dashboard'"
            @click.right.prevent="showFixDrapMenu(index)"
            @close="handleClose(item)"
          >
            <span
              class="tag-class"
              @click="selectOptions(item)"
            >
              {{ item.label }}
            </span>
          </n-tag>
        </n-dropdown>
      </div>
      <VueDraggable
        v-model="dragTagList"
        filter=".fix"
        class="tag-views"
      >
        <n-dropdown
          :options="options"
          v-for="(item, index) in dragTagList"
          :key="index"
          :show="showDragIndex === index"
          @clickoutside="() => (showDragIndex = undefined)"
          @select="fixSelectItem($event, item)"
        >
          <n-tag
            size="medium"
            :type="item.key === activeTag ? 'info' : 'default'"
            closable
            @click.right.prevent="showDragDrapMenu(index)"
            @close="handleClose(item)"
          >
            <span
              class="tag-class"
              @click="selectOptions(item)"
            >
              {{ item.label }}
            </span>
          </n-tag>
        </n-dropdown>
      </VueDraggable>
    </div>
  </n-scrollbar>
</template>

<script setup lang="ts">
  import { VueDraggable } from 'vue-draggable-plus'
  import { tagType, useTagViewsStore } from '@/store/modules/tagViews'
  import { whiteList } from '@/router/index'
  import { RouteRecordRaw } from 'vue-router'
  import {
    ColumnWidthOutlined,
    MinusOutlined,
    ArrowLeftOutlined,
    ArrowRightOutlined
  } from '@vicons/antd'
  import { NIcon } from 'naive-ui'
  import { BaseMenu } from '@/views/view-permissions/baseType'
  const route = useRoute()
  const router = useRouter()
  const tabViewsRef = ref<any>(null)
  const tagViews = useTagViewsStore()
  const useAsyncRoute = useAsyncRouteStore()
  const showIndex = ref<number>()
  const showDragIndex = ref<number>()

  const { getDragTags } = storeToRefs(tagViews)
  const dragTagList = computed({
    get() {
      return getDragTags.value
    },
    set() {
      return getDragTags.value
    }
  })
  const options = computed(() => {
    return [
      {
        label: '关闭左边',
        key: '1',
        disabled: tagViews.getTagListLength <= 2,
        icon: () => h(NIcon, null, { default: () => h(ArrowLeftOutlined) })
      },
      {
        label: '关闭右边',
        key: '2',
        disabled: tagViews.getTagListLength <= 2,
        icon: () => h(NIcon, null, { default: () => h(ArrowRightOutlined) })
      },
      {
        label: '关闭其他',
        key: '3',
        disabled: tagViews.getTagListLength <= 2,
        icon: () => h(NIcon, null, { default: () => h(ColumnWidthOutlined) })
      },
      {
        label: '关闭全部',
        key: '4',
        disabled: tagViews.getTagListLength <= 1,
        icon: () => h(NIcon, null, { default: () => h(MinusOutlined) })
      }
    ]
  })

  const activeTag = computed({
    get() {
      return route.fullPath
    },
    set() {
      return route.fullPath
    }
  })

  function showFixDrapMenu(index: number) {
    showIndex.value = index
  }
  function showDragDrapMenu(index: number) {
    showDragIndex.value = index
  }
  function fixSelectItem(key: string | number, tag: tagType) {
    switch (key) {
      case '1':
        tagViews.closeLeft(tag)
        router.push(tag.key)
        break
      case '2':
        tagViews.closeRight(tag)
        router.push(tag.key)
        break
      case '3':
        tagViews.closeOthers(tag)
        router.push(tag.key)
        break
      case '4':
        tagViews.clearHistory()
        router.push('/home/dashboard')
        break
    }
    showIndex.value = undefined
  }

  function handleClose(item: tagType) {
    if (tagViews.getTagListLength >= 2) {
      const index = tagViews.getTagList.findIndex((it) => item.key === it.key)
      router.push(tagViews.getTagList[index - 1].key)
      tagViews.closeItem(item)
    } else {
      tagViews.closeItem(item)
      router.push('/home/dashboard')
    }
  }

  function selectOptions(item: tagType) {
    router.push(item.key)
  }
  function scrollX(event: any) {
    if (event.deltaY > 0) {
      tabViewsRef.value.scrollLeft += 50
    } else {
      tabViewsRef.value.scrollLeft -= 50
    }
  }
  watch(
    route,
    (newVal) => {
      const { fullPath } = newVal
      if (!whiteList.includes(fullPath)) {
        tagViews.addTag(newVal as unknown as RouteRecordRaw)
      }
    },
    { immediate: true }
  )
  window.addEventListener('beforeunload', () => {
    const { fullPath } = route
    tagViews.saveTagViews(fullPath)
  })
</script>
<style scoped lang="less">
  .tab-views {
    display: flex;
    align-items: center;
    gap: 4px;
    background-color: var(--color-main-bg);
    padding: 8px 4px;
    overflow-x: scroll;
    &::-webkit-scrollbar {
      display: none;
    }
    .tag-class {
      cursor: pointer;
    }
    .fix-tags {
      margin-left: var(--main-gap);
      display: flex;
      align-items: center;
      gap: var(--main-gap);
      flex-basis: 0;
    }
    .tag-views {
      width: 100%;
      display: flex;
      align-items: center;
      gap: var(--main-gap);
      flex-wrap: nowrap;
    }
    .tag-view {
      padding: 4px;
      background-color: var(--color-header-bg);
      font-size: var(--fontSize-main-min);
      border-radius: var(--ra);
      cursor: pointer;
      white-space: nowrap;
    }
  }
</style>
