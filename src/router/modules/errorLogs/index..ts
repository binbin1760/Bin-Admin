import { RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/errlogs',
    meta: {
      name: '异常管理',
      isRoot: true,
      sort: 7
    },
    redirect: '/errlogs/index',
    component: () => import('@/layout/index.vue'),
    children: [
      {
        path: '/errlogs/index',
        meta: {
          name: '异常日志',
          isRoot: false,
          hidden: false,
          affix: false
        },
        component: () => import('@/views/view-errorlogs/index.vue')
      }
    ]
  }
]

export default routes
