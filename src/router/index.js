import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import FluidDesigner from '../views/FluidDesigner.vue'

const routes = [
  {
    path: '/', 
    component: Home
  },
  {
    path: '/fluidDesigner',
    component: FluidDesigner
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
