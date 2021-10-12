import { createRouter, createWebHistory, RouterView } from 'vue-router'
import store from './store'
const routes = [
  { path: '/', name: 'home', component: () => import('./pages/home.vue') },
  { path: '/login', name: 'login', component: () => import('./pages/login.vue') },
  { path: '/:pathMatch(.*)*', name: 'not-found', component: () => import('./pages/notfound.vue') },
  {
    path: '/console',
    name: 'console',
    redirect: { name: 'products' },
    component: () => import('./pages/console.vue'),
    children: [
      {
        path: 'product',
        name: 'products',
        component: () => import('./pages/products.vue'),
        beforeEnter (to, from, next) {
          console.debug('beforeRouteEnter')
          store.dispatch('Products/getAll').then(result => {
            console.debug(result)
            next()
          }).catch(console.error)
        },
        children: [
          { path: ':id', name: 'sku', component: () => import('./pages/sku.vue') }
        ]
      },
      { path: 'order', name: 'orders', component: () => import('./pages/orders.vue') }
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