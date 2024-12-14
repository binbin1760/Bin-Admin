import { RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/department',
    meta: {
      name: '生产架构',
      sort: 1
    },
    redirect: '/department/index',
    component: () => import('@/layout/index.vue'),
    children: [
      {
        path: '/department/index',
        meta: {
          name: '产品线',
          isRoot: true,
          hidden: true,
          affix: false
        },
        component: () =>
          import('@/views/view-department/view/department-page.vue')
      },
      {
        path: '/staff/index',
        meta: {
          name: '生产员工',
          isRoot: true,
          hidden: true,
          affix: false
        },
        component: () => import('@/views/view-department/view/staff-page.vue')
      }
    ]
  }
]

export default routes
