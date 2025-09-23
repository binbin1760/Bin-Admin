import { defineComponent, h, toRefs, onUnmounted, provide, ref } from 'vue'
import {
  props,
  mittEventField,
  DragCol,
  emitter,
  column,
  currentSelectRow
} from './base'
import styles from './examTemplateTable.module.css'
import BaseTable from './base-component/base-table/baseTable'
const emptyVnode = h('div', { class: styles.empty }, '暂无数据')
// 根据path定位到需要排序的父级columns
function traversByPath(
  data: Array<column>,
  pathArr: string[],
  callback: (node: column) => void
) {
  const target = pathArr.shift()
  data.forEach((item) => {
    if (item.key === target && pathArr.length === 0) {
      callback(item)
    }

    if (
      item.children &&
      item.children.length > 0 &&
      pathArr.length > 0 &&
      target === item.key
    ) {
      traversByPath(item.children, pathArr, callback)
    }
  })
}
/***
 * 1.模板存在多个table，所以table需要单独封装
 * 2.空数据的情况，需要分情况，如果某一个表格没有数据就显示空数据，如果所有表格都没有数据就显示一个统一的空数据
 * mitt用于跨组件通信 ，虽然可以通过触发事件修改数据，为了保证单向数据流，所有外部数据操作必须在顶层进行
 * 在./base 中的mittEventField变量中会保存该组件用到的所有事件名称
 */

