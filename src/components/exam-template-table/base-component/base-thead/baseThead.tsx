import {
  CSSProperties,
  defineComponent,
  PropType,
  toRefs,
  VNode,
  inject,
  computed
} from 'vue'
import styles from './baseThead.module.css'
import { Inner_Column } from '../../base'
export default defineComponent({
  name: 'BaseThead',
  props: {
    columns: {
      type: Array as PropType<Array<Inner_Column[]>>,
      default: [],
      required: true
    }
  },
  setup(props) {
    const { columns } = toRefs(props)
    const isShowShaow = inject<{
      isLeft: ComputedRef<boolean>
      isRight: ComputedRef<boolean>
    }>('showShaowObj')

    return () => (
      <thead class={styles['base-thead']}>
        {columns.value.map((_item, _index) => {
          const lastLeftIndex = _item.findLastIndex(
            (node) => node.fixed === 'left'
          )

          const firstRightIndex = _item.findIndex(
            (node) => node.fixed === 'right'
          )

          return (
            <tr class={styles['base-thead-tr']}>
              {_item.map((th, _th_dex) => {
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
                    _th_dex === lastLeftIndex &&
                    !isShowShaow?.isLeft.value
                  ) {
                    return styles['fixed-left-shadow']
                  }

                  if (
                    th.fixed === 'right' &&
                    _th_dex === firstRightIndex &&
                    !isShowShaow?.isRight.value
                  ) {
                    return styles['fixed-right-shadow']
                  }

                  return ''
                })

                return (
                  <th
                    style={styleProps}
                    class={[styles['base-th'], fixedShadowClass.value]}
                    rowspan={th.titleRowspan}
                    colspan={th.titleColspan}
                  >
                    {thTitle}
                  </th>
                )
              })}
            </tr>
          )
        })}
      </thead>
    )
  }
})
