import { RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/indicator',
    meta: {
      name: '指标管理',
      isRoot: true,
      sort: 0
    },
    redirect: '/indicator/companyIndicator',
    component: () => import('@/layout/index.vue'),
    children: [
      {
        path: '/indicator/companyIndicator',
        meta: {
          name: '公司指标',
          isRoot: false,
          hidden: true,
          affix: false
        },
        component: () => import('@/views/bin-indicator/index.vue')
      },
      {
        path: '/indicator/divide/indicatorInfo',
        meta: {
          name: '指标分解',
          isRoot: false,
          hidden: false,
          affix: false
        },
        component: () =>
          import('@/views/bin-indicator/view/divide-indicator/index.vue')
      },
      {
        path: '/indicator/view/indicatorTree',
        meta: {
          name: '查看指标树',
          isRoot: false,
          hidden: false,
          affix: false
        },
        component: () =>
          import('@/views/bin-indicator/view/view-inidcator/index.vue')
      }
    ]
  }
]

export default routes
