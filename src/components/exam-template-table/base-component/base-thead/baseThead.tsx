import { defineComponent, PropType, toRefs, VNode } from 'vue'
import styles from './baseThead.module.css'
import { column } from '../../base'
export default defineComponent({
  name: 'BaseThead',
  props: {
    columns: {
      type: Array as PropType<Array<column[]>>,
      default: [],
      required: true
    }
  },
  setup(props) {
    const { columns } = toRefs(props)
    return () => (
      <thead class={styles['base-thead']}>
        {columns.value.map((_item, _index) => {
          return (
            <tr class={styles['base-thead-tr']}>
              {_item.map((th) => {
                let thTitle: string | VNode = ''
                if (typeof th.title === 'string') {
                  thTitle = th.title
                }

                if (typeof th.title === 'function') {
                  thTitle = th.title()
                }
                return (
                  <th
                    class={styles['base-th']}
                    rowspan={th.rowspan}
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
