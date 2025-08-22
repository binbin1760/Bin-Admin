import { Router } from 'vue-router'
import { whiteList } from './index'
import { verifyUserPermisson } from '@/api'
import { useAsyncRouteStore } from '@/store/modules/asyncRoutes'
import { useTagViewsStore } from '@/store/modules/tagViews'

export function createRouterGuards(Router: Router) {
  const useAsyncRoute = useAsyncRouteStore()
  const useTagViews = useTagViewsStore()
  useTagViews.initTagViews()
  Router.beforeEach(async (_to, _from, next) => {
    //白名单
    if (whiteList.includes(_to.path)) {
      next()
      return
    } else {
      //非白名单
      const permissions = await verifyUserPermisson()
      //后端权限校验
      if (permissions.code === 200) {
        useAsyncRoute.setAsyncRoutes(permissions.data.sideMenu)
        const pathArr = useAsyncRoute.getSideMenuPathArr(
          permissions.data.sideMenu
        )
        const tagList = useTagViews.getTagList
        tagList.forEach((item) => {
          const hasKey = pathArr.some((path) => item.key.includes(path))
          if (!hasKey) useTagViews.closeItem(item)
        })
        //是否有权限
        if (pathArr.includes(_to.path)) {
          next()
          return
        } else {
          //用户是否含有其他菜单
          if (pathArr.length > 0) {
            next(pathArr[0])
          } else {
            next('/err/403')
          }
          return
        }
      } else {
        //权限校验异常
        next('/err/403')
        return
      }
    }
  })
}
