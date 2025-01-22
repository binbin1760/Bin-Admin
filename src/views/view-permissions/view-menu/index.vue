<template>
  <div class="tree-set">
    <div class="tree">
      <n-tree
        block-line
        :data="treeOptons"
        selectable
        expand-on-click
        :default-selected-keys="treeDefaultVal"
        :default-expanded-keys="treeDefaultVal"
        :node-props="getDepInfo"
      />
    </div>

    <Transition
      class="animate__animated"
      enter-active-class="animate__fadeIn"
      leave-active-class="leave-active-class"
    >
      <div
        class="set"
        :key="showEdit"
      >
        <MenuEdit @update="getSideMenu" />
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
  import { useAsyncRouteStore } from '@/store/modules/asyncRoutes'
  import { RouteRecordRaw } from 'vue-router'
  import type { TreeOption } from 'naive-ui'
  import { MenuEdit } from './components'
  import { getSideMenuList } from '@/api'

  const asyncRouteStore = useAsyncRouteStore()
  function getTreeData(data: RouteRecordRaw[]): Array<TreeOption> {
    const treeArr = data.map((item) => {
      if (item.children && item.children.length > 0) {
        const children = getTreeData(
          item.children
        ) as unknown as Array<TreeOption>
        return { label: item.meta?.name, key: item.path, children }
      } else {
        return { label: item.meta?.name, key: item.path }
      }
    })
    return treeArr as unknown as Array<TreeOption>
  }
  let showEdit = ref<number>(0)
  let treeOptons = ref<Array<TreeOption>>([])
  let treeDefaultVal = ref<string[]>([])
  function getDepInfo({ option }: { option: TreeOption }) {
    return {
      onClick() {
        asyncRouteStore.setCurrentEditMenu(option.key as string)
        asyncRouteStore.setRootMenu({
          path: option.key as string,
          name: option.label as string
        })
        showEdit.value = showEdit.value + 1
      }
    }
  }
  //每次请求  需要设置
  /**
   * 1.getAsyncRoutes   根据后端路由信息更新本地路由信息
   * 2.设置tree组件的options
   * 2.设置tree组件的默认展开项
   * 3.设置默认选中项
   * 数据还是没有集中起来.....
   *
   */
  async function getSideMenu() {
    const result = await getSideMenuList()
    asyncRouteStore.setAsyncRoutes(result.data)
    treeOptons.value = getTreeData(asyncRouteStore.getAsyncRoutes)
    asyncRouteStore.setRootMenu({
      path: treeOptons.value[0].key as string,
      name: treeOptons.value[0].label as string
    })
    asyncRouteStore.setCurrentEditMenu(treeOptons.value[0].key as string)
    treeDefaultVal.value = [treeOptons.value[0].key as string]
  }

  getSideMenu()
</script>
<style scoped lang="less">
  .tree-set {
    height: 100%;
    display: flex;
    gap: calc(var(--main-gap) * 2.5);
    .tree {
      width: 300px;
      border: 1px solid #dddddd;
      border-radius: 2px;
    }
    .set {
      width: 400px;
    }
    .leave-active-class {
      display: none;
    }
  }
</style>
