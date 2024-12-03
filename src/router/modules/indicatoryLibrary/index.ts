import { RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/incatoryLibrary',
    meta: {
      name: '指标管理',
      sort: 1
    },
    redirect: '/incatoryLibrary/index',
    component: () => import('@/layout/index.vue'),
    children: [
      {
        path: '/incatoryLibrary/index',
        meta: {
          name: '指标库',
          isRoot: true,
          hidden: true,
          affix: false
        },
        component: () =>
          import('@/views/view-indicattory/view/indicatory-library.vue')
      }
    ]
  }
]

export default routes
