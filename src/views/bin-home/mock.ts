export const column = [
  {
    title: '施工采购合同规划及动态成本盈亏分析',
    key: 'name',
    children: [
      { title: '序号', key: 'index' },
      { title: '发包名称', key: 'pack_name' },
      { title: '类型', key: 'pack_type' },
      { title: '合同编号', key: 'contract_no' },
      { title: '包段数量', key: 'pack_num' },
      { title: '对外总价（未税）', key: 'untaxed_total' },
      { title: '投标总价', key: 'tender_total_count' },
      { title: '指导价总价（未税）', key: 'reference_total_price' },
      {
        title: '合同金额（未税）',
        key: 'contarct_price',
        children: [
          { title: '发包总价', key: 'pack_count_price' },
          { title: '增补金额', key: 'add_money' }
        ]
      },
      {
        title: '测试中间间隔一列',
        key: 'mid_row'
      },
      {
        title: '成本偏差（盈亏分析）',
        key: 'cost_variance',
        children: [
          { title: '对外', key: 'public' },
          { title: '投标', key: 'tender' },
          { title: '指导价', key: 'reference_price' }
        ]
      },
      {
        title: '偏差原因',
        key: 'reason'
      }
    ]
  }
]
