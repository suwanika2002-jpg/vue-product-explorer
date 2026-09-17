<script setup>
import { ref, onMounted } from 'vue'
// 🔹 1. Your CUSTOM PRODUCTS (IMPORTANT)
import { customProducts } from '../data/products'
import { useRouter } from 'vue-router'

const router = useRouter()

const products = ref([])
const allProducts = ref([])
const showAll = ref(false)
const currentCategory = ref('all')
const showMenu = ref(false)

const searchText = ref('')
const searchResults = ref([])
const searching = ref(false)

const toggleMenu = () => {
  showMenu.value = !showMenu.value
}

onMounted(async () => {
  try {

    // 🔹 2. Get general products
    const res = await fetch('https://dummyjson.com/products')
    const data = await res.json()

    // 🔹 3. Get watches separately
    const res2 = await fetch(
      'https://dummyjson.com/products/category/mens-watches'
    )
    const data2 = await res2.json()

    const res3 = await fetch(
      'https://dummyjson.com/products/category/womens-watches'
    )
    const data3 = await res3.json()

    // 🔹 4. Combine API data
    const apiProducts = [
      ...data.products,
      ...data2.products,
      ...data3.products
    ]

    const filteredAPI = apiProducts.filter(
      p =>
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
        p.category === 'mens-watches' ||
        p.category === 'womens-watches'
          ? 'watch'
          : p.category === 'beauty' ||
            p.category === 'fragrances'
          ? 'cosmatics'
          : 'other'
    }))

    // 🔹 6. FINAL COMBINE (CUSTOM + API)
    allProducts.value = [...customProducts, ...mappedAPI]

    // 🔹 7. Show first 6
    products.value = allProducts.value.slice(0, 6)

  } catch (error) {
    console.error('Error loading products:', error)
  }
})


// 🔹 FILTER FUNCTION (Toggle Category)
const filterCategory = (cat) => {
  // If the same category is clicked again,
  // go back to showing all products.
  if (currentCategory.value === cat && cat !== 'all') {
    currentCategory.value = 'all'
    showAll.value = false
    products.value = allProducts.value.slice(0, 6)
    return
  }

  currentCategory.value = cat
  showAll.value = false

  let filtered = []

  if (cat === 'all') {
    filtered = allProducts.value
  } else {
    filtered = allProducts.value.filter(
      p => p.category === cat
    )
  }

  products.value = filtered.slice(0, 6)
}

// 🔹 SEARCH FUNCTION
const searchProducts = () => {
  const keyword = searchText.value.toLowerCase().trim()

  if (!keyword) {
    searching.value = false
    searchResults.value = []
    return
  }

  searchResults.value = allProducts.value.filter(product =>
    product.title.toLowerCase().includes(keyword) ||
    product.category.toLowerCase().includes(keyword)
  )

  searching.value = true   // <-- this hides the hero section
}


// 🔹 CLEAR SEARCH
const clearSearch = () => {
  searchText.value = ''
  searching.value = false
  searchResults.value = []
}


// 🔹 SEE MORE FUNCTION
const showMore = () => {
  products.value = allProducts.value
  showAll.value = true
}

const goToDetails = (id) => {
  router.push(`/product/${id}`)
}
</script>
<template>

  <div class="product-page">

    <!-- SEARCH BAR -->
    <div class="search-container">

      <input
        v-model="searchText"
        type="text"
        placeholder="Search by keyword or item"
        class="search-input"
      />

      <button 
     @click = "searching ? clearSearch() : searchProducts()"
     class = "search-btn">
        {{ searching ? 'Clear' : 'Search' }}
        </button> 

    </div>
<div v-if= "!searching">
    <!-- HERO SECTION -->
    <div class="hero-card">
      <div class="hero-content">
        <h2>Petals &<br />Precision</h2>
        <button class="explore-btn">Explore</button>
      </div>
    </div>
     

    <!-- CATEGORY SECTION -->
    <div class="category-section">

      <div
        class="category-item"
        @click="filterCategory('bracelet')"
      >
        <img
          src="/images/Blossom-glow-bracelet.jpg"
          alt="Bracelets"
        />
        <span class="tag">Bracelets</span>
      </div>

      <div
        class="category-item"
        @click="filterCategory('earring')"
      >
     
        <img
          src="/images/Rinestone-stud.jpg"
          alt="Earrings"
        />
        <span class="tag">Earrings</span>
      </div>

      <div
        class="category-item"
        @click="filterCategory('watch')"
      >
        <img
          src="/images/watch .jpg"
          alt="Watches"
        />
        <span class="tag">Watches</span>
      </div>

      <div
        class="category-item"
        @click="filterCategory('cosmatics')"
      >
        <img
          src="/images/cosmatics.jpg"
          alt="Cosmatics"
        />
        <span class="tag">Cosmatics</span>
      </div>

    </div>

    <!-- COLLECTION TITLE -->
    <h3 class="section-title">
      The Bloom Collection
    </h3>
