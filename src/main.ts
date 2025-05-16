import { createApp } from 'vue'
import { createWebHistory, createRouter } from 'vue-router'
import './style.css'
import App from './App.vue'

import HomeView from './components/HomeView.vue'
import AboutView from './components/AboutView.vue'
import NovelViewVue from './views/NovelView.vue'

const routes = [
  { path: '/', component: HomeView },
  { path: '/about', component: AboutView },
  { path: '/write', component: NovelViewVue },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

createApp(App)
  .use(router)
  .mount('#app')