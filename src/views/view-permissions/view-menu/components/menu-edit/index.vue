<template>
  <div class="parent-menu">{{ currentMenu?.name }}</div>
  <n-form
    :model="data"
    :label-width="130"
    label-align="right"
    label-placement="left"
    require-mark-placement="left"
    :rules="dataRule"
    style="margin-top: 10px"
  >
    <n-form-item
      label="路由路径"
      path="path"
    >
      <n-input
        v-model:value="data.path"
        placeholder="请输入路由路径"
      />
    </n-form-item>
    <n-form-item
      label="菜单序号"
      path="sort"
    >
      <n-input-number
        v-model:value="data.sort"
        :min="0"
      />
    </n-form-item>
    <n-form-item
      label="菜单名称"
      path="name"
    >
      <n-input
        v-model:value="data.name"
        placeholder="请输入菜单名称"
      />
    </n-form-item>
    <n-form-item
      label="最外层(根节点)?"
      path="meta.isRoot"
    >
      <n-radio-group v-model:value="data.isRoot">
        <n-space>
          <n-radio
            v-for="(radio, index) in radioGroup"
            :key="index"
            :value="radio.value"
          >
            {{ radio.label }}
          </n-radio>
        </n-space>
      </n-radio-group>
    </n-form-item>
    <n-form-item
      label="侧栏菜单?"
      path="hidden"
    >
      <n-radio-group v-model:value="data.hidden">
        <n-space>
          <n-radio
            v-for="(radio, index) in radioGroup"
            :key="index"
            :value="radio.value"
          >
            {{ radio.label }}
          </n-radio>
        </n-space>
      </n-radio-group>
    </n-form-item>
    <n-form-item
      label="标签固定?"
      path="meta.affix"
    >
      <n-radio-group v-model:value="data.affix">
        <n-space>
          <n-radio
            v-for="(radio, index) in radioGroup"
            :key="index"
            :value="radio.value"
          >
            {{ radio.label }}
          </n-radio>
        </n-space>
      </n-radio-group>
    </n-form-item>
    <n-form-item
      label="路由重定向"
      path="redirect"
    >
      <n-input v-model:value="data.redirect" />
    </n-form-item>
    <!-- <n-form-item
      label="路由重定向"
      path="redirect"
    >
      <n-input v-model:value="data.redirect" />
    </n-form-item> -->
    <n-form-item>
      <div class="submit">
        <n-button
          type="info"
          @click="submitSideMenu"
        >
          提 交
        </n-button>
      </div>
    </n-form-item>
  </n-form>
</template>

<script setup lang="ts">
  import { useAsyncRouteStore } from '@/store/modules/asyncRoutes'
  import { editOrAddSidemenu } from '@/api'
  import { useMessage } from 'naive-ui'
  const message = useMessage()
  const asyncRouteStore = useAsyncRouteStore()
  const currentMenu = computed({
    get() {
      return asyncRouteStore.getCurrentAddMenu
    },
    set() {
      return asyncRouteStore.getCurrentAddMenu
    }
  })
  interface Menu {
    path: string
    sort: number
    name: string
    isRoot: boolean
    hidden: boolean
    affix: boolean
    id: string
    redirect?: string
  }
  const data = ref<Menu>({
    path: '',
    name: '',
    isRoot: false,
    hidden: false,
    affix: false,
    sort: 0,
    id: '',
    redirect: ''
  })
  const dataRule = ref({
    path: {
      required: true,
      message: '请输入路由路径',
      trigger: 'blur'
    },
    meta: {
      name: {
        required: true,
        message: '请输入菜单名称',
        trigger: 'blur'
      },
      sort: {
        required: true,
        message: '请输入菜单序号',
        trigger: 'blur'
      }
    }
  })
  const radioGroup = ref([
    {
      label: '是',
      value: true
    },
    {
      label: '否',
      value: false
    }
  ])
  const emit = defineEmits(['update'])
  async function submitSideMenu() {
    const result = await editOrAddSidemenu(data.value)
    message.success(result.message)
    emit('update')
  }
  watch(
    () => asyncRouteStore.getCurrentEditMenu,
    (newVal) => {
      if (newVal) {
        data.value.path = newVal.path
        data.value.sort = newVal.meta?.sort as unknown as number
        data.value.isRoot = newVal.meta?.isRoot as unknown as boolean
        data.value.hidden = newVal.meta?.hidden as unknown as boolean
        data.value.affix = newVal.meta?.affix as unknown as boolean
        data.value.name = newVal.meta?.name as unknown as string
        data.value.redirect = newVal.redirect as unknown as string
        data.value.id = asyncRouteStore.getCurrentEditMenuId(
          newVal.path
        ) as unknown as string
        console.log(data.value)
      }
    },
    { immediate: true }
  )
</script>
<style scoped lang="less">
  .parent-menu {
    // padding: 10px;
    font-weight: 500;
    color: #333333;
    font-size: 18px;
    border-bottom: 1px solid #dddddd;
    // margin-bottom: calc(3 * var(--main-gap));
  }
  .submit {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>
