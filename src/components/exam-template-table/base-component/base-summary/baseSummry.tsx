import {
  defineComponent,
  PropType,
  toRefs,
  computed,
  CSSProperties,
  inject
} from 'vue'
import { summary } from '../../base'
import styles from './baseSummary.module.css'

export default defineComponent({
  name: 'base-summary',
  props: {
    columns: {
      type: Object as PropType<summary>,
      required: false,
      default: []
    }
  },
  setup(props, ctx) {
    const { columns } = toRefs(props)
    const isShowShaow = inject<{
      isLeft: ComputedRef<boolean>
      isRight: ComputedRef<boolean>
    }>('showShaowObj')
    const summaryTfootTd = computed(() => {
      return columns.value?.columns ? columns.value?.columns : []
    })
    return () => (
      <tfoot>
        {summaryTfootTd.value.map((item, index) => {
          let tfootTdCssproperties: CSSProperties = {
            width: item.width ? item.width + 'px' : 'auto',
            position: item.fixed ? 'sticky' : 'static'
          }

          if (item.fixed === 'left') {
            const leftWidth = summaryTfootTd.value.reduce(
              (acc, cur, curIndex) => {
                const currVal =
                  curIndex < index && cur.width && item.fixed === 'left'
                    ? cur.width
                    : 0
                return acc + currVal
              },
              0
            )
            const firtsLeftNodeIndex = summaryTfootTd.value.findIndex(
              (leftNode) => leftNode.fixed === 'left'
            )
            tfootTdCssproperties.left =
              index === firtsLeftNodeIndex ? 0 : leftWidth + 'px'
          }

          if (item.fixed === 'right') {
            const rightWidth = summaryTfootTd.value.reduce(
              (acc, curr, currIndex) => {
                const currVal =
                  currIndex > index && item.fixed === 'right' && curr.width
                    ? curr.width
                    : 0
                return acc + currVal
              },
              0
            )

            tfootTdCssproperties.right = rightWidth + 'px'
          }

          const showShadow = computed(() => {
            if (item.fixed === 'left') {
              const lastLeftIndex = summaryTfootTd.value.findLastIndex(
                (leftNode) => leftNode.fixed === 'left'
              )
              return !isShowShaow?.isLeft.value && lastLeftIndex === index
                ? styles['fixed-left-shadow']
                : ''
            }

            if (item.fixed === 'right') {
              const firstRightIndex = summaryTfootTd.value.findIndex(
                (rightNode) => rightNode.fixed === 'right'
              )
              return !isShowShaow?.isRight.value && firstRightIndex === index
                ? styles['fixed-right-shadow']
                : ''
            }

            return ''
          })
          return (
            <td
              style={tfootTdCssproperties}
              class={[styles['base-tfoot-td'], showShadow.value]}
              colspan={item.colspan}
            >
              {item.data}
            </td>
          )
        })}
      </tfoot>
    )
  }
})
