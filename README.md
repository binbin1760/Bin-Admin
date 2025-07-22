# Vue 3 + TypeScript + Vite

This template should help get you started developing with Vue 3 and TypeScript in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

## Recommended Setup

- [VS Code](https://code.visualstudio.com/) + [Vue - Official](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (previously Volar) and disable Vetur

- Use [vue-tsc](https://github.com/vuejs/language-tools/tree/master/packages/tsc) for performing the same type checking from the command line, or for generating d.ts files for SFCs.

###

## 绩效系统流程问题

1. 无论什么流程都应该固定化，即 目的 ， 物料 ， 执行 ， 结果
2. 无论什么流程都因该是由线 与 点 构成的图 ， 线即操作 ，点即节点 。 =》技术实现上应该向<算法与数据结构的图上>靠拢

## 关于流程规则匹配机制

1. 如何生成规则
2. 如何匹配物料 PS:物料即组织/员工
3. 等级分布规则不应该前后端分开计算进行匹配
4. 字段状态表
5. 生产相关的数据运算/状态计算/状态标识都必须放后端 - 统一采用业务规则封装法
