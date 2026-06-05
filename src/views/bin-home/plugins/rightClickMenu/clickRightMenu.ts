import type { BaseTableAPI } from '@visactor/vtable/es/ts-types/base-table'
import type { TableEvents } from '@visactor/vtable/es/core/TABLE_EVENT_TYPE'
import type { pluginsDefinition } from '@visactor/vtable'
import * as VTable from '@visactor/vtable'
import type { ListTable } from '@visactor/vtable'
import { VNode, render, h, isVNode, ref } from 'vue'
import styles from './clickRightMenu.module.css'

export interface MenuItem {
  label: string | VNode
  key: string
  click?: (
    table: ListTable | null,
    eventType: string | null,
    eventInfo: any,
    componentVal?: any
  ) => void
  //   children?: MenuItem[];
}

interface config {
  menuOptions: MenuItem[]
  container: HTMLElement
}

export class clickRightMenu implements pluginsDefinition.IVTablePlugin {
  //该插件的作用就一个： 将options的addRecordRule改成 Object
  id: string = 'clickRightMenu'
  name: string = '自定义右键菜单'
  eventType: string | null = null
  table: ListTable | null = null
  eventInfo: any
  runTime: TableEvents[keyof TableEvents][] = [
    VTable.TABLE_EVENT_TYPE.PLUGIN_EVENT,
    VTable.TABLE_EVENT_TYPE.CONTEXTMENU_CANVAS,
    VTable.TABLE_EVENT_TYPE.CONTEXTMENU_CELL,
    VTable.TABLE_EVENT_TYPE.SCROLL
  ]
  menu: MenuItem[] = []
  container: HTMLElement | null = null //最外部容器，不是canvas标签
  menuContainer: HTMLElement | null = null
  _this: any
  menuHeight: number = 0
  menuWidth: number = 0

  // 全局监听句柄（方便销毁）
  private globalClickHandler?: (e: MouseEvent) => void
  private scrollHandler?: () => void

  constructor(config: config) {
    this.menu = config.menuOptions
    this.container = config.container
    this.initMenu(this.menu)
    this.bindGlobalHideEvents()
  }

  run: (...args: any) => void = (...args) => {
    this.table = args[2]
    this.eventType = args[1]
    this.eventInfo = args[0]
    // 阻止浏览器默认右键
    this.eventInfo?.event?.preventDefault()
    this.eventInfo?.event?.stopPropagation()

    if (this.eventType === VTable.TABLE_EVENT_TYPE.SCROLL) {
      this.hideMenu()
    }

    if (this.eventInfo && this.eventType !== VTable.TABLE_EVENT_TYPE.SCROLL) {
      this.showMenu(this.eventInfo.event.clientX, this.eventInfo.event.clientY)
    }
  }

  initMenu(menu: MenuItem[]) {
    //声明式菜单配置项
    const vnodeMenu = h(
      'span',
      { class: styles['menu-contain'] },
      {
        default: () =>
          menu.map((item) => {
            if (isVNode(item.label)) {
              const componentVal = ref()
              return h(item.label, {
                onChange: (val: any) => {
                  componentVal.value = val
                },
                onClick: () => {
                  item.click?.(
                    this.table,
                    this.eventType,
                    this.eventInfo,
                    componentVal.value
                  )
                  this.hideMenu()
                }
              })
            } else {
              return h(
                'div',
                {
                  class: styles['menu-item'],
                  onClick: () => {
                    item.click?.(this.table, this.eventType, this.eventInfo)
                    this.hideMenu()
                  }
                },
                { default: () => item.label }
              )
            }
          })
      }
    )

    //创建一个下拉菜单容器，挂载到VtableSheet 配置容器下边
    const div = document.createElement('div')
    div.style.cssText = `
      position: fixed;
      z-index: 9999999;
      display: block;
      left:-9999px;
      top:-99999px;
    `

    this.menuContainer = div
    this.container?.append(div)
    render(vnodeMenu, div)
    //记录容器初始高度
    this.menuHeight = this.menuContainer.offsetHeight
    this.menuWidth = this.menuContainer.offsetWidth
    this.menuContainer.style.display = 'none'
  }

  showMenu(clientX: number, clientY: number) {
    if (!this.menuContainer) return
    const innerHeight = window.innerHeight
    const innerWidth = window.innerWidth

    //碰撞检测
    const y =
      innerHeight - clientY > this.menuHeight
        ? clientY
        : clientY - this.menuHeight

    const x =
      innerWidth - clientX > this.menuWidth
        ? clientX + 5
        : clientX - this.menuWidth - 10
    this.menuContainer.style.display = 'block'
    this.menuContainer.style.left = x + 'px'
    this.menuContainer.style.top = y + 'px'
  }

  hideMenu() {
    if (!this.menuContainer) return
    this.menuContainer.style.display = 'none'
  }
  bindGlobalHideEvents() {
    // 箭头函数 = 永久绑定 this → 不会变！
    this.globalClickHandler = (e: MouseEvent) => {
      if (!this.menuContainer) return
      const target = e.target as HTMLElement
      if (!this.menuContainer.contains(target)) {
        this.hideMenu()
      }
    }

    this.scrollHandler = () => {
      this.hideMenu()
    }

    document.addEventListener('click', this.globalClickHandler)
    window.addEventListener('scroll', this.scrollHandler)
    window.addEventListener('resize', this.scrollHandler)
    this.container?.addEventListener('scroll', this.scrollHandler)
    this.container?.addEventListener('scroll', this.scrollHandler)
  }

  //动态渲染菜单
  generateMenu(container: HTMLElement, menu: MenuItem[]) {}

  update?: (() => void) | undefined = () => {
    console.log('update')
  }
  release?: ((table: BaseTableAPI) => void) | undefined = () => {
    if (this.globalClickHandler) {
      document.removeEventListener('click', this.globalClickHandler)
    }
    if (this.scrollHandler) {
      window.removeEventListener('scroll', this.scrollHandler)
      window.removeEventListener('resize', this.scrollHandler)
      this.container?.removeEventListener('scroll', this.scrollHandler)
      this.container?.removeEventListener('scroll', this.scrollHandler)
    }

    // 移除DOM
    if (this.menuContainer) {
      this.menuContainer.remove()
      this.menuContainer = null
    }
  }
}
