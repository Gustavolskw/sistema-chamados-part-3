import { createRouter, createWebHistory } from 'vue-router'
import ServiceOrderForm from '../components/ServiceOrderForm.vue'
import ServiceOrderManagement from '../components/ServiceOrderManagement.vue'
import ServiceOrderHistory from '../components/ServiceOrderHistory.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      redirect: '/pedidos/historico'
    },
    {
      path: '/pedidos/novo',
      name: 'new-order',
      component: ServiceOrderForm
    },
    {
      path: '/pedidos/gerenciar',
      name: 'manage-orders',
      component: ServiceOrderManagement
    },
    {
      path: '/pedidos/historico',
      name: 'order-history',
      component: ServiceOrderHistory
    }
  ]
})

export default router