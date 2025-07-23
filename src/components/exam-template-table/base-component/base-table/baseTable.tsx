import {
  baseTableType,
  column,
  data
} from '@/components/exam-template-table/base'
import { PropType, defineComponent, toRefs, computed } from 'vue'
import {
  getTreeDepth,
  getLeafNodes
} from '@/components/exam-template-table/tree-utils'
import BaseThead from '../base-thead/baseThead.tsx'
import BaseTbody from '../base-tbody/baseTbody.tsx'
import styles from './baseTable.module.css'

//计算每个节点的colspan
function markNodeColspan(tree: Array<column>) {
  tree.forEach((item) => {
    if (item.children && item.children.length > 0) {
      markNodeColspan(item.children)
      item.titleColspan = item.children.reduce((acc, curr) => {
        return acc + (curr.titleColspan ? curr.titleColspan : 1)
      }, 0)
    } else {
      item.titleColspan = item.titleColspan || 1
    }
  })
}
/**
 * 正序遍历树，rowspan =树的深度deep - 父节点的rowspan
 */
function markNodeRowspan(tree: Array<column>, maxDeep: number) {
  tree.forEach((item) => {
    if (item.children && item.children.length > 0) {
      item.rowspan = item.rowspan ? item.rowspan : 1
      markNodeRowspan(item.children, maxDeep - item.rowspan)
    } else {
      item.rowspan = item.rowspan ? item.rowspan : maxDeep
    }
  })
}
/**
 * 根据rowspan属性获取nodeArr
 * 知识点：需要搞明白什么叫广度优先搜索 什么叫深度优先搜索
 * 实现方式:广度优先搜索 + 设置偏移量  （节点的offset = 父代的rowspan || 1）
 */
function getColumnsRowArry(data: Array<column>) {
  if (!data || data.length === 0) return []
  const levels: Array<Array<column>> = []
  let queue: Array<{ node: column; offset: number }> = data.map((node) => ({
    node,
    offset: 1
  }))

  while (queue.length > 0) {
    const currLevelNodeNumber = queue.length
    const currentLevel: Array<column> = []
    let nextQueue: Array<{ node: column; offset: number }> = []

    for (let i = 0; i < currLevelNodeNumber; i++) {
      const currNode = queue.shift() as unknown as {
        node: column
        offset: number
      }

      if (currNode.offset === 1) {
        currentLevel.push(currNode.node)
      }

      const newOffset = currNode.offset - 1
      if (newOffset > 0) {
        nextQueue.push({
          node: currNode.node,
          offset: newOffset
        })
      }

      if (currNode.node.children && currNode.node.children.length > 0) {
        const nextQueueTemp = currNode.node.children.map((child) => ({
          node: child,
          offset: currNode.node.rowspan || 1
        }))
        nextQueue = nextQueue.concat(nextQueueTemp)
      }
    }

    levels.push(currentLevel)
    queue = nextQueue
  }

  return levels
}

export default defineComponent({
  name: 'BaseTable',
  props: {
    config: {
      type: Object as PropType<baseTableType>,
      required: true
    },
    data: {
      type: Array as PropType<data>,
      default: () => [],
      required: false
    }
  },
  setup(props) {
    const { config, data } = toRefs(props)
    //计算树的深度(deep)
    const deep = getTreeDepth(config.value.columns)
    //标记colspan
    markNodeColspan(config.value.columns)
    //标记rowspan
    markNodeRowspan(config.value.columns, deep)
    //计算thead
    const columnsArr = computed(() => {
      return getColumnsRowArry(config.value.columns)
    })
    //计算获取叶子节点
    const leafNodes = computed(() => {
      return getLeafNodes(config.value.columns)
    })
    return () => (
      <table class={styles['base-table']}>
        <BaseThead columns={columnsArr.value} />
        <BaseTbody
          columns={leafNodes.value}
          data={data.value}
        />
        <tfoot>
          <tr>
            <td></td>
          </tr>
        </tfoot>
      </table>
    )
  }
})
