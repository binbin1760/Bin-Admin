import { defineComponent, h, toRefs } from 'vue'
import { props } from './base'
import styles from './examTemplateTable.module.css'
import BaseTable from './base-component/base-table/baseTable'
const emptyVnode = h('div', { class: styles.empty }, '暂无数据')
/***
 * 1.模板存在多个table，所以table需要单独封装
 * 2.空数据的情况，需要分情况，如果某一个表格没有数据就显示空数据，如果所有表格都没有数据就显示一个统一的空数据
 */

export default defineComponent({
  name: 'examTemplateTable',
  props,
  setup(props, { slots }) {
    const { combineTables, data } = toRefs(props)
    return () => (
      <div class={styles.examTemplateTable}>
        <div class={styles['data-table-list']}>
          {data.value.length === 0
            ? emptyVnode
            : combineTables.value.map((item, _index) => (
                <BaseTable
                  config={item}
                  data={data.value[_index]}
                />
              ))}
        </div>
      </div>
    )
  }
})
