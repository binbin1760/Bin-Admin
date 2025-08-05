import { ref } from 'vue'
import { getChildDepAndUserList, getDepartmentTree } from '@/api'
import {
  UserTreeSelectNodeItem,
  DepChildNode
} from '@/store/modules/departmentAndStaff'
import { getTopDepStroage } from '@/unitls'
import { TreeSelectOption } from 'naive-ui'
import { BaseMenu } from '@/views/view-permissions/baseType'

export interface userAndDepHook {
  depId: string
  userId: string
  isUserLeaf: boolean
  isDepLeaf: boolean
}

export interface roleEditTreeOption extends BaseMenu {
  key: string
  label: string
}

export const useUserAndDepSelectHook = () => {
  const { id, name, treeLevl } = getTopDepStroage()
  const initData = ref<TreeSelectOption>({
    key: id as unknown as string,
    label: name as unknown as string,
    isLeaf: false,
    disabled: true,
    treeLevl
  })

  //获取员工选择器节点数据
  const getDepAndUserSelectNodeData = async (
    depId: string
  ): Promise<UserTreeSelectNodeItem[]> => {
    const res = await getChildDepAndUserList(depId)
    if (res.code === 200) {
      const treeNodeData: UserTreeSelectNodeItem[] = [
        ...res.data.childDepList,
        ...res.data.userList
      ].map((item) => {
        const { name, id, nodeType } = item
        return {
          label: name,
          key: id,
          disabled: nodeType === 1, //1表示部门节点
          isLeaf: nodeType === 0, // 0表示员工节点
          nodeData: item
        }
      })
      return treeNodeData
    } else {
      return []
    }
  }

  //获取部门选择器节点数据
  // 如果不穿id为null或者不传就会自动获取treeLevel为1的部门
  const getDepChildNdoeData = async (
    parentDepId: string
  ): Promise<DepChildNode[]> => {
    const res = await getDepartmentTree(parentDepId)
    if (res.code === 200) {
      return res.data.map((item) => ({
        label: item.name,
        key: item.id,
        isLeaf: item.isLeaf,
        nodeData: item
      }))
    } else {
      return []
    }
  }

  //初始化选择器数据
  const initDepAndUserSelectNodeData = async () => {
    if (id) {
      initData.value.children = (await getDepAndUserSelectNodeData(
        id
      )) as unknown as TreeSelectOption[]
    }
  }

  initDepAndUserSelectNodeData()
  return {
    initData,
    getDepAndUserSelectNodeData,
    getDepChildNdoeData
  }
}
