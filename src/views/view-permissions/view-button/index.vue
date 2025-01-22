<template>
  <div class="tree-set">
    <div class="tree">
      <n-tree
        block-line
        :data="treeOptons"
        selectable
        expand-on-click
        :node-props="getDepInfo"
        :default-expanded-keys="treeDefaultVal"
        :default-selected-keys="treeDefaultVal"
      />
    </div>
    <div class="set">button of page</div>
  </div>
</template>

<script setup lang="ts">
  import { useAsyncRouteStore } from '@/store/modules/asyncRoutes'
  import { RouteRecordRaw } from 'vue-router'
  import type { TreeOption } from 'naive-ui'
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

  let treeOptons = ref<Array<TreeOption>>([])
  let treeDefaultVal = ref<string[]>([])

  function getDepInfo({ option }: { option: TreeOption }) {
    return {
      onClick() {
        console.log(option)
      }
    }
  }

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
      flex: 1;
    }
  }
</style>
