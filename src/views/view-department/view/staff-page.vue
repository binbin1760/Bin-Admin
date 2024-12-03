<template>
  <div class="tree-tabe">
    <div class="tree">
      <div class="serach-box">
        <n-input v-model:value="params.depName" />
        <n-button
          type="info"
          @click="getDepTree"
        >
          搜 索
        </n-button>
      </div>
      <n-tree
        block-line
        :data="depData"
        checkable
        selectable
        :nodeProps="getDepInfo"
      />
    </div>
    <div class="data-table">
      <div class="btns">
        <n-button
          type="info"
          @click="addNewStaff"
        >
          新 增
        </n-button>
        <n-button type="info">导 出</n-button>
        <div class="search-box">
          <n-input
            round
            v-model:value="params.search"
          >
            <template #suffix>
              <n-icon
                :component="Search"
                style="cursor: pointer"
                @click="filtersTable"
              />
            </template>
          </n-input>
        </div>
      </div>
      <base-table
        :columns="column()"
        :request-api="getData"
        :query="query"
      />
    </div>
    <!-- add new staff modal -->
    <CreateStaffModal v-model:show="showModal" />
  </div>
</template>

<script setup lang="ts">
  import { DataTableColumns, TreeOption } from 'naive-ui'
  import { StaffType } from '../baseType'
  import { BaseResponse } from '@/unitls/request'
  import { Search } from '@vicons/ionicons5'
  import { CreateStaffModal } from '../components'
  const depData = ref<Array<TreeOption>>([
    {
      label: '部门CD',
      key: 1,
      prefix() {
        return h('span', {}, { default: () => '1' })
      },
      children: [
        {
          label: '部门A',
          key: 2,
          prefix() {
            return h('span', {}, { default: () => '2' })
          },
          children: [
            {
              label: '子部门子部门子部门子部门子部门子部门子部门子部门子部门',
              key: 3,
              prefix() {
                return h('span', {}, { default: () => '3' })
              }
            }
          ]
        }
      ]
    }
  ])

  const params = reactive({
    depName: '',
    search: ''
  })
  const column = (): DataTableColumns<StaffType> => [
    {
      title: '序号',
      key: '',
      align: 'center',
      render(_row, index) {
        return h('span', {}, index + 1)
      }
    },
    {
      title: '员工名称',
      align: 'center',
      key: 'name'
    },
    {
      title: '职位',
      align: 'center',
      key: 'position'
    },
    {
      title: '职级',
      align: 'center',
      key: 'rank'
    },
    {
      title: '所属部门',
      align: 'center',
      key: 'depInfo',
      render(row) {
        return h('span', {}, row.depInfo.departmentName)
      }
    },
    {
      title: '联系电话',
      align: 'center',
      key: 'phone'
    },
    {
      title: '操作',
      align: 'center',
      key: '',
      render() {
        return h('span', {}, { default: () => '删除' })
      }
    }
  ]
  const query = ref({
    id: 123123,
    name: 'xxxxx'
  })
  const showModal = ref<boolean>(false)
  async function getData(_param): Promise<BaseResponse<StaffType[]>> {
    return {
      data: [
        {
          id: '231321321',
          name: '张三',
          position: '工程师',
          rank: 1,
          depInfo: {
            departmentId: '23123131',
            departmentName: 'CD部门',
            departmentLeader: '',
            departmentLevel: '2',
            functional: '职能'
          },
          phone: '135468798654'
        }
      ],
      code: 200,
      pagination: {
        page: 1,
        pageSize: 20,
        total: 10
      },
      message: '请求成功'
    }
  }
  function getDepTree() {
    console.log(params)
  }
  function getDepInfo({ option }: { option: TreeOption }) {
    return {
      onClick() {
        console.log(option.label)
      }
    }
  }
  function filtersTable() {
    console.log(params)
  }
  function addNewStaff() {
    showModal.value = true
  }
</script>
<style scoped lang="less">
  .tree-tabe {
    display: flex;
    height: 100%;
    gap: calc(var(--main-gap) * 2);
    .tree {
      width: 300px;
      height: 100%;
      .serach-box {
        display: flex;
        align-items: center;
        gap: 4px;
        margin-bottom: 8px;
      }
    }
    .data-table {
      flex: 1;
      display: flex;
      flex-direction: column;
      .btns {
        width: 100%;
        display: flex;
        gap: 8px;
        margin-bottom: 8px;
        .search-box {
          margin-left: auto;
        }
      }
    }
  }
</style>
