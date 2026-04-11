import { createRouter, createWebHistory } from 'vue-router'

import ProductList from '../pages/ProductList.vue'
import ProductDetails from '../pages/ProductDetails.vue'

const routes = [
  { path: '/', component: ProductList },
  { path: '/product', component: ProductDetails }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router