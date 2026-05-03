import { createRouter, createWebHistory } from 'vue-router'

import Home from '../pages/Home.vue'
import ProductList from '../pages/ProductList.vue'
import ProductDetails from '../pages/ProductDetails.vue'
import Cart from '../pages/Cart.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/products', component: ProductList },
  { path: '/product/:id', component: ProductDetails },
  {
  path: '/cart',
  component: () => import('../pages/Cart.vue')
}
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router