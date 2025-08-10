import { RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/err',
    meta: {
      name: '错误页',
      sort: 0
    },
    redirect: '/err/403',
    component: () => import('@/layout/index.vue'),
    children: [
      {
        path: '/err/403',
        meta: {
          name: '无权访问',
          isRoot: false,
          hidden: false,
          affix: true
        },
        component: () => import('@/views/err-page/no-permission/index.vue')
      }
    ]
  }
]

export default routes
