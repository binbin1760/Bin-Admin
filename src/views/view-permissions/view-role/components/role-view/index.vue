<template>
  <n-drawer
    :width="400"
    v-model:show="show"
    :show-mask="true"
    :mask-closable="true"
    @update:show="whenShowChange"
  >
    <n-drawer-content
      title="角色信息"
      closable
    >
      <n-divider>角色基础信息</n-divider>
      <div class="role-info-item">
        <div class="label">角色名称：</div>
        <div class="value">{{ roleInfo?.name }}</div>
      </div>
      <div class="role-info-item">
        <div class="label">角色编码：</div>
        <div class="value">{{ roleInfo?.code }}</div>
      </div>
      <div class="role-info-item flex-d-c">
        <div class="label">角色描述：</div>
        <n-input
          type="textarea"
          :value="roleInfo?.description"
          disabled
          :autosize="{
            minRows: 8
          }"
          show-count
          :maxlength="500"
        />
      </div>
      <n-divider>角色权限信息</n-divider>
      <div>菜单:</div>
      <n-tree
        block-line
        cascade
        checkable
        expand-on-click
        selectable
        :data="treeData"
        :watch-props="['defaultCheckedKeys']"
        :default-checked-keys="defaultCheckedKeys"
        @update-selected-keys="selectTreeKeys"
      />
      <div>按钮:</div>
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
    </n-drawer-content>
  </n-drawer>
</template>

<script setup lang="ts">
  import {
    getMenuButtonListByMenuId,
    getRoleById,
    getSideMenuList
  } from '@/api'
  import {
    BaseButton,
    MenuAndMenuButtons
  } from '@/views/view-permissions/baseType'
  import { TreeOption } from 'naive-ui'
  import { useRoleHooks } from '@/views/view-permissions/view-role/useRoleHook'
  const show = defineModel('show', { type: Boolean, default: false })
  const roleId = defineModel('role-id', { type: String })
  const roleInfo = ref<MenuAndMenuButtons>()
  const treeData = ref<Array<TreeOption>>()
  const defaultCheckedKeys = ref<Array<string>>()
  const selectKeys = ref<string>()
  const buttons = ref<Array<BaseButton>>()
  const roleSelectedButtonIds = ref<Array<string>>()
  const { generateMenuTreeData } = useRoleHooks()
  async function getViewUserInfo(id: string) {
    const res = await getRoleById(id)
    if (res.code === 200) {
      roleInfo.value = res.data
      roleSelectedButtonIds.value = res.data.buttons.map((item) => item.id)
      defaultCheckedKeys.value = res.data.menus.map((item) => item.id)
    }
  }

  async function getSideMenu() {
    const res = await getSideMenuList()
    if (res.code) {
      treeData.value = generateMenuTreeData(res.data)
    }
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
    if (res.code === 200) {
      buttons.value = res.data.buttons
    }
  }

  function whenShowChange(data: boolean) {
    if (!data) {
      buttons.value = []
    }
  }

  getSideMenu()
  watch(
    () => roleId.value,
    (newVal) => {
      if (newVal) {
        getViewUserInfo(newVal)
      }
    }
  )
</script>
<style scoped lang="less">
  .role-info-item {
    display: flex;
    gap: 4px;
  }
  .role-info-item .label {
    flex-shrink: 0;
  }
  .flex-d-c {
    flex-direction: column;
  }
</style>
