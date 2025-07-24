import { RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/permission',
    meta: {
      name: '权限管理',
      sort: 4
    },
    redirect: '/permission/button',
    component: () => import('@/layout/index.vue'),
    children: [
      {
        path: '/permission/userManage',
        meta: {
          name: '用户管理',
          isRoot: false,
          hidden: true,
          affix: false
        },
        component: () =>
          import('@/views/view-permissions/view-userManage/index.vue')
      },
      {
        path: '/permission/roleSet',
        meta: {
          name: '角色设置',
          isRoot: false,
          hidden: true,
          affix: false
        },
        component: () => import('@/views/view-permissions/view-role/index.vue')
      },
      {
        path: '/permission/menu',
        meta: {
          name: '菜单设置',
          isRoot: false,
          hidden: true,
          affix: false
        },
        component: () => import('@/views/view-permissions/view-menu/index.vue')
      }
    ]
  }
]

export default routes
