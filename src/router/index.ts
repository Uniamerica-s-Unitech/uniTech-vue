import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/home.vue'
import Alunos from '../views/alunos.vue'
import Notebook from '../views/notebook.vue'
import acessarAluno from '@/views/acessarAluno.vue'
import acessarNotebook from '@/views/acessarNotebook.vue'

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
    path: '/acessarAluno',
    name: 'acessarAluno',
    component: acessarAluno
  },
  {
    path: '/acessarNotebook',
    name: 'acessarNotebook',
    component: acessarNotebook
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
