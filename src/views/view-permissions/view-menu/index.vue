<template>
  <div class="permission-menu">
    <div class="list-operate">
      <div class="btns">
        <n-button
          type="warning"
          @click="addMenuModal"
        >
          新增菜单
        </n-button>
      </div>
      <div class="search">
        <n-input
          v-model:value="searchMenu"
          placeholder="请输入部门ID"
          clearable
          style="width: 200px"
        >
          <template #suffix>
            <n-icon
              size="24"
              style="cursor: pointer"
            >
              <search-outlined />
            </n-icon>
          </template>
        </n-input>
      </div>
    </div>
    <div class="menu-table">
      <n-data-table
        :columns="columns"
        :data="data"
        :row-key="rowKey"
      />
    </div>
    <AddMenu
      v-model:show="showAddModal"
      @refresh="getAllSideMenu"
    />
    <EditMenu
      v-model:show="showEditModal"
      v-model:data="editMenuData"
      @refresh="getAllSideMenu"
    />
    <ConfigButton
      v-model:show="showButtonConfig"
      v-model:data="editMenuData"
    />
    <ViewButton
      v-model:show="showMenuButtonView"
      v-model:path="showMenuButtonQueryPath"
    />
  </div>
</template>

<script setup lang="ts">
  import { NButton, NHighlight, type DataTableColumns } from 'naive-ui'
  import { SearchOutlined } from '@vicons/antd'
  import styles from '../common.module.css'
  import { AddMenu, EditMenu, ConfigButton, ViewButton } from './components'
  import { BaseMenu } from '../baseType'
  import { getSideMenuList, deleteMenuById } from '@/api'
  import { useAsyncRouteStore } from '@/store/modules/asyncRoutes'

  const useAsycRoutes = useAsyncRouteStore()
  const dialog = useDialog()
  const message = useMessage()

  const data = ref<BaseMenu[]>()
  const searchMenu = ref<string>('')
  const showAddModal = ref<boolean>(false)
  const showEditModal = ref<boolean>(false)
  const editMenuData = ref<BaseMenu>()
  const showButtonConfig = ref<boolean>(false)
  const showMenuButtonView = ref<boolean>(false)
  const showMenuButtonQueryPath = ref<string>()
  const rowKey = (row: BaseMenu) => row.id
  const columns: DataTableColumns<BaseMenu> = [
    {
      title: '序号',
      key: 'sort',
      align: 'center'
    },
    {
      title: '菜单名称',
      key: 'name',
      align: 'center'
    },
    {
      title: '导航路径',
      key: 'path',
      align: 'center'
    },
    {
      title: '重定向路径',
      key: 'redirect',
      align: 'center'
    },
    {
      title: '是否为侧栏菜单',
      key: 'meta.hidden',
      align: 'center',
      render(row) {
        return h('span', {}, { default: () => (row.hidden ? '是' : '否') })
      }
    },
    {
      title: '是否为根节点',
      key: 'meta.isRoot',
      align: 'center',
      render(row) {
        return h('span', {}, { default: () => (row.isRoot ? '是' : '否') })
      }
    },
    {
      title: '是否需要固定TGA',
      key: 'meta.affix',
      align: 'center',
      render(row) {
        return h('span', {}, { default: () => (row.affix ? '需要' : '不需要') })
      }
    },
    {
      title: '操作',
      key: '',
      align: 'center',
      render(row) {
        const edit = h(
          NButton,
          {
            type: 'warning',
            size: 'small',
            onClick: () => {
              const deepCloneData = JSON.parse(JSON.stringify(row))
              showEditModal.value = true
              editMenuData.value = deepCloneData
            }
          },
          { default: () => '编辑' }
        )

        const del = h(
          NButton,
          {
            type: 'error',
            size: 'small',
            onClick: () => {
              const content =
                row.children && row.children.length > 0
                  ? `菜单${row.name}含有子菜单以及与其相关联的按钮，请确认是否一并删除?`
                  : `请确认是否删除${row.name}以及与其相关联的按钮?`
              const hightTextVnode = h(NHighlight, {
                text: content,
                patterns: [row.name, '其相关联的按钮'],
                highlightTag: 'span',
                highlightClass: 'hight-delet-wargining'
              })
              dialog.warning({
                title: '危险操作',
                content: () => hightTextVnode,
                positiveText: '删除',
                negativeText: '取消',
                draggable: false,
                onPositiveClick: () => {
                  deleMenu(row.id)
                }
              })
            }
          },
          { default: () => '删除' }
        )

        const editButton = h(
          NButton,
          {
            type: 'warning',
            size: 'small',
            onClick: () => {
              const deepClone = JSON.parse(JSON.stringify(row))
              editMenuData.value = deepClone
              showButtonConfig.value = true
            }
          },
          { default: () => '按钮设置' }
        )

        const btns = h(
          NButton,
          {
            type: 'primary',
            size: 'small',
            onClick: () => {
              showMenuButtonView.value = true
              showMenuButtonQueryPath.value = row.path
            }
          },
          { default: () => '页面按钮' }
        )
        return h('div', { class: styles['table-operate'] }, [
          btns,
          editButton,
          edit,
          del
        ])
      }
    }
  ]
  function addMenuModal() {
    showAddModal.value = true
  }
  async function getAllSideMenu() {
    const res = await getSideMenuList()
    if (res.code === 200) {
      data.value = res.data
      useAsycRoutes.setAsyncRoutes(res.data)
    }
  }

  async function deleMenu(id: string) {
    const res = await deleteMenuById(id)
    message.info(res.message)
    getAllSideMenu()
  }
  getAllSideMenu()
</script>
<style scoped lang="less">
  .permission-menu {
    height: 100%;
    display: flex;
    flex-direction: column;
    .list-operate {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 12px;
      flex-shrink: 0;
    }
    .menu-table {
      flex: 1;
    }
  }
</style>
