import { createRouter, createWebHistory, RouterView } from 'vue-router'
import store from './store'
const routes = [
  { path: '/', name: 'home', component: () => import('./pages/Home.vue') },
  { path: '/login', name: 'login', component: () => import('./pages/Login.vue') },
  { path: '/:pathMatch(.*)*', name: 'not-found', component: () => import('./pages/NotFound.vue') },
  {
    path: '/console',
    name: 'console',
    redirect: { name: 'products' },
    component: () => import('./pages/Console.vue'),
    children: [
      {
        path: 'product',
        name: 'products',
        component: () => import('./pages/Products.vue'),
        children: [
          { path: ':id', name: 'product-item', component: () => import('./pages/ProductItem.vue') }
        ]
      },
      { path: 'sku', name: 'sku', component: () => import('./pages/SKU.vue') },
      { path: 'order', name: 'orders', component: () => import('./pages/Orders.vue') },
      { path: 'stock', name: 'stock', component: () => import('./pages/Stock.vue') },
    ]
  },
]

const router = createRouter({
  history: createWebHistory(),
  linkActiveClass: 'active',
  routes
})
router.isReady().then(() => {
  console.debug(`app is ready`)
}).catch(console.error)

export default router