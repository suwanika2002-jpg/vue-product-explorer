<template>
  <div>
    <h1>Product Explorer</h1>

    <input v-model="search" placeholder="Search products..." />

    <div class="products">
      <div v-for="product in filteredProducts" :key="product.id" class="card">
        <h3>{{ product.name }}</h3>
        <p>${{ product.price }}</p>
        <button @click="selectProduct(product)">View</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()
import { ref, computed } from 'vue'

const search = ref('')
const products = ref([
  { id: 1, name: 'Phone', price: 500 },
  { id: 2, name: 'Laptop', price: 1200 },
  { id: 3, name: 'Headphones', price: 150 }
])

const filteredProducts = computed(() =>
  products.value.filter(p =>
    p.name.toLowerCase().includes(search.value.toLowerCase())
  )
)

const selectProduct = (product) => {
  alert(product.name)
}
</script>