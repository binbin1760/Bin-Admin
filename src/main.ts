import { createApp } from 'vue'
import 'animate.css'
import './style.css'
import './assets/icon-font/iconfont.css'
import { setupRouter } from './router/index'
import { setupStore } from '@/store'
import { setupDirectives } from '@/directives'
import App from './App.vue'

import vue3TreeOrg from 'vue3-tree-org'
import 'vue3-tree-org/lib/vue3-tree-org.css'

function initApp() {
  const app = createApp(App)
  setupStore(app)
  setupRouter(app)
  setupDirectives(app)
  app.use(vue3TreeOrg)
  app.mount('#app', true)
}
void initApp()
