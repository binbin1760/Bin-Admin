<template>
  <div class="header">
    <n-breadcrumb>
      <n-breadcrumb-item
        v-for="(item, index) in breadCrumbItem"
        :key="index"
      >
        <span @click="clickItem(item.key)">{{ item.name }}</span>
      </n-breadcrumb-item>
    </n-breadcrumb>
    <div class="base-info">用户</div>
  </div>
</template>

<script setup lang="ts">
  const route = useRoute()
  const router = useRouter()
  const breadCrumbItem = computed({
    get() {
      return route.matched.map((item) => {
        return { key: item.path, name: item.meta.name }
      })
    },
    set() {
      return route.matched.map((item) => {
        return { key: item.path, name: item.meta.name }
      })
    }
  })

  const clickItem = (key: string) => {
    router.push(key)
  }
</script>
<style scoped lang="less">
  .header {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: nowrap;
    box-sizing: border-box;
    background-color: var(--color-main-bg);
    padding: 8px 0;
    padding-left: var(--main-gap);
    .base-info {
      display: flex;
      align-items: center;
      flex-wrap: nowrap;
      padding: 0 calc(2.5 * var(--main-gap));
    }
  }
</style>
