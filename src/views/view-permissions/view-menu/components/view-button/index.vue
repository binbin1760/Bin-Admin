<template>
  <n-drawer
    :width="450"
    v-model:show="show"
    :show-mask="true"
    :mask-closable="true"
  >
    <n-drawer-content
      title="菜单按钮配置信息"
      closable
    >
      <n-infinite-scroll
        style="height: 600px; border: 1px solid #efeff5"
        :distance="10"
        @load="handleLoad"
      >
        <div
          v-for="(item, index) in mockData"
          :key="index"
          class="button-item"
        >
          <div class="info-item">
            <span>按钮名称:</span>
            <n-ellipsis style="max-width: 180px">{{ item.name }}</n-ellipsis>
          </div>
          <div class="info-item">
            <span>权限编码:</span>
            <n-ellipsis style="max-width: 180px">{{ item.code }}</n-ellipsis>
          </div>
          <div class="info-item">
            <div>按钮描述:</div>
            <n-ellipsis
              style="max-width: 360px"
              line-clamp="3"
            >
              {{ item.description }}
            </n-ellipsis>
          </div>
        </div>
      </n-infinite-scroll>
    </n-drawer-content>
  </n-drawer>
</template>

<script setup lang="ts">
  import { BaseButton } from '@/views/view-permissions/baseType'

  const show = defineModel('show', { type: Boolean, default: false })
  const path = defineModel('path', { type: String, default: '' })

  const mockData = ref<Array<BaseButton>>([
    {
      id: '1',
      name: 'anniux',
      code: 'del:xxx:aaa',
      description:
        'alsdaksjdhalksjhdlaksjhdkajsdhlkjdhlksdjfhlsdkjfhalsdkjfhalsdjkfhlaskdfhalskdfjhalsdjkfhlakdjshf',
      path: 'xxxxx/xxxx/xxxx'
    },
    {
      id: '1',
      name: 'anniux',
      code: 'del:xxx:aaa',
      description:
        'alsdaksjdhalksjhdlaksjhdkajsdhlkjdhlksdjfhlsdkjfhalsdkjfhalsdjkfhlaskdfhalskdfjhalsdjkfhlakdjshf',
      path: 'xxxxx/xxxx/xxxx'
    },
    {
      id: '1',
      name: 'anniux',
      code: 'del:xxx:aaa',
      description:
        'alsdaksjdhalksjhdlaksjhdkajsdhlkjdhlksdjfhlsdkjfhalsdkjfhalsdjkfhlaskdfhalskdfjhalsdjkfhlakdjshf',
      path: 'xxxxx/xxxx/xxxx'
    },
    {
      id: '1',
      name: 'anniux',
      code: 'del:xxx:aaa',
      description:
        'alsdaksjdhalksjhdlaksjhdkajsdhlkjdhlksdjfhlsdkjfhalsdkjfhalsdjkfhlaskdfhalskdfjhalsdjkfhlakdjshf',
      path: 'xxxxx/xxxx/xxxx'
    }
  ])

  function handleLoad() {
    console.log('滚儿到底了')
  }
</script>
<style scoped lang="less">
  .button-item {
    height: 150px;
    display: grid;
    grid-template-areas: 'col1 col2' 'full full';
    grid-template-rows: 36px 1fr;
    gap: 12px;
    margin-top: 12px;
    border-top: 1px solid #efeff5;
    .info-item {
      padding: 8px;
    }
    .info-item:nth-child(1) {
      line-height: 32px;
      grid-area: col1;
    }
    .info-item:nth-child(2) {
      line-height: 32px;
      grid-area: col2;
    }
    .info-item:nth-child(3) {
      border-top: 1px solid #efeff5;
      grid-area: full;
    }
  }
  .button-item:first-child {
    border-top: none;
    margin-top: 0;
  }
</style>
