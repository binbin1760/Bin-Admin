import { RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/performance/plan',
    meta: {
      name: '绩效方案',
      isRoot: true,
      sort: 5
    },
    redirect: '/performance/plan/create',
    component: () => import('@/layout/index.vue'),
    children: [
      {
        path: '/performance/plan/create',
        meta: {
          name: '创建方案',
          isRoot: false,
          hidden: true,
          affix: false
        },
        component: () =>
          import('@/views/performance-plan/create-plan/index.vue')
      }
    ]
  }
]

export default routes
