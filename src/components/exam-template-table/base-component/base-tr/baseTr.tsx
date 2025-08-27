import {
  CSSProperties,
  defineComponent,
  PropType,
  toRefs,
  inject,
  computed,
  ref
} from 'vue'
import { Inner_Column } from '../../base'
import BaseCell from '../base-cell/cell'
import styles from '../base-tr/baseTr.module.css'
export default defineComponent({
  name: 'base-tr',
  props: {
    data: {
      type: Object as PropType<Record<string, any>>,
      default: [],
      required: true
    },
    columns: {
      type: Array as PropType<Array<Inner_Column>>,
      required: false,
      default: []
    }
  },
  setup(props, ctx) {
    const { data, columns } = toRefs(props)
    const isShowShaow = inject<{
      isLeft: ComputedRef<boolean>
      isRight: ComputedRef<boolean>
    }>('showShaowObj')
    let lastLeftIndex = ref<number>(-1)
    let firstRightIndex = ref<number>(-1)
    lastLeftIndex.value = columns.value.findLastIndex(
      (item) => item.fixed === 'left'
    )

    firstRightIndex.value = columns.value.findIndex(
      (item) => item.fixed === 'right'
    )

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
              !isShowShaow?.isLeft.value
            ) {
              return styles['fixed-left-shadow']
            }

            if (
              item.fixed === 'right' &&
              _index === firstRightIndex.value &&
              !isShowShaow?.isRight.value
            ) {
              return styles['fixed-right-shadow']
            }

            return ''
          })
          if (item.render) {
            const vn = item.render(data.value, _index)
            return (
              <td
                style={styleProps}
                class={[styles['base-tr-td'], shaowCLass.value]}
              >
                {vn}
              </td>
            )
          } else {
            return (
              <td
                style={styleProps}
                class={[styles['base-tr-td'], shaowCLass.value]}
              >
                <BaseCell data={data.value[item.key]} />
              </td>
            )
          }
        })}
      </tr>
    )
  }
})