</div>
    <!-- PRODUCT GRID -->
    <div class="products-container">

      <div class="products-grid">

        <div
          class="product-card"
          v-for="product in (searching ? searchResults : products)"
          :key="product.id"
        >

          <!-- IMAGE -->
          <div class="product-img">
            <img
              :src="product.image"
              alt=""
            />
          </div>

          <!-- PRODUCT INFO -->
          <div class="product-info">

            <div class="product-row">
              <span class="title">
                {{ product.title }}
              </span>

              <span class="price">
                $ {{ product.price }}
              </span>
            </div>

            <button
              class="view-btn"
              @click="goToDetails(product.id)"
            >
              View
            </button>

          </div>

        </div>

      </div>

    </div>

    <!-- SEE MORE -->
    <div
      class="see-more"
      v-if="!showAll && currentCategory === 'all'"
    >
      <span @click="showMore">
        See More >>
      </span>
    </div>

  </div>

</template>

<style scoped>



/* PAGE */
.product-page {
  padding: 20px 40px;
}

/* HERO */
.hero-card {
  position: relative; /* Important */

  max-width: 1100px;
  width: 90%;
  height: 380px;

  margin: 0 auto 40px;

  border-radius: 25px;
  overflow: hidden;

  background-image: url('/images/priouct detail page.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

/* TEXT BOX */
.hero-content {
  position: absolute;

  /* Left-center position */
  left: 60px;
  top: 50%;
  transform: translateY(-50%);

  width: 250px;
  padding: 50px 35px;

  background: rgba(255, 255, 255, 0.4);
}

/* HEADING */
.hero-content h2 {
  font-size: 28px;
  font-weight: 700;
  color: #570013;
  line-height: 1.4;
  margin-bottom: 20px;
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
  margin-bottom: 20px;
  padding-top: 50px;
  text-align: left;
  padding-left: 50px;
  margin-left: 40px;
}

/* PRODUCTS */
.products {
  display: flex;
  gap: 20px;
}
.products-container {
  background: #f5f0f0;   /* light soft color */
  padding: 40px 30px;
  border-radius: 30px;
  max-width: 1100px;
  margin: 0 auto;        /* center it */
}
/* CARD */
.product-card {
  flex: 1;
 
  overflow: hidden;
  background: #fff;
}

.product-card img {
  width: 100%;
  height: 200px;
  object-fit: cover;
}
/* Grid */
/* GRID */
.products-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 40px;
  padding: 40px;
  justify-items: center;
}

/* CARD */
.product-card {
  width: 200px;
  padding: 18px;
  background: #d9d9d9;
  border-radius: 28px;
  overflow: hidden;
  box-sizing:border-box;             /* Remove thick gray border */
  transition: transform 0.3s;
}

.product-card:hover {
  transform: translateY(-5px);
}

/* IMAGE */
.product-img {
  width: 100%;
  height: 140px;
}

.product-img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* INFO */
.product-info {
  padding: 8px;
  background: #ecdada;
}

/* NAME + PRICE */
.product-row {
  display: flex;
  flex-direction: column;    /* Stack name and price */
  gap: 4px;
  margin-bottom: 8px;
}

.title {
  font-size: 10px;           /* Explicitly set small size */
  font-weight: 600;
  color: #000;
  line-height: 1.3;
  margin: 0;
}

.price {
  font-size: 10px;
  font-weight: 500;
  color: #000;
  margin: 0;
}

/* BUTTON */
.view-btn {
  display: block;
  margin: 0 auto;
  padding: 5px 18px;
  font-size: 11px;
  font-weight: 600;
  color: #fff;
  background: #4b000f;
  border: none;
  border-radius: 20px;
  cursor: pointer;
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
.search-container {
  display: flex;
  margin-bottom: 40px;
  margin-left: auto;
  align-items: center;
  gap: 0;
  width: 400px;
}

.search-input {
  
  height: 40px;
  width: 250px;
  border: none;
  background: #f8efef;
  border-radius: 40px 0 0 40px;
  padding: 0 30px;
  font-size: 14px;
  outline: none;
}
/* Dark Mode Search Box */
.dark-mode .search-input {
  background: #3b3b3b;     /* Dark grey */
  color: #ffffff;          /* White text */
  border: 1px solid #555;
}

/* Placeholder text */
.dark-mode .search-input::placeholder {
  color: #cfcfcf;
}

.search-btn {
  width: 100px;
  height: 40px;
  border: none;
  background: #5b0f28;
  color: white;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  border-radius: 0 40px 40px 0;
}

.search-btn:hover {
  background: #74173a;
}

.suggestions{
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;

  background: white;
  border: 1px solid #ddd;
  z-index: 1000;
}

.suggestion-item{
  padding: 12px;
  cursor: pointer;
}

.suggestion-item:hover{
  background: #f5f5f5;
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
.products-grid{
    display:grid;
    grid-template-columns:repeat(4,1fr);
    gap:25px;
}

/* Tablet */

@media (max-width:992px){

.products-grid{
    grid-template-columns:repeat(3,1fr);
}

}

/* Mobile */

@media (max-width:768px){

.products-grid{
    grid-template-columns:repeat(2,1fr);
}

}

/* Small phones */

@media (max-width:480px){

.products-grid{
    grid-template-columns:1fr;
}

}
</style>
