import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '@/views/home.vue'
import Alunos from '@/views/Aluno/alunos.vue'
import acessarAluno from '@/views/Aluno/acessarAluno.vue'
import acessarCurso from '@/views/Aluno/acessarCurso.vue'
import acessarPeriodo from '@/views/Aluno/acessarPeriodo.vue'
import Notebook from '@/views/Notebook/notebook.vue'
import acessarNotebook from '@/views/Notebook/acessarNotebook.vue'
import acessarMarca from '@/views/Notebook/acessarMarca.vue'
import acessarmodelo from '@/views/Notebook/acessarModelo.vue'
import acessarTicket from '@/views/acessarTicket.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/home',
    name: 'home',
    component: Home
  },
  {
    path: '/acessarTicket',
    name: 'acessarTicket',
    component: acessarTicket
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
    path: '/acessarCurso',
    name: 'acessarCurso',
    component: acessarCurso
  },
  {
    path: '/acessarPeriodo',
    name: 'acessarPeriodo',
    component: acessarPeriodo
  },
  {
    path: '/notebook',
    name: 'notebook',
    component: Notebook
  },
  {
    path: '/acessarNotebook',
    name: 'acessarNotebook',
    component: acessarNotebook
  },
  {
    path: '/acessarMarca',
    name: 'acessarMarca',
    component: acessarMarca
  },
  {
    path: '/acessarmodelo',
    name: 'acessarmodelo',
    component: acessarmodelo
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
