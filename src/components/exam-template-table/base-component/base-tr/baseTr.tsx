import { defineComponent, PropType, toRefs } from 'vue'
import { column } from '../../base'
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
      type: Array as PropType<Array<column>>,
      required: false,
      default: []
    }
  },
  setup(props, ctx) {
    const { data, columns } = toRefs(props)
    return () => (
      <tr class={styles['base-tr']}>
        {columns.value.map((item, _index) => {
          if (item.render) {
            return item.render(data.value[_index], _index)
          } else {
            return (
              <td class={styles['base-tr-td']}>
                <BaseCell data={data.value[item.key]} />
              </td>
            )
          }
        })}
      </tr>
    )
  }
})
