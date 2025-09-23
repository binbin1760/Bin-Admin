import {
  CSSProperties,
  defineComponent,
  PropType,
  toRefs,
  VNode,
  inject,
  computed,
  ref
} from 'vue'
import styles from './baseTh.module.css'
import {
  Inner_Column,
  mittEventField,
  emitter,
  baseTableType
} from '../../base'

export default defineComponent({
  name: 'BaseTh',
  props: {
    lastDeepLeftIndex: {
      type: Number as PropType<number>,
      default: -1,
      required: true
    },
    lastDeepRightIndex: {
      type: Number as PropType<number>,
      default: -1,
      required: true
    },
    columns: {
      type: Array as PropType<Inner_Column[]>,
      default: [],
      requird: true
    },
    tableDex: {
      type: Number as PropType<number>,
      default: 0,
      required: true
    }
  },
  setup(props, ctx) {
    const { columns, tableDex, lastDeepLeftIndex, lastDeepRightIndex } =
      toRefs(props)
    const isShowShaow = inject<{
      isLeft: ComputedRef<boolean>
      isRight: ComputedRef<boolean>
    }>('showShaowObj')

    const baseTableProp = inject<{
      config: baseTableType
    }>('baseTableProp')

    const lastLeftIndex = computed(() => {
      return columns.value.findLastIndex((node) => node.fixed === 'left')
    })

    const firstRightIndex = computed(() => {
      return columns.value.findIndex((node) => node.fixed === 'right')
    })

    const openCurrentColsDrag = ref<boolean>(false)
    const fixedDirection = ref<string | undefined>(undefined)
    let dragTarget: HTMLElement | null = null
    let dragStarTarget: HTMLElement | null = null

    const parentPath = ref<string>()
    return () => (
      <tr class={styles['base-thead-tr']}>
        {columns.value.map((th, _th_dex) => {
          let thTitle: string | VNode = ''
          if (typeof th.title === 'string') {
            thTitle = th.title
          }
          if (typeof th.title === 'function') {
            thTitle = th.title()
          }
          const styleProps: CSSProperties = {
            position: th.fixed ? 'sticky' : 'relative',
            width: th.width ? th.width + 'px' : 'auto',
            ...th.fixedCssProperties,
            zIndex: th.fixed ? 99 : 9
          }
          const fixedShadowClass = computed(() => {
            if (
              th.fixed === 'left' &&
              _th_dex !== lastDeepLeftIndex.value &&
              _th_dex === lastLeftIndex.value &&
              !isShowShaow?.isLeft.value
            ) {
              return styles['fixed-left-shadow']
            }

            if (
              th.fixed === 'right' &&
              _th_dex !== lastDeepRightIndex.value &&
              _th_dex === firstRightIndex.value &&
              !isShowShaow?.isRight.value
            ) {
              return styles['fixed-right-shadow']
            }
            return ''
          })

          const canDrag = computed(() => {
            return fixedDirection.value === th.fixed
          })
          function mousedownEvent(column: Inner_Column) {
            if (!baseTableProp?.config.draggable) {
              return
            }
            openCurrentColsDrag.value = true
            const pathArr = column.path?.split('.')
            fixedDirection.value = column.fixed
            parentPath.value = pathArr
              ?.filter((_item, index) => index !== pathArr.length - 1)
              .join('.')
          }

          function mouseupEvent() {
            openCurrentColsDrag.value = false
            parentPath.value = undefined
            dragTarget = null
            dragStarTarget = null
          }

          function dragStar(event: DragEvent) {
            dragStarTarget = event.target as HTMLElement
          }

          function dragOver(event: DragEvent) {
            event.preventDefault()
          }

          function dragEnter(event: DragEvent) {
            event.preventDefault()
            dragTarget = event.target as HTMLElement
          }

          function dragend(event: DragEvent) {
            const target = event.target as HTMLElement
            const startFixed = target.getAttribute('fixed-direction')
            const endFixed = dragTarget?.getAttribute('fixed-direction')
            if (
              target !== dragTarget &&
              canDrag.value &&
              startFixed === endFixed
            ) {
              const dex = target.getAttribute('data-key')
              const enterDex = dragTarget?.getAttribute('data-key')
              if (dex && enterDex) {
                emitter.emit(mittEventField[0], {
                  tableDex: tableDex.value,
                  parent_path: parentPath.value,
                  keySort: [dex, enterDex]
                })
              }
            }

            openCurrentColsDrag.value = false
            parentPath.value = undefined
            dragTarget = null
            dragStarTarget = null
          }

          return (
            <th
              onDragstart={dragStar}
              onDragover={dragOver}
              onDragenter={dragEnter}
              onDragend={dragend}
              onMousedown={(_e: Event) => mousedownEvent(th)}
              onMouseup={mouseupEvent}
              draggable={
                openCurrentColsDrag.value &&
                parentPath.value &&
                th.path?.includes(parentPath.value) &&
                canDrag.value
              }
              style={{
                ...styleProps,
                color:
                  parentPath.value &&
                  th.path?.includes(parentPath.value) &&
                  canDrag.value
                    ? 'red'
                    : 'blue'
              }}
              class={[styles['base-th'], fixedShadowClass.value]}
              rowspan={th.titleRowspan}
              colspan={th.titleColspan}
              data-key={th.key}
              fixed-direction={th.fixed}
            >
              {thTitle}
            </th>
          )
        })}
      </tr>
    )
  }
})
