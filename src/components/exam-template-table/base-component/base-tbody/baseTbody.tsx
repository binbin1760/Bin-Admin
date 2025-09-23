import { defineComponent, PropType, toRefs, ref } from 'vue'
import { Inner_Column } from '../../base'
import BaseTr from '../base-tr/baseTr'
export default defineComponent({
  name: 'BaseTbody',
  props: {
    tableDex: {
      type: Number as PropType<number>,
      default: 0
    },
    childrenKey: {
      type: String as PropType<string>
    },
    columns: {
      type: Array as PropType<Array<Inner_Column>>,
      required: true
    },
    data: {
      type: Array as PropType<Array<any>>,
      required: false,
      default: []
    }
  },
  setup(props) {
    const { columns, data, childrenKey, tableDex } = toRefs(props)
    const tbodyRef = ref<HTMLElement | null>()
    return () => (
      <tbody ref={tbodyRef}>
        {data.value?.map((item, _index) => {
          if (childrenKey.value) {
            const childArr = item[childrenKey.value] as unknown as Array<
              Record<string, any>
            >
            const baseTrArr = childArr.map((child, childDex) => {
              if (childDex === 0) {
                const dataBaseTr = { ...item, ...child }
                return (
                  <BaseTr
                    dataIndex={_index}
                    rowspan={childArr.length}
                    childrenKey={childrenKey.value}
                    tableDex={tableDex.value}
                    data={dataBaseTr}
                    columns={columns.value}
                    childrenIndex={childDex}
                  />
                )
              } else {
                const childkeyColumns = columns.value.map((childkeyNode) => {
                  if (!childkeyNode.isChildren) {
                    return { ...childkeyNode, isMergeCell: true }
                  } else {
                    return childkeyNode
                  }
                })
                return (
                  <BaseTr
                    dataIndex={_index}
                    rowspan={childArr.length}
                    childrenKey={childrenKey.value}
                    tableDex={tableDex.value}
                    data={child}
                    columns={childkeyColumns}
                    childrenIndex={childDex}
                  />
                )
              }
            })

            return [...baseTrArr]
          } else {
            return (
              <BaseTr
                tbodyRef={tbodyRef.value}
                dataIndex={_index}
                childrenKey={childrenKey.value}
                tableDex={tableDex.value}
                data={item}
                columns={columns.value}
              />
            )
          }
        })}
      </tbody>
    )
  }
})
