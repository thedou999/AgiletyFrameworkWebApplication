import { createApp } from 'vue'
// import './style.css'
import App from './App.vue'
import Router from './router/index'
import '../node_modules/element-plus/dist/index.css'
import './style.css'
import ElementPlus from 'element-plus'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import { createPinia } from 'pinia'
import persistedstate from 'pinia-plugin-persistedstate'

const app = createApp(App)

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}

const pinia = createPinia()
pinia.use(persistedstate)

app.use(pinia).use(Router).use(ElementPlus).mount('#app')
