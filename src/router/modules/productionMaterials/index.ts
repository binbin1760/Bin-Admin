import { RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/materials',
    meta: {
      name: '物料管理',
      sort: 1
    },
    redirect: '/materials/index',
    component: () => import('@/layout/index.vue'),
    children: [
      {
        path: '/materials/index',
        meta: {
          name: '生产原料',
          isRoot: false,
          hidden: true,
          affix: false
        },
        component: () =>
          import('@/views/view-materials/view/produce-materials.vue')
      }
    ]
  }
]

export default routes
