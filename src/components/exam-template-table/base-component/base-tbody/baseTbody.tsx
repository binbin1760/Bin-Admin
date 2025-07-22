import { defineComponent, PropType, toRefs } from 'vue'
import { column } from '../../base'
import BaseTr from '../base-tr/baseTr'
export default defineComponent({
  name: 'BaseTbody',
  props: {
    columns: {
      type: Array as PropType<Array<column>>,
      required: true
    },
    data: {
      type: Array as PropType<Array<any>>,
      required: false,
      default: []
    }
  },
  setup(props) {
    const { columns, data } = toRefs(props)
    return () => (
      <tbody>
        {data.value?.map((item, _index) => {
          return (
            <BaseTr
              data={item}
              columns={columns.value}
            />
          )
        })}
      </tbody>
    )
  }
})
