<template>
  <n-drawer
    :width="600"
    v-model:show="show"
    :show-mask="true"
    :mask-closable="true"
  >
    <n-drawer-content
      title="菜单配置"
      closable
    >
      <div class="menu-button-config">
        <n-alert
          type="warning"
          title="按钮配置说明"
        >
          按钮权限是前后端共同控制的，这里新增或者变更按钮信息后，请联系前端开发同步更新
        </n-alert>

        <n-divider title-placement="center">
          {{ data?.meta.name }}
        </n-divider>
        <n-infinite-scroll
          style="height: 240px"
          :distance="10"
          @load="handleLoad"
          v-if="buttonList.length"
        >
          <div
            v-for="(item, index) in buttonList"
            :key="index"
            class="button-list-item"
          >
            <div class="button-info">
              <div class="button-info-item">
                <span>按钮名称：</span>
                <n-ellipsis
                  style="max-width: 100px"
                  :line-clamp="2"
                >
                  <n-highlight
                    highlight-class="naive-ui-high-light"
                    :text="item.name"
                    :patterns="namePatterns"
                  />
                </n-ellipsis>
              </div>
              <div class="button-info-item">
                <span>权限编码:</span>
                <n-ellipsis
                  style="max-width: 100px"
                  :line-clamp="2"
                >
                  <n-highlight
                    highlight-class="naive-ui-high-light"
                    :patterns="codePatterns"
                    :text="item.code"
                  />
                </n-ellipsis>
              </div>
            </div>
            <n-popover
              trigger="hover"
              placement="left"
            >
              <template #trigger>
                <n-button
                  type="info"
                  size="tiny"
                  @click="dbClickCopyButtonDescription(item.description)"
                >
                  按键描述
                </n-button>
              </template>
              <span>{{ item.description }}</span>
            </n-popover>
            <n-button
              type="error"
              size="tiny"
            >
              删除
            </n-button>
          </div>
        </n-infinite-scroll>
        <n-empty
          v-else
          description="当前菜单没有按钮"
        />
        <n-divider title-placement="center">新增按钮</n-divider>
        <AsyncBaseForm
          ref="asyncBaseForm"
          :model="buttonModel"
          :config="buttonFormConfig"
          :cols="6"
          :x-gap="10"
          :y-gap="1"
          :label-width="110"
          @confirm="confirmFn"
          @cancel="cancel"
        />
      </div>
    </n-drawer-content>
  </n-drawer>
</template>

<script setup lang="ts">
  import { BaseButton, BaseMenu } from '@/views/view-permissions/baseType'
  import { useMenuHook } from '../../useMenuHook'
  import { AsyncBaseForm } from '@/components'
  import { NAlert } from 'naive-ui'
  import { clickCopy } from '@/unitls'

  const show = defineModel('show', { type: Boolean, default: false })
  const data = defineModel('data', { type: Object })
  const emit = defineEmits(['refresh'])
  const message = useMessage()

  const buttonList = ref<Array<BaseButton>>([
    {
      id: 'xxxxx',
      name: 'xxxxaadsxxxxaadsxxxxaadsxxxxaadsxxxxaads',
      description: '这是个XXX',
      code: 'xxxxaadsxxxxaadsxxxxaadsxxxxaadsxxxxaadsxxxxaadsxxxxaads',
      path: 'XXX/XXX/XXX'
    },
    {
      id: 'xxxxx2',
      name: '删除XXX',
      description: '这是个XXX',
      code: 'xxxxaads2',
      path: 'XXX/XXX/XXX'
    },
    {
      id: 'xxxxx3',
      name: '删除XXX3',
      description: '这是个XXX',
      code: 'xxxxaads3',
      path: 'XXX/XXX/XXX'
    },
    {
      id: 'xxxxx3',
      name: '删除XXX3',
      description: '这是个XXX',
      code: 'xxxxaads3',
      path: 'XXX/XXX/XXX'
    },
    {
      id: 'xxxxx4',
      name: '删除XXX4',
      description: '这是个XXX',
      code: 'xxxxaads4',
      path: 'XXX/XXX/XXX'
    },
    {
      id: 'xxxxx31',
      name: '删除XXX212',
      description: '这是个XXX',
      code: 'xxxxaads3',
      path: 'XXX/XXX/XXX'
    },
    {
      id: 'xxxxx312',
      name: '删除XXX3123',
      description: '这是个XXX',
      code: 'xxxxaads3',
      path: 'XXX/XXX/XXX'
    },
    {
      id: 'xxxxx4123',
      name: '删除XXX4123',
      description: '这是个XXX',
      code: 'xxxxaads4123',
      path: 'XXX/XXX/XXX'
    },
    {
      id: 'xxxxx123123',
      name: '删除XXXasd',
      description: '这是个XXX',
      code: 'xxxxaadsasdad',
      path: 'XXX/XXX/XXX'
    },
    {
      id: 'xxxxx1asdas',
      name: '删除XXXaaaxxx',
      description: '这是个XXX',
      code: 'xxxxaadsasdasd',
      path: 'XXX/XXX/XXX'
    }
  ])

  const namePatterns = ref<Array<string>>([])
  const codePatterns = ref<Array<string>>([])
  const { buttonFormConfig, buttonModel } = useMenuHook(
    buttonNamePattern,
    buttonCodePattern
  )
  const asyncBaseForm = ref()
  function confirmFn(_data: BaseMenu) {
    emit('refresh')
  }
  function cancel() {
    show.value = false
  }
  function handleLoad() {
    console.log(111)
  }
  //权限编码/按钮名称高亮匹配
  function buttonNamePattern(_name: string) {
    if (_name) {
      namePatterns.value[0] = _name
    } else {
      namePatterns.value = []
    }
  }
  function buttonCodePattern(_code: string) {
    if (_code) {
      codePatterns.value[0] = _code
    } else {
      codePatterns.value = []
    }
  }
  function dbClickCopyButtonDescription(text: string) {
    clickCopy(
      text,
      () => {
        message.success('复制按键描述成功')
      },
      () => {
        message.error('复制按键描述失败')
      }
    )
  }
</script>
<style scoped lang="less">
  .edit-menu-button {
    display: flex;
    flex-direction: column;
  }
  .add-btn-form,
  .edit-menu-form {
    display: flex;
    flex-direction: column;
  }
  .button-list-item {
    display: flex;
    align-items: center;
    height: 36px;
    gap: 5px;
    justify-content: space-between;
    margin-bottom: 10px;
    .button-info {
      display: grid;
      grid-template-columns: 1fr 1fr;
      flex: 1;
      .button-info-item {
        display: flex;
        align-items: center;
        overflow: hidden;
        text-overflow: ellipsis;
        span {
          flex-shrink: 0;
        }
      }
    }
  }

  .itbutton-list-itemem:last-child {
    margin-bottom: 0;
  }
</style>
