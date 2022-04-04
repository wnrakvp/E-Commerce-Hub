import { createRouter, createWebHashHistory } from 'vue-router'
import ConsoleView from './views/Console.vue'
const routes = [
  { path: '/', name: 'home', component: () => import('./views/Home.vue') },
  { path: '/login', name: 'login', component: () => import('./views/Login.vue') },
  { path: '/:pathMatch(.*)*', name: 'not-found', component: () => import('./views/NotFound.vue') },
  {
    path: '/console',
    name: 'console',
    redirect: { name: 'products' },
    component: ConsoleView,
    children: [
      {
        path: 'product',
        name: 'products',
        component: () => import('./views/Products.vue'),
        children: [
          { path: ':id', name: 'product-item', component: () => import('./views/ProductItem.vue'), props: true }
        ]
      },
      {
        path: 'sku',
        name: 'sku',
        component: () => import('./views/SKU.vue'),
        children: [
          { path: ':id', name: 'sku-item', component: () => import('./views/SKUItem.vue'), props: true }
        ]
      },
      {
        path: 'stock',
        name: 'stock',
        component: () => import('./views/Stock.vue'),
        children: [
          { path: ':id', name: 'stock-item', component: () => import('./views/StockItem.vue'), props: true }
        ]
      },
      {
        path: 'inventory',
        name: 'inventory',
        component: () => import('./views/Inventory.vue'),
      },
      {
        path: 'order',
        name: 'order',
        component: () => import('./views/Order.vue'),
        children: [
          { path: ':id', name: 'order-item', component: () => import('./views/OrderItem.vue'), props: true }
        ]
      },
      {
        path: 'track',
        name: 'track',
        component: () => import('./views/TrackShipment.vue'),
        // children: [
        //   { path: ':id', name: 'order-item', component: () => import('./views/OrderItem.vue'), props: true }
        // ]
      },
    ]
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  linkActiveClass: 'active',
  routes
})
router.isReady().then(() => {
  console.debug(`app is ready`)
}).catch(console.error)

export default router