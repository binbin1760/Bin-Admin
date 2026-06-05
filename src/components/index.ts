import AppProvider from './app-provider/index.vue'
import BaseTable from './base-table/index.vue'
import AsyncBaseForm from './async-bese-form/index.vue'
import IframeLayout from './iframe-layout/index.vue'
import BaseChat from './base-chat/baseChat'
import treeChat from './tree-chat/treeChat'
//类型导出
import { AsyncBaseFormConfig } from './async-bese-form/types'
import dynamicForm from './dynamic-form/dynamic-form.tsx'
import { DynamicFormItem, BtnConfig } from './dynamic-form/props.ts'

export {
  AppProvider,
  BaseTable,
  AsyncBaseForm,
  IframeLayout,
  BaseChat,
  treeChat,
  dynamicForm
}
export type { AsyncBaseFormConfig, DynamicFormItem, BtnConfig }
