<template>
  <n-drawer
    :width="400"
    v-model:show="show"
    :show-mask="true"
    :mask-closable="true"
  >
    <n-drawer-content
      title="菜单配置"
      closable
    >
      <n-alert
        title="角色权限配置提示"
        type="warning"
        closable
      >
        同一个用户可以具有多个角色，所以在配置角色权限时可以按最低限度配置
      </n-alert>
      <n-divider>角色信息编辑</n-divider>
      <AsyncBaseForm
        ref="asyncBaseForm"
        :model="data"
        :config="roleFormCofnig"
        :cols="6"
        :x-gap="10"
        :y-gap="1"
        :label-width="110"
        @confirm="confirmFn"
        @cancel="cancel"
      />
      <n-divider>角色权限配置</n-divider>
      <div class="title">菜单：{{ currMenu?.name }}</div>
      <n-tree
        block-line
        :data="treeData"
        cascade
        checkable
        selectable
        expand-on-click
        :watch-props="['defaultCheckedKeys']"
        :default-checked-keys="defaultCheckedKeys"
        @update-checked-keys="updateTreeCheckKeys"
        @update-selected-keys="selectTreeKeys"
      />
      <div class="title">菜单按钮：</div>
      <n-checkbox-group
        v-if="buttons?.length"
        v-model:value="roleSelectedButtonIds"
      >
        <n-space>
          <n-checkbox
            v-for="(item, index) in buttons"
            :key="index"
            :value="item.id"
          >
            <div>
              <n-popover trigger="hover">
                <template #trigger>
                  <n-tag type="info">
                    {{ item.name }}
                  </n-tag>
                </template>
                <span>{{ item.description }}</span>
              </n-popover>
            </div>
          </n-checkbox>
        </n-space>
      </n-checkbox-group>
      <n-empty
        v-else
        description="当前菜单未匹配到按钮"
      ></n-empty>
      <div class="submit-role-config">
        <n-button
          type="default"
          @click="cancel"
        >
          取 消
        </n-button>
        <n-button
          type="info"
          @click="configRolePermisson"
        >
          确 认
        </n-button>
      </div>
    </n-drawer-content>
  </n-drawer>
</template>

<script setup lang="ts">
  import {
    BaseButton,
    BaseMenu,
    BaseRole,
    MenuAndMenuButtons,
    UpdateRoleParam
  } from '@/views/view-permissions/baseType'
  import { useRoleHooks } from '../../useRoleHook'
  import {
    getSideMenuList,
    getMenuButtonListByMenuId,
    updateRoleInfo,
    updateRolePermission,
    getRoleById
  } from '@/api'
  import { AsyncBaseForm } from '@/components'
  import { TreeOption } from 'naive-ui'

  const show = defineModel('show', { type: Boolean, default: false })
  const data = defineModel('data', { type: Object, required: true })
  const emit = defineEmits(['refresh'])
  const message = useMessage()

  const { roleFormCofnig } = useRoleHooks()
  const treeData = ref()
  const checkKeys = ref<Array<string>>()
  const selectKeys = ref<string>()
  const buttons = ref<Array<BaseButton>>()
  const currMenu = ref<MenuAndMenuButtons>()
  const roleSelectedButtonIds = ref<Array<string>>()
  const defaultCheckedKeys = ref<Array<string>>()

  async function confirmFn(_data: BaseRole) {
    const updateTime = Date.now()
    _data.updateTime = updateTime
    const res = await updateRoleInfo(_data)
    if (res.code === 200) {
      message.success(res.message)
      show.value = false
      emit('refresh')
    } else {
      message.error(res.message)
    }
  }

  function cancel() {
    currMenu.value = undefined
    buttons.value = undefined
    show.value = false
  }
  async function getSideMenuTree() {
    const res = await getSideMenuList()
    treeData.value = generateMenuTreeData(res.data)
  }

  function updateTreeCheckKeys(
    keys: Array<string | number>,
    _option: Array<TreeOption | null>,
    _meta: { node: TreeOption | null; action: 'check' | 'uncheck' }
  ) {
    checkKeys.value = keys as unknown as string[]
  }

  function selectTreeKeys(
    keys: Array<string | number>,
    _option: Array<TreeOption | null>,
    _meta: { node: TreeOption | null; action: 'select' | 'unselect' }
  ) {
    selectKeys.value = keys[0] as unknown as string
    getSelectKeysButtonList(selectKeys.value)
  }

  async function getSelectKeysButtonList(id: string) {
    const res = await getMenuButtonListByMenuId(id)
    buttons.value = res.data.buttons
    currMenu.value = res.data
  }

  async function configRolePermisson() {
    const params: UpdateRoleParam = {
      ...data.value,
      menusIds: checkKeys.value ? checkKeys.value : [],
      buttonIds: roleSelectedButtonIds.value ? roleSelectedButtonIds.value : []
    }
    const res = await updateRolePermission(params)
    if (res.code === 200) {
      message.success(res.message)
      show.value = false
      emit('refresh')
    } else {
      message.error(res.message)
    }
  }

  async function getEditRoleInfo(id: string) {
    const res = await getRoleById(id)
    if (res.code === 200) {
      const resMenuIds: Array<string> = res.data.menus.map((item) => item.id)
      defaultCheckedKeys.value = resMenuIds
      checkKeys.value = resMenuIds
      roleSelectedButtonIds.value = res.data.buttons.map((item) => item.id)
    } else {
      message.info('获取角色信息失败')
    }
  }

  function generateMenuTreeData(data: Array<BaseMenu>): Array<TreeOption> {
    return data.map((item) => {
      const treeNode: TreeOption = {
        key: item.id,
        label: item.name,
        nodeData: item
      }
      if (item.children && item.children.length > 0) {
        treeNode.children = generateMenuTreeData(item.children)
      }

      return treeNode
    })
  }

  getSideMenuTree()
  watch(
    () => data.value,
    (newVal) => {
      getEditRoleInfo(newVal.id)
    }
  )
</script>
<style scoped lang="less">
  .title {
    font-weight: bold;
    margin-bottom: 8px;
    padding-bottom: 4px;
    border-bottom: 1px solid var(--main-border-color);
  }
  .title:nth-child(2) {
    margin-top: 8px;
  }
  .submit-role-config {
    display: flex;
    align-items: center;
    justify-content: end;
    margin-top: 8px;
    padding-top: 8px;
    border-top: 1px solid var(--main-border-color);
    gap: 8px;
  }
</style>
