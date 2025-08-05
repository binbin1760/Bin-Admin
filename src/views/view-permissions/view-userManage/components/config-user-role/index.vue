<template>
  <n-modal
    v-model:show="show"
    class="custom-card"
    preset="card"
    title="分配角色"
    style="width: 500px"
    :bordered="false"
    @update-show="whenShowValUpdate"
  >
    <div class="config-box">
      <div style="flex-shrink: 0">角色：</div>
      <n-select
        v-model:value="selectRole"
        :options="options"
        :reset-menu-on-options-change="false"
        multiple
        clearable
        @scroll="handleScroll"
      />
    </div>
    <template #footer>
      <div class="config-footer">
        <n-button
          type="default"
          @click="cancel"
        >
          取 消
        </n-button>
        <n-button
          type="info"
          @click="confirm"
        >
          确 定
        </n-button>
      </div>
    </template>
  </n-modal>
</template>

<script setup lang="ts">
  import { getAllRoles, getUserRolesById } from '@/api'
  import { assignUserRoles } from '@/api'
  import { SelectOption } from 'naive-ui'

  const message = useMessage()

  const show = defineModel('show', { type: Boolean, default: false })
  const userId = defineModel('user-id', { type: String })
  const emit = defineEmits(['refresh'])
  const selectRole = ref<Array<string>>()
  const pageiniate = reactive({
    pageSize: 10,
    page: 1
  })
  const options = ref<Array<SelectOption>>([])
  async function getRoleList() {
    const res = await getAllRoles(pageiniate)
    if ((res.code = 200)) {
      const optionsTemp = res.data.map((item) => {
        return { label: item.name, value: item.id }
      })
      options.value = options.value.concat(optionsTemp)
    }
  }

  async function getUserRoles(id: string) {
    const res = await getUserRolesById(id)
    if (res.code === 200 && res.data) {
      selectRole.value = res.data.map((item) => item.id)
    }
  }

  function handleScroll(e: Event) {
    const currentTarget = e.currentTarget as HTMLElement
    const temp = currentTarget.scrollTop + currentTarget.offsetHeight
    if (temp - currentTarget.scrollHeight >= 2) {
      pageiniate.page = pageiniate.page + 1
      getRoleList()
    }
  }

  async function confirm() {
    if (userId.value) {
      const parmas = {
        roleIds: selectRole.value ?? [],
        userId: userId.value
      }
      const res = await assignUserRoles(parmas)
      if (res.code === 200) {
        message.success(res.message)
        show.value = false
        emit('refresh')
      } else {
        message.error(res.message)
      }
    } else {
      message.error('未匹配到用户')
    }
  }

  function cancel() {
    show.value = false
    userId.value = undefined
  }

  function whenShowValUpdate(value: boolean) {
    if (!value) {
      userId.value = undefined
    }
  }
  getRoleList()

  watch(
    () => userId.value,
    (newVal) => {
      if (newVal) {
        getUserRoles(newVal)
      }
    }
  )
</script>
<style scoped lang="less">
  .config-box {
    width: 100%;
    display: flex;
    align-items: center;
  }
  .config-footer {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 8px;
  }
</style>
