import { NCascader } from 'naive-ui'
import { h, createApp, defineComponent } from 'vue'
import { EditContext, IEditor } from '@visactor/vtable-editors'

export class cascaderEditor implements IEditor {
  config: Record<string, any> = {} // 组件的属性值
  value: any //选中的值
  selectdItem: any //选中的项  包含label ,value
  vueApp: any //vue实例
  element?: HTMLElement | null //编辑器容器
  container?: HTMLElement | null //表格容器
  endEdit?: () => void //结束编辑的回调函数
  flatten: Map<string, any> = new Map()

  constructor(props: Record<string, any>) {
    this.config = props
    if (Array.isArray(this.config.options)) {
      this.travelCascaderTree(
        this.config.options,
        (node: Record<string, any>) => {
          this.flatten.set(node.value, node)
        }
      )
    }
  }

  onStart({ container, value, referencePosition, endEdit }: EditContext) {
    const div = document.createElement('div')
    div.style.position = 'absolute'
    div.style.width = '100%'
    div.style.padding = '1px'
    div.style.boxSizing = 'border-box'
    this.value = value
    const app = this.createVueApp(value)
    app.mount(div)
    container.appendChild(div)
    this.vueApp = app
    this.element = div
    this.container = container
    this.updatePosition(referencePosition.rect)
    this.endEdit = endEdit
  }

  updatePosition(rect: {
    left: number
    top: number
    width: number
    height: number
  }) {
    if (this.element) {
      this.element.style.top = `${rect.top}px`
      this.element.style.left = `${rect.left}px`
      this.element.style.width = `${rect.width}px`
      this.element.style.height = `${rect.height}px`
    }
  }

  onEnd() {
    if (this.vueApp) {
      this.vueApp.unmount()
      this.vueApp = null
    }
    if (this.element && this.container) {
      this.container.removeChild(this.element)
      this.element = null
    }
  }

  getValue() {
    return this.value
  }

  createVueApp(defaultVal: any) {
    const _this = this
    return createApp(
      defineComponent({
        props: this.config,
        setup() {
          const options = _this.config.options
          return () =>
            h(NCascader, {
              placeholder: '请选择',
              value: defaultVal,
              options: options,
              onUpdateValue: (val: any, option) => {
                _this.value = val
                _this.selectdItem = option
                _this.endEdit && _this.endEdit()
              }
            })
        }
      })
    )
  }

  isEditorElement(target: HTMLElement): boolean {
    if (this.element && this.element.contains(target)) return true
    const cascaderMenu = document.querySelector('.n-cascader-menu')
    if (cascaderMenu && cascaderMenu.contains(target)) return true
    return false
  }

  //扁平化
  travelCascaderTree(
    nodes: Array<Record<string, any>>,
    callBack: (node: Record<string, any>) => void
  ) {
    nodes.forEach((item: Record<string, any>) => {
      callBack(item)
      if (Array.isArray(item.children) && item.length > 0) {
        this.travelCascaderTree(item.children, callBack)
      }
    })
  }
}
