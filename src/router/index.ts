import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/home.vue'
import Alunos from '../views/alunos.vue'
import Notebook from '../views/notebook.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/home',
    name: 'home',
    component: Home
  },
  {
    path: '/alunos',
    name: 'alunos',
    component: Alunos
  },
  {
    path: '/notebook',
    name: 'notebook',
    component: Notebook
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