export default defineComponent({
  name: 'examTemplateTable',
  props,
  emits: ['update:combineTables', 'update:data'],
  setup(props, { emit }) {
    const { combineTables, data } = toRefs(props)
    const rowDragRange = ref<HTMLElement | null>()
    const rowModalRef = ref<HTMLElement | null>()
    const rowModalDraggable = ref<boolean>(false)
    const startY = ref<number>(0)
    const endY = ref<number>(0)
    const moveDisplacement = ref<number>(0)
    const dragRowInfo = ref<currentSelectRow>()
    //列排序
    emitter.on(mittEventField[0], (data: DragCol) => {
      const pathArr = data.parent_path.split('.')
      const topKey = pathArr.shift()
      if (topKey === 'exam-template-table-top' && pathArr.length === 0) {
        const starDex = combineTables.value[data.tableDex].columns.findIndex(
          (item) => item.key === data.keySort[0]
        )

        const endDex = combineTables.value[data.tableDex].columns.findIndex(
          (item) => item.key === data.keySort[1]
        )
        if (starDex != -1 && endDex != -1) {
          const moveNode = combineTables.value[data.tableDex].columns.splice(
            starDex,
            1
          )[0]
          if (starDex < endDex) {
            combineTables.value[data.tableDex].columns.splice(
              endDex,
              0,
              moveNode
            )
          }

          if (starDex > endDex) {
            combineTables.value[data.tableDex].columns.splice(
              endDex,
              0,
              moveNode
            )
          }
        }
      } else {
        traversByPath(
          combineTables.value[data.tableDex].columns,
          pathArr,
          (node) => {
            if (node.children && node.children.length > 0) {
              const dragStartDex = node.children.findIndex(
                (item) => item.key === data.keySort[0]
              )
              const dragEndDex = node.children.findIndex(
                (item) => item.key === data.keySort[1]
              )
              if (dragStartDex != -1 && dragEndDex != -1) {
                const moveNode = node.children.splice(dragStartDex, 1)[0]
                if (dragStartDex < dragEndDex) {
                  node.children.splice(dragEndDex + 1, 0, moveNode)
                }

                if (dragStartDex > dragEndDex) {
                  node.children.splice(dragEndDex, 0, moveNode)
                }
                emit('update:combineTables', combineTables.value)
              }
            }
          }
        )
      }
    })
    //当前选中的row
    emitter.on(mittEventField[1], (data: currentSelectRow) => {
      dragRowInfo.value = data
    })

    function rowModalMoseDown(event: MouseEvent) {
      rowModalDraggable.value = true
      startY.value = event.clientY
      document.addEventListener('mousemove', tbodyMousemove)
    }

    function rowModalMoseup(event: MouseEvent) {
      rowModalDraggable.value = false
      if (rowModalRef.value && dragRowInfo.value) {
        const height = rowModalRef.value.clientHeight + 1
        const offset = Math.round(moveDisplacement.value / height)
        const currTop = rowModalRef.value.offsetTop
        rowModalRef.value.style.transform = `translateY(${0}px)`
        rowModalRef.value.style.top = currTop + offset * height + 'px'
        setTimeout(() => {
          if (rowModalRef.value && dragRowInfo.value) {
            rowModalRef.value.style.zIndex = '-1'
            const enterElement = document.elementFromPoint(
              event.pageX + 22 + dragRowInfo.value.offset,
              event.pageY
            )
            const targetTd =
              enterElement?.tagName === 'TD'
                ? enterElement
                : enterElement?.closest('td')
            if (targetTd) {
              dataSort(targetTd)
            }
          }
        }, 50)
      }
    }

    function rowModalMouseleav() {
      document.removeEventListener('mousemove', () => {})
    }

    function tbodyMousemove(event: MouseEvent) {
      if (rowModalDraggable.value && rowModalRef.value) {
        moveDisplacement.value = event.clientY - startY.value
        endY.value = event.clientY
        rowModalRef.value.style.transform = `translateY(${moveDisplacement.value}px)`
        rowModalRef.value.style.zIndex = '100000'
      }
    }

    function dataSort(targetTd: Element) {
      if (dragRowInfo.value && targetTd) {
        const baseTableData = data.value[dragRowInfo.value.tableDex]
        const dataIndex = targetTd.getAttribute('data-dataindex')
        const childrenIndex = targetTd.getAttribute('data-childrenIndex')
        const tableDex = targetTd.getAttribute('data-tableDex')
        // 在ROW内拖动
        //如果第一个cell就是rowspan大于1的那么需要找isChildren为true的第一个cell
        if (
          dragRowInfo.value &&
          dragRowInfo.value.isChildren &&
          dragRowInfo.value.dataIndex === Number(dataIndex) &&
          dragRowInfo.value.childrenKey &&
          dragRowInfo.value.childrenIndex &&
          dragRowInfo.value.childrenIndex !== childrenIndex &&
          Number(tableDex) === dragRowInfo.value.tableDex
        ) {
          const indexData = baseTableData[dragRowInfo.value.dataIndex] as any
          const rowData = indexData[dragRowInfo.value.childrenKey] as Array<
            Record<string, any>
          >
          if (Array.isArray(rowData)) {
            const moveNode = rowData.splice(
              Number(dragRowInfo.value.childrenIndex),
              1
            )[0]
            if (
              dragRowInfo.value.childrenIndex &&
              Number(dragRowInfo.value.childrenIndex) > Number(childrenIndex)
            ) {
              rowData.splice(Number(childrenIndex), 0, moveNode)
            }

            if (
              dragRowInfo.value.childrenIndex &&
              Number(dragRowInfo.value.childrenIndex) < Number(childrenIndex)
            ) {
              rowData.splice(Number(childrenIndex) + 1, 0, moveNode)
            }
          }
        }
        //拖动整列ROW
        if (
          dragRowInfo.value &&
          !dragRowInfo.value.isChildren &&
          dataIndex &&
          Number(dataIndex) !== dragRowInfo.value.dataIndex &&
          Number(tableDex) === dragRowInfo.value.tableDex
        ) {
          if (Array.isArray(baseTableData)) {
            const moveNode = baseTableData.splice(
              dragRowInfo.value.dataIndex,
              1
            )[0]
            if (dragRowInfo.value.dataIndex > Number(dataIndex)) {
              baseTableData.splice(Number(dataIndex), 0, moveNode)
            }

            if (dragRowInfo.value.dataIndex < Number(dataIndex)) {
              baseTableData.splice(Number(dataIndex) + 1, 0, moveNode)
            }
          }
        }
        emit('update:data', data.value)
      }
    }

    onUnmounted(() => {
      emitter.all.clear()
    })
    provide('row-modal-ref', {
      rowRef: rowModalRef,
      rowDragRange
    })
    return () => (
      <div class={styles.examTemplateTable}>
        <div
          onMousedown={rowModalMoseDown}
          onMouseup={rowModalMoseup}
          // onMouseleave={rowModalMouseleav}
          ref={rowModalRef}
          class={styles['row-modal']}
        >
          <div
            onMouseleave={rowModalMouseleav}
            class={[styles['drag-icon'], 'iconfont', 'icon-tuodong']}
          ></div>
        </div>
        <div
          ref={rowDragRange}
          class={styles['row-drag-range']}
        ></div>
        <div class={styles['data-table-list']}>
          {data.value.length === 0
            ? emptyVnode
            : combineTables.value.map((item, _index) => (
                <BaseTable
                  tableDex={_index}
                  config={item}
                  data={data.value[_index]}
                />
              ))}
        </div>
      </div>
    )
  }
})
