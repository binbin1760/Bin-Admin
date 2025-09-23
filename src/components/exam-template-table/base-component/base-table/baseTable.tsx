import {
  baseTableType,
  column,
  data,
  Inner_Column
} from '@/components/exam-template-table/base'
import {
  PropType,
  defineComponent,
  toRefs,
  computed,
  CSSProperties,
  ref,
  onMounted,
  provide,
  watch
} from 'vue'
import {
  getTreeDepth,
  getLeafNodes
} from '@/components/exam-template-table/tree-utils'
import BaseThead from '../base-thead/baseThead.tsx'
import BaseTbody from '../base-tbody/baseTbody.tsx'
import BaseSummary from '../base-summary/baseSummry.tsx'
import styles from './baseTable.module.css'

//计算每个节点的colspan
function markNodeColspan(tree: Array<Inner_Column>) {
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
function markNoderowspan(tree: Array<Inner_Column>, maxDeep: number) {
  tree.forEach((item) => {
    if (item.children && item.children.length > 0) {
      item.titleRowspan = item.titleRowspan ? item.titleRowspan : 1

      markNoderowspan(item.children, maxDeep - item.titleRowspan)
    } else {
      item.titleRowspan = item.titleRowspan ? item.titleRowspan : maxDeep
    }
  })
}
/**
 * 根据rowspan属性获取nodeArr
 * 知识点：需要搞明白什么叫广度优先搜索 什么叫深度优先搜索
 * 实现方式:广度优先搜索 + 设置偏移量  （节点的offset = 父代的rowspan || 1）
 * 该函数会对每一层进行深度标记 字段deep， 第一次默认为 1
 */
function getColumnsRowArry(
  data: Array<Inner_Column>,
  callback?: (params: Inner_Column) => void
) {
  if (!data || data.length === 0) return []
  const levels: Array<Array<Inner_Column>> = []
  let queue: Array<{ node: Inner_Column; offset: number }> = data.map(
    (node) => ({
      node,
      offset: 1
    })
  )

  while (queue.length > 0) {
    const currLevelNodeNumber = queue.length
    const currentLevel: Array<Inner_Column> = []
    let nextQueue: Array<{ node: Inner_Column; offset: number }> = []

    for (let i = 0; i < currLevelNodeNumber; i++) {
      const currNode = queue.shift() as unknown as {
        node: Inner_Column
        offset: number
      }

      if (currNode && callback) {
        callback(currNode.node)
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
          offset: currNode.node.titleRowspan || 1
        }))
        nextQueue = nextQueue.concat(nextQueueTemp)
      }
    }

    levels.push(currentLevel)
    queue = nextQueue
  }

  return levels
}

/**
 * 如果某子树开启粘性定位，那么子树任意节点的定位偏移量=该节点前一个兄弟节点的宽度+父节点的偏移量
 * 对isMergeCell设置默认值false
 */
