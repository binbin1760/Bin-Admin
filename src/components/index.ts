import AppProvider from './app-provider/index.vue'
import BaseTable from './base-table/index.vue'
import AsyncBaseForm from './async-bese-form/index.vue'
import IframeLayout from './iframe-layout/index.vue'
import excelTable from './excel-table/table'
import BaseChat from './base-chat/baseChat'
import treeChat from './tree-chat/treeChat'
import examTemplateTable from './exam-template-table/examTemplateTable'
import dynamicForm from './dynamic-form/dynamic-form'
//类型导出
import { AsyncBaseFormConfig } from './async-bese-form/types'
import { ColumnsType } from './excel-table/types'
import { DynamicFormItem, BtnConfig } from './dynamic-form/props'

export {
  AppProvider,
  BaseTable,
  AsyncBaseForm,
  IframeLayout,
  excelTable,
  examTemplateTable,
  BaseChat,
  treeChat,
  dynamicForm
}
export type { AsyncBaseFormConfig, ColumnsType, DynamicFormItem, BtnConfig }
