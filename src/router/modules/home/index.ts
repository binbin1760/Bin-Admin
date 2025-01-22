import { RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/home',
    meta: {
      name: '控制面板',
      sort: 0
    },
    redirect: '/home/dashboard',
    component: () => import('@/layout/index.vue'),
    children: [
      {
        path: '/home/dashboard',
        meta: {
          name: '主页',
          isRoot: false,
          hidden: true,
          affix: true
        },
        component: () => import('@/views/bin-home/index.vue')
      }
    ]
  }
]

export default routes
