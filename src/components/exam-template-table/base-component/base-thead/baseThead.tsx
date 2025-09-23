import { defineComponent, PropType, toRefs } from 'vue'
import styles from './baseThead.module.css'
import { Inner_Column } from '../../base'
import BaseTh from '../base-th/baseTh'

export default defineComponent({
  name: 'BaseThead',
  props: {
    columns: {
      type: Array as PropType<Array<Inner_Column[]>>,
      default: [],
      required: true
    },
    tableDex: {
      type: Number as PropType<number>,
      default: 0,
      required: true
    }
  },
  setup(props) {
    const { columns, tableDex } = toRefs(props)
    return () => (
      <thead class={styles['base-thead']}>
        {columns.value.map((_item, _index) => {
          let lastDeepLeftRowIndex = _index
            ? columns.value[_index - 1].findLastIndex(
                (item) =>
                  item.titleRowspan &&
                  item.titleRowspan >= 2 &&
                  item.fixed === 'left'
              )
            : -1

          let lastDeepRightIndex = _index
            ? columns.value[_index - 1].findIndex(
                (item) =>
                  item.titleRowspan &&
                  item.titleRowspan >= 2 &&
                  item.fixed === 'right'
              )
            : -1
          return (
            <BaseTh
              lastDeepLeftIndex={lastDeepLeftRowIndex}
              lastDeepRightIndex={lastDeepRightIndex}
              tableDex={tableDex.value}
              columns={_item}
            />
          )
        })}
      </thead>
    )
  }
})
