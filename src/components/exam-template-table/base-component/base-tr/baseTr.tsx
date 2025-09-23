import {
  CSSProperties,
  defineComponent,
  PropType,
  toRefs,
  inject,
  computed,
  ref
} from 'vue'
import {
  Inner_Column,
  baseTableType,
  emitter,
  mittEventField
} from '../../base'
import BaseCell from '../base-cell/cell'
import styles from '../base-tr/baseTr.module.css'
export default defineComponent({
  name: 'base-tr',
  props: {
    tableDex: {
      type: Number as PropType<number>,
      default: 0
    },
    data: {
      type: Object as PropType<Record<string, any>>,
      default: [],
      required: true
    },
    childrenKey: {
      type: String as PropType<string>,
      default: ''
    },
    columns: {
      type: Array as PropType<Array<Inner_Column>>,
      required: false,
      default: []
    },
    rowspan: {
      type: Number as PropType<number>,
      default: 1
    },
    dataIndex: {
      type: Number as PropType<number>,
      default: 0
    },
    childrenIndex: {
      type: Number as PropType<number>,
      default: 0
    }
  },
  emits: ['dragRange', 'dragEnd'],
  setup(props) {
    const {
      data,
      columns,
      tableDex,
      childrenKey,
      rowspan,
      dataIndex,
      childrenIndex
    } = toRefs(props)
    const isShowShaow = inject<{
      isLeft: ComputedRef<boolean>
      isRight: ComputedRef<boolean>
    }>('showShaowObj')
    const rowModalRef = inject<{
      rowRef: Ref<HTMLElement | null>
    }>('row-modal-ref')

    const baseTableHTML = inject<{
      tableRef: Ref<HTMLElement | null>
    }>('baseTableHTML')

    const baseTableProp = inject<{
      config: baseTableType
    }>('baseTableProp')

    let lastLeftIndex = ref<number>(-1)
    let firstRightIndex = ref<number>(-1)
    lastLeftIndex.value = columns.value.findLastIndex(
      (item) => item.fixed === 'left'
    )

    firstRightIndex.value = columns.value.findIndex(
      (item) => item.fixed === 'right'
    )

    function showRowModal(event: Event) {
      if (!baseTableProp?.config.draggable) {
        return
      }
      const target = event.currentTarget as HTMLElement
      if (baseTableHTML?.tableRef.value && rowModalRef?.rowRef.value) {
        const width = baseTableHTML?.tableRef.value.clientWidth
        const height = target.clientHeight
        const pos = target.getBoundingClientRect()
        const baseTablePos =
          baseTableHTML.tableRef.value.getBoundingClientRect()
        rowModalRef.rowRef.value.style.width = width + 'px'
        rowModalRef.rowRef.value.style.height = height + 'px'
        rowModalRef.rowRef.value.style.left = baseTablePos.left + 'px'
        rowModalRef.rowRef.value.style.top = pos.top + 'px'
        rowModalRef.rowRef.value.style.zIndex = '1'
        //计算拖动范围
        const isChildren =
          target.getAttribute('data-isChildren') === '1' ? true : false
        const childrenIndex = target.getAttribute('data-childrenindex')
        emitter.emit(mittEventField[1], {
          tableDex: tableDex.value,
          childrenKey: childrenKey.value,
          dataIndex: dataIndex.value,
          isChildren,
          childrenIndex,
          offset: pos.left
        })
      }
    }

    return () => (
      <tr class={styles['base-tr']}>
        {columns.value.map((item, _index) => {
          const styleProps: CSSProperties = {
            position: item.fixed ? 'sticky' : 'relative',
            width: item.width ? item.width + 'px' : 'auto',
            ...item.fixedCssProperties,
            zIndex: item.fixed ? 99 : 9
          }

          const shaowCLass = computed(() => {
            if (
              item.fixed === 'left' &&
              _index === lastLeftIndex.value &&
              !isShowShaow?.isLeft.value &&
              !item.isMergeCell
            ) {
              return styles['fixed-left-shadow']
            }

            if (
              item.fixed === 'right' &&
              _index === firstRightIndex.value &&
              !isShowShaow?.isRight.value &&
              !item.isMergeCell
            ) {
              return styles['fixed-right-shadow']
            }

            return ''
          })

          if (item.render) {
            const vn = item.render(data.value, _index)
            if (!item.isMergeCell) {
              return (
                <td
                  onclick={(event: Event) => {
                    showRowModal(event)
                  }}
                  rowspan={item.isChildren ? 1 : rowspan.value}
                  style={styleProps}
                  class={[styles['base-tr-td'], shaowCLass.value]}
                  data-row-key={item.key}
                  data-isChildren={item.isChildren ? 1 : 0}
                  data-dataIndex={dataIndex.value}
                  data-childrenIndex={childrenIndex.value}
                  data-tableDex={tableDex.value}
                >
                  {vn}
                </td>
              )
            }
          } else {
            if (!item.isMergeCell) {
              return (
                <td
                  onclick={(event: Event) => {
                    showRowModal(event)
                  }}
                  rowspan={item.isChildren ? 1 : rowspan.value}
                  style={styleProps}
                  class={[styles['base-tr-td'], shaowCLass.value]}
                  data-row-key={item.key}
                  data-isChildren={item.isChildren ? 1 : 0}
                  data-dataIndex={dataIndex.value}
                  data-childrenIndex={childrenIndex.value}
                  data-tableDex={tableDex.value}
                >
                  <BaseCell data={data.value[item.key]} />
                </td>
              )
            }
          }
        })}
      </tr>
    )
  }
})
