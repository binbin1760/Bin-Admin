import { RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/system-setting',
    meta: {
      name: '系统设置',
      sort: 0
    },
    redirect: '/system-setting/work-flow',
    component: () => import('@/layout/index.vue'),
    children: [
      {
        path: '/system-setting/work-flow',
        meta: {
          name: '流程配置',
          isRoot: false,
          hidden: true,
          affix: false
        },
        component: () => import('@/views/system-setting/work-flow/index.vue')
      }
    ]
  }
]

export default routes
