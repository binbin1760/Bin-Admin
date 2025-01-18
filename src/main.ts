import { createApp } from 'vue'
import 'animate.css'
import './style.css'
import './assets/icon-font/iconfont.css'
import { setupRouter } from './router/index'
import { setupStore } from '@/store'
import { setupDirectives } from '@/directives'
import App from './App.vue'

function initApp() {
  const app = createApp(App)
  setupStore(app)
  setupRouter(app)
  setupDirectives(app)
  app.mount('#app', true)
}
void initApp()
