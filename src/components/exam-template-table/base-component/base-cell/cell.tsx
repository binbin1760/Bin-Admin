import { defineComponent, PropType, toRefs } from 'vue'
import styles from './cell.module.css'

export default defineComponent({
  name: 'BaseCell',
  props: {
    data: {
      required: false,
      default: ''
    }
  },
  setup(props) {
    const { data } = toRefs(props)
    return () => <div class={styles['base-cell']}>{data.value}</div>
  }
})
