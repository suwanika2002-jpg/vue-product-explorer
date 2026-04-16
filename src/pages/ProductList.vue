<script setup>
import { ref, onMounted } from 'vue'
// 🔹 1. Your CUSTOM PRODUCTS (IMPORTANT)
    import {customProducts } from '../data/products'
    

const products = ref([])
const allProducts = ref([])
const showAll = ref(false)
const currentCategory = ref('all')

onMounted(async () => {
  try {
    

    // 🔹 2. Get general products
    const res = await fetch('https://dummyjson.com/products')
    const data = await res.json()

    // 🔹 3. Get watches separately
    const res2 = await fetch('https://dummyjson.com/products/category/mens-watches')
    const data2 = await res2.json()

    const res3 = await fetch('https://dummyjson.com/products/category/womens-watches')
    const data3 = await res3.json()

    // 🔹 4. Combine API data
    const apiProducts = [
      ...data.products,
      ...data2.products,
      ...data3.products
    ]
    const filteredAPI = apiProducts.filter(p =>
      p.category === 'mens-watches' ||
      p.category === 'womens-watches' ||
      p.category === 'beauty' ||
      p.category === 'fragrances'
    )

    // 🔹 5. Map API products to YOUR categories
    const mappedAPI = filteredAPI.map(p => ({
      id: p.id,
      title: p.title,
      price: p.price,
      image: p.thumbnail,
      category:
        p.category === 'mens-watches' || p.category === 'womens-watches'
          ? 'watch'
          : p.category === 'beauty' || p.category === 'fragrances' 
          ? 'cosmatics'
          : 'other'
    }))

    // 🔹 6. FINAL COMBINE (CUSTOM + API)
    allProducts.value = [...customProducts, ...mappedAPI]

    // 🔹 7. Show first 6
    products.value = allProducts.value.slice(0, 6)

  } catch (error) {
    console.error("Error loading products:", error)
  }
})


// 🔹 FILTER FUNCTION
const filterCategory = (cat) => {
  currentCategory.value = cat
  showAll.value = false

  let filtered = []

  if (cat === 'all') {
    filtered = allProducts.value
  } else {
    filtered = allProducts.value.filter(p => p.category === cat)
  }

  products.value = filtered.slice(0, 6)
}


// 🔹 SEE MORE FUNCTION
const showMore = () => {
  products.value = allProducts.value
  showAll.value = true
}

</script>
<template>
  <div>

    <!-- Page -->
    <div class="page">

      <!-- Title -->
      <h1 class="main-title">Petals & Precision</h1>

      <!-- Filters -->
      <div class="filters">
        <button @click="filterCategory('all')">All</button>
        <button @click="filterCategory('earring')">Earrings</button>
        <button @click="filterCategory('bracelet')">Bracelets</button>
        <button @click="filterCategory('watch')">Watches</button>
        <button @click="filterCategory('cosmatics')">Cosmetics</button>
      </div>

      <!-- Product Grid -->
      <div class="grid">

        <div class="card" v-for="p in products" :key="p.id">

          <img :src="p.image" />

          <h3>{{ p.title }}</h3>
          <p>$. {{ p.price }}</p>

          <button @click="$router.push(`/product/${p.id}`)">
            View
          </button>
         
        </div>

      </div>

    </div>
     <div class="see-more" v-if="!showAll && currentCategory === 'all'">
  <span @click="showMore">See More >></span>
</div>

  </div>
</template>

<style scoped>
.page {
  background: #fdf6f6;
  padding: 60px 80px;
}

/* Title */
.main-title {
  font-size: 42px;
  font-weight: 700;
  margin-bottom: 30px;
  text-align: left;
}

/* Filters */
.filters {
  margin-bottom: 30px;
}

.filters button {
  margin-right: 10px;
  padding: 6px 12px;
  border: none;
  background: #ddd;
  border-radius: 6px;
  cursor: pointer;
}

.filters button:hover {
  background: #bbb;
}

/* Grid */
.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 40px;
}

/* Card */
.card {
  background: #f4eaea;
  padding: 15px;
  border-radius: 12px;
  transition: 0.3s;
}

.card:hover {
  transform: translateY(-8px);
}

/* Image */
.card img {
  width: 100%;
  height: 260px;
  object-fit: cover;
  border-radius: 10px;
}

/* Text */
.card h3 {
  margin-top: 15px;
  font-size: 18px;
}

.card p {
  margin-top: 5px;
  color: #444;
}

/* Button */
.card button {
  margin-top: 10px;
  padding: 6px 14px;
  background: #5a2d2d;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}

.card button:hover {
  background: #7a3d3d;
}
.see-more {
  margin-top: 20px;
  text-align: center;
}

.see-more span {
  color: #5a2d2d;
  cursor: pointer;
  font-weight: bold;
}

.see-more span:hover {
  text-decoration: underline;
}
</style>
