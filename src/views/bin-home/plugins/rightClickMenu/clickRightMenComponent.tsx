import { ListTable } from '@visactor/vtable'
import { defineComponent, toRefs, h, ref, PropType } from 'vue'
import styles from './clickRightMenu.module.css'

interface MenuItem {
  label: string | VNode
  key: string
  click?: (
    table: ListTable | null,
    eventType: string | null,
    eventInfo: any,
    componentVal?: any
  ) => void
  children?: MenuItem[]
}

const cascaderPlane = defineComponent({
  name: 'cascader-plane',
  props: {
    menu: {
      type: Array as PropType<Array<MenuItem>>,
      requried: true,
      default: []
    }
  },
  emits: ['click-item'],
  setup(props) {
    const { menu } = toRefs(props)
    return () => (
      <span class={styles['menu-contain']}>
        {menu.value.map((item) => {
          if (item.children && item.children.length > 0) {
            return <div>{item.label}</div>
          }
        })}
      </span>
    )
  }
})

export default defineComponent({
  name: 'right-menu',
  props: {
    menu: {
      type: Array as PropType<Array<MenuItem>>,
      requried: true,
      default: []
    }
  },
  emits: ['click-item'],
  setup(props, { emit }) {
    const { menu } = toRefs(props)

    function clickItem() {
      emit('click-item')
    }

    return () => (
      <cascaderPlane
        onClicItem={clickItem}
        menu={menu.value}
      />
    )
  }
})
