import { RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/chat',
    meta: {
      name: 'Ai问答',
      sort: 999
    },
    redirect: '/ai/chat',
    component: () => import('@/layout/index.vue'),
    children: [
      {
        path: '/ai/chat',
        meta: {
          name: 'DeepSeek',
          isRoot: false,
          hidden: true,
          affix: true
        },
        component: () => import('@/views/view-chat/index.vue')
      }
    ]
  }
]

export default routes
