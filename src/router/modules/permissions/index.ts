import { RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/permission',
    meta: {
      name: '权限设置',
      sort: 4
    },
    redirect: '/permission/button',
    component: () => import('@/layout/index.vue'),
    children: [
      {
        path: '/permission/menu',
        meta: {
          name: '菜单设置',
          isRoot: false,
          hidden: true,
          affix: false
        },
        component: () => import('@/views/view-permissions/view-menu/index.vue')
      },
      {
        path: '/permission/button',
        meta: {
          name: '按钮权限',
          isRoot: false,
          hidden: true,
          affix: false
        },
        component: () =>
          import('@/views/view-permissions/view-button/index.vue')
      }
    ]
  }
]

export default routes
