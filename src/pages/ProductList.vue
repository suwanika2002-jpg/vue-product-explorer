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
<template

 <div class="product-page">
  <div class="search-section">
  <div class="search-bar">
    <input type="text" placeholder="Search by keyword or item" />
    <button>Search</button>
  </div>
</div>

    <!-- HERO SECTION -->
    <div class="hero-card">
      <div class="hero-content">
        <h2>Petals &<br />Precision</h2>
        <button class="explore-btn">Explore</button>
      </div>
    </div>
    <div class="category-section">
  <div class="category-item" @click="filterCategory('bracelet')">
    <img src="/images/Blossom-glow-bracelet.jpg" alt="Bracelets" />
    <span class="tag">Bracelets</span>
  </div>

  <div class="category-item" @click="filterCategory('earring')">
    <img src="/images/Rinestone-stud.jpg" alt="Earrings" />
    <span class="tag">Earrings</span>
  </div>

  <div class="category-item" @click="filterCategory('watch')">
    <img src="/images/watch .jpg" alt="Watches" />
    <span class="tag">Watches</span>
  </div>

  <div class="category-item" @click="filterCategory('cosmatics')">
    <img src="/images/cosmatics.jpg" alt="Cosmatics" />
    <span class="tag">Cosmatics</span>
  </div>
</div>

    <!-- COLLECTION TITLE -->
    <h3 class="section-title">The Bloom Collection</h3>
   

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

   
     <div class="see-more" v-if="!showAll && currentCategory === 'all'">
  <span @click="showMore">See More >></span>
</div>

  
</template>

<style scoped>
/* PAGE */

/* PAGE */
.product-page {
  padding: 20px 40px;
}

/* HERO */
.hero-card {
  max-width:1200px;
  margin-top:20px;
  width: 80%;
  height: 380px;
  border-radius: 25px;
  overflow: hidden;

  background-image: url('/images/priouct detail page.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-position:center;
  display: flex;
  align-items: center;
  padding-left: 60px;

  margin: 0 auto 40px;
}

/* TEXT */
.hero-content {
  background: rgba(255, 255, 255, 0.4); /* light box like figma */
  padding: 80px 75px;
  
}

.hero-content h2 {
  font-size: 28px;
  font-weight: 700;
  color: #570013;
  margin-bottom: 10px;
  line-height: 1.6;
}

/* BUTTON */
.explore-btn {
  background: #570013;
  color: white;
  border: none;
  padding: 8px 18px;
  border-radius: 20px;
  cursor: pointer;
  font-size: 14px;
}

.explore-btn:hover {
  background: #5a2f2f;
}

/* TITLE */
.section-title {
  font-size: 30px;
  font-weight: 600;
  margin-bottom: 10px;
  padding-top: 50px;
  text-align: left;
  padding-left: 50px;
}

/* PRODUCTS */
.products {
  display: flex;
  gap: 25px;
}

/* CARD */
.product-card {
  flex: 1;
  border-radius: 15px;
  overflow: hidden;
  background: #fff;
}

.product-card img {
  width: 100%;
  height: 180px;
  object-fit: cover;
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
/* SPACE BELOW NAVBAR */
.search-section {
  display: flex;
  justify-content: right;
  margin-top: 20px;   /* 👈 GAP from navbar */
  margin-bottom: 20px; /* 👈 GAP before hero */
}

/* SEARCH BAR CONTAINER */
.search-bar {
  width: 300px;
  display: flex;
  border-radius: 30px;
  overflow: hidden;
  background: #eee;
  align-items: right;
}

/* INPUT */
.search-bar input {
  flex: 1;
  padding: 12px 20px;
  border: none;
  outline: none;
  font-size: 14px;
  background: transparent;
}

/* BUTTON */
.search-bar button {
  padding: 12px 25px;
  border: none;
  background: #5a2a2a;
  color: white;
  cursor: pointer;
  border-radius: 0 30px 30px 0;
}
.category-section {
  display: flex;
  justify-content: center;
  gap: 70px;
  margin: 30px 0;
}

.category-item {
  text-align: center;
  cursor: pointer;
}

.category-item img {
  width: 120px;
  height: 120px;
  object-fit: cover;
  border-radius: 50%;
  transition: 0.3s;
}

/* Hover effect */
.category-item img:hover {
  transform: scale(1.05);
}

.category-item p {
  margin-top: 10px;
  font-weight: 500;
  color: #333;
}

.category-item {
  position: relative;
  text-align: center;
  cursor: pointer;
}

/* Circle image */
.circle-img {
  position: relative;
  width: 120px;
  height: 120px;
  margin: 0 auto;
}

.circle-img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
}

/* 🔥 TAG STYLE (LIKE YOUR IMAGE) */
.tag {
  position: absolute;
  bottom: -15px;
  left: 75%;
  transform: translateX(-50%);

  background: #e6e6e6;
  padding: 6px 18px;
  border-radius: 20px 0 20px 0;

  font-size: 14px;
  font-weight: 600;
  color: #000;
display:inline-block;
  box-shadow: 0 2px 6px rgba(0,0,0,0.5);
}
</style>
