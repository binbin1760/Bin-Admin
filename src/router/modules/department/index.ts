import { RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/department',
    meta: {
      name: '组织人事',
      sort: 1
    },
    redirect: '/department/index',
    component: () => import('@/layout/index.vue'),
    children: [
      {
        path: '/department/index',
        meta: {
          name: '组织人事',
          isRoot: true,
          hidden: true,
          affix: true
        },
        component: () => import('@/views/view-department/index.vue')
      }
    ]
  }
]

export default routes