function getStickyDisplacement(
  data: column[],
  displacement: number,
  deep: number,
  path: string
): Inner_Column[] {
  return data.map((item, index) => {
    const pathArr = path ? [path, item.key] : [item.key]
    const innerColumn: Inner_Column = {
      ...item,
      isMergeCell: false,
      deep,
      path: pathArr.join('.')
    }
    if (item.fixed && item.fixed === 'left') {
      const lastBrotherNodeWidth = index > 0 ? data[index - 1].width : 0
      const fixedCssProperties: CSSProperties = {
        left:
          displacement +
          (lastBrotherNodeWidth ? lastBrotherNodeWidth : 0) +
          'px'
      }
      innerColumn.fixedCssProperties = fixedCssProperties
      if (item.children && item.children.length > 0) {
        innerColumn.children = getStickyDisplacement(
          item.children,
          displacement + (lastBrotherNodeWidth ? lastBrotherNodeWidth : 0),
          deep + 1,
          pathArr.join('.')
        )
      }
    }
    if (item.fixed && item.fixed === 'right') {
      const brotherNodesWidthCount = data
        .filter((it, dex) => it.fixed === 'right' && dex > index)
        .reduce((acc, curr) => {
          return acc + (curr.width ? curr.width : 0)
        }, 0)
      innerColumn.fixedCssProperties = {
        right: displacement + brotherNodesWidthCount + 'px'
      }
      if (item.children && item.children.length > 0) {
        innerColumn.children = getStickyDisplacement(
          item.children,
          displacement + brotherNodesWidthCount,
          deep + 1,
          pathArr.join('.')
        )
      }
    }
    return innerColumn
  })
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
    },
    tableDex: {
      type: Number as PropType<number>,
      required: true,
      default: 0
    }
  },
  emits: ['update:config', 'tbodyMousemove'],
  setup(props, { emit }) {
    const { config, data, tableDex } = toRefs(props)
    const baseTableRef = ref<HTMLDivElement | null>()
    const tbodyRef = ref<HTMLDivElement | null>()
    const theadRef = ref<HTMLDivElement | null>()
    const tfootRef = ref<HTMLDivElement | null>()
    const scrollXRef = ref<HTMLDivElement | null>()
    const sliderWidth = ref<number>(50)
    //横向滚动条可以滚动的距离<仅是初始化状态，滚动条位置为0时>
    const canScorllDisplacement = ref<number>(0)
    //是否显示X轴滚动条
    const isShowXScorllBar = ref<boolean>(false)
    //是否显示Y轴滚动条
    const isShowYScorllBar = ref<boolean>(false)
    const isDrigger = ref<boolean>(false)
    const startX = ref<number>(0) //拖动开始的X坐标
    const startDriggerScrollPlace = ref<number>(0) //拖动开始时滚动条的位置
    const scrollPosition = ref<number>(0) //滚动条位置
    //计算节点粘性定位偏移量
    const inner_columns = computed({
      get: () =>
        getStickyDisplacement(
          config.value.columns,
          0,
          0,
          'exam-template-table-top'
        ),
      set: (val) => {
        //列拖动时 刷新数据
        let deep = getTreeDepth(val)
        markNodeColspan(val)
        markNoderowspan(val, deep)
        return val
      }
    })
    //计算树的深度(deep)
    let deep = getTreeDepth(inner_columns.value)
    //标记colspan
    markNodeColspan(inner_columns.value)
    //标记rowspan
    markNoderowspan(inner_columns.value, deep)
    //计算thead
    const columnsArr = computed({
      get: () => {
        return getColumnsRowArry(inner_columns.value, (data) => {})
      },
      set: (val) => val
    })
    //计算获取叶子节点
    const leafNodes = computed(() => {
      return getLeafNodes(inner_columns.value)
    })
    //自定义表格滚动条
    function mouseEnterEvent() {
      if (tbodyRef.value && config.value.scorllX) {
        canScorllDisplacement.value =
          config.value.scorllX - tbodyRef.value.clientWidth
        sliderWidth.value = Math.max(
          50,
          tbodyRef.value.clientWidth -
            (config.value.scorllX - tbodyRef.value.clientWidth)
        )
      }
      isShowXScorllBar.value = true && canScorllDisplacement.value > 0
    }

    function mouseOutEvent() {
      isShowXScorllBar.value = false
      isShowYScorllBar.value = false
    }

    //自定义滚动
    function handleDragStart(e: MouseEvent) {
      if (isDrigger.value) return

      if (canScorllDisplacement.value <= 0) return
      isDrigger.value = true
      startX.value = e.clientX
      startDriggerScrollPlace.value = scrollPosition.value
      document.addEventListener('mousemove', handleDragMove)
      document.addEventListener('mouseup', handleDragEnd)

      //防止滚动时选择文本
      e.preventDefault()
    }

    function handleDragMove(e: MouseEvent) {
      if (!isDrigger.value || !scrollXRef.value || !tbodyRef.value) return
      isShowXScorllBar.value = true
      const deltaX = e.clientX - startX.value
      let newPosition = startDriggerScrollPlace.value + deltaX
      document.body.style.cursor = 'pointer'
      //计算滚动范围
      // 限制滚动位置在有效范围内
      newPosition = Math.max(
        0,
        Math.min(newPosition, canScorllDisplacement.value)
      )
      scrollPosition.value = newPosition

      // 计算滚动比例并应用到表格
      const scrollRatio =
        canScorllDisplacement.value > 0
          ? newPosition / canScorllDisplacement.value
          : 0
      const scrollAmount = scrollRatio * canScorllDisplacement.value
      // 同步表格滚动
      if (tbodyRef.value) {
        tbodyRef.value.scrollLeft = scrollAmount
      }
      if (theadRef.value) {
        theadRef.value.scrollLeft = scrollAmount
      }
      if (tfootRef.value) {
        tfootRef.value.scrollLeft = scrollAmount
      }
    }

    function handleDragEnd(e: MouseEvent) {
      isDrigger.value = false
      isShowXScorllBar.value = false
      // 移除事件监听
      document.removeEventListener('mousemove', handleDragMove)
      document.removeEventListener('mouseup', handleDragEnd)
      document.body.style.cursor = ''
    }

    function tbodyMousemove(event: MouseEvent) {
      emit('tbodyMousemove', event)
    }
    // 初始化时计算滑块宽度
    onMounted(() => {
      if (tbodyRef.value && config.value.scorllX) {
        // 根据内容比例计算滑块宽度，确保不小于最小宽度
        sliderWidth.value = Math.max(
          50,
          tbodyRef.value.clientWidth -
            (config.value.scorllX - tbodyRef.value.clientWidth)
        )
        canScorllDisplacement.value =
          config.value.scorllX - tbodyRef.value.clientWidth
      }
      //监听表格 thead  tbody  tfoot 滚动事件
      if (theadRef.value) {
        theadRef.value.addEventListener('scroll', function () {
          if (theadRef.value && tbodyRef.value) {
            tbodyRef.value.scrollLeft = theadRef.value.scrollLeft
            scrollPosition.value = theadRef.value.scrollLeft
          }

          if (theadRef.value && tfootRef.value) {
            tfootRef.value.scrollLeft = theadRef.value.scrollLeft
            scrollPosition.value = theadRef.value.scrollLeft
          }
        })
      }

      if (tbodyRef.value) {
        tbodyRef.value.addEventListener('scroll', function () {
          if (theadRef.value && tbodyRef.value) {
            theadRef.value.scrollLeft = tbodyRef.value.scrollLeft
            scrollPosition.value = tbodyRef.value.scrollLeft
          }

          if (tfootRef.value && tbodyRef.value) {
            tfootRef.value.scrollLeft = tbodyRef.value.scrollLeft
            scrollPosition.value = tbodyRef.value.scrollLeft
          }
        })
      }

      if (tfootRef.value && config.value.summary?.scorllX) {
        tfootRef.value.addEventListener('scroll', function () {
          if (tbodyRef.value && theadRef.value && tfootRef.value) {
            tbodyRef.value.scrollLeft = tfootRef.value.scrollLeft
            theadRef.value.scrollLeft = tfootRef.value.scrollLeft
            scrollPosition.value = tfootRef.value.scrollLeft
          }
        })
      }
    })
    //传递滑块位置信息<是否在最左边或者最右边>
    provide('showShaowObj', {
      isLeft: computed(() => scrollPosition.value === 0),
      isRight: computed(
        () => scrollPosition.value >= canScorllDisplacement.value
      )
    })

    provide('baseTableHTML', {
      tableRef: baseTableRef
    })

    provide('baseTableProp', {
      config: config.value
    })
    watch(
      () => inner_columns.value,
      (newVal) => {
        inner_columns.value = newVal
      }
    )
    return () => (
      <div ref={baseTableRef}>
        <div
          style={{ display: config.value?.headerTitle ? 'block' : 'none' }}
          class={styles['base-table-header-title']}
        >
          {config.value?.headerTitle?.render
            ? config.value?.headerTitle?.render()
            : config.value.headerTitle?.title}
        </div>
        <div
          ref={theadRef}
          class={styles['base-table-scroll-contain']}
        >
          <table
            style={{ minWidth: config.value.scorllX + 'px' }}
            class={styles['base-table']}
          >
            <colgroup>
              {leafNodes.value.map((item) => {
                return <col style={{ width: item.width + 'px' }} />
              })}
            </colgroup>
            <BaseThead
              tableDex={tableDex.value}
              columns={columnsArr.value}
            />
          </table>
        </div>
        <div style={{ position: 'relative' }}>
          <div
            ref={tbodyRef}
            onMouseenter={mouseEnterEvent}
            onMouseleave={mouseOutEvent}
            onMousemove={tbodyMousemove}
            class={styles['base-table-tbody-contain']}
          >
            <table
              style={{ minWidth: config.value.scorllX + 'px' }}
              class={styles['base-table']}
            >
              <colgroup>
                {leafNodes.value.map((item) => {
                  return <col style={{ width: item.width + 'px' }} />
                })}
              </colgroup>
              <BaseTbody
                tableDex={tableDex.value}
                childrenKey={config.value.childrenKey}
                columns={leafNodes.value}
                data={data.value}
              />
            </table>
            <div
              ref={scrollXRef}
              style={{
                display: isShowXScorllBar.value ? 'block' : 'none',
                width: sliderWidth.value + 'px',
                left: scrollPosition.value + 'px'
              }}
              class={styles['base-table-scorll-x-bar']}
              onMousedown={handleDragStart}
            ></div>
            <div
              style={{ display: isShowYScorllBar.value ? 'block' : 'none' }}
              class={styles['base-table-scorll-y-bar']}
            ></div>
          </div>
        </div>
        <div
          ref={tfootRef}
          style={{ display: config.value?.summary ? 'block' : 'none' }}
          class={styles['base-table-summary']}
        >
          <table
            class={styles['base-table']}
            style={{
              width: config.value?.summary?.scorllX
                ? config.value?.summary?.scorllX + 'px'
                : 100 + '%'
            }}
          >
            <colgroup>
              {leafNodes.value.map((item) => {
                return <col style={{ width: item.width + 'px' }} />
              })}
            </colgroup>
            <BaseSummary columns={config.value.summary} />
          </table>
        </div>
      </div>
    )
  }
})
