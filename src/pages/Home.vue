<template>
  <div class="page">

    <!-- ─────────────────────────────────────
         HERO SECTION
    ───────────────────────────────────── -->
    <section class="hero">
      <div class="hero-content">
        <h1 class="hero-title">
          Shine Every Day With Our <br />
          Finest Collection.
        </h1>
        <p class="hero-subtitle">
      
          Discover a curated selection of timeless jewelry and elegant watches designed to elevate 
          your everyday style. Each piece is crafted with precision and care, bringing together beauty, quality, and 
          sophistication for every occasion.
        
        </p>
        <button class="btn"  @click="emit('openLogin')">Shop Now</button>
      </div>
    </section>

    <!-- ─────────────────────────────────────
         FEATURED PRODUCTS SECTION
    ───────────────────────────────────── -->
    <section class="products">

      <!-- Section Heading -->
      <div class="text">
        <h2>Our Featured Collection</h2>
       
      </div>

      <!-- Product Cards Grid -->
      <div class="product-container">
        <div
          class="card"
          v-for="(product, index) in products"
          :key="index"
        >
          <img :src="product.image" :alt="product.name" />
          <div class="card-label">
            <span>{{ product.name }}</span>
          </div>
        </div>
      </div>

    </section>

  </div>
  
</template>

<script setup>
const products = [
  { name: 'Bracelets', image: 'public/images/bracelet.jpg' },
  { name: 'Watches',   image: 'public/images/watch .jpg' },
  { name: 'Earrings',  image: 'public/images/earing.jpg' },
]

import { useRouter } from 'vue-router'

const router = useRouter()

const emit = defineEmits(['openLogin'])
</script>


<style scoped>

/* ─────────────────────────────────────
   HERO
───────────────────────────────────── */
.container {
  width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}
.hero {
  position: relative;
  width: 100%;
  height: 800px;
  overflow: hidden;
  background-image: url('/images/hero2.jpg');
  background-position: center top;
  display: flex;
  align-items: flex-end;
  color:#C4A7A7;       /* content sits toward the bottom */
}
.hero-img
{
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.hero-content {
  position: absolute;
  top:30%;
  left:45%;
  transform: translate(-50%, -50%);
 text-align:left;
  
}

.hero-title {
  font-size: 50px;
  font-weight: 700;
  color: #100101;
  line-height: 1.2;
 
}

.hero-subtitle {
  font-size: 15px;
  color: #2a0a0a;
  line-height: 1.7;
  
}

/* SHOP NOW BUTTON */
.btn {
  background: #570013;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 15px;
  cursor: pointer;
  transition: background 0.3s, transform 0.2s;
}

.btn:hover {
  background: #3d000d;
  transform: translateY(-2px);
}

/* ─────────────────────────────────────
   PRODUCTS SECTION
───────────────────────────────────── */
.products {
  width: 100%;
  background:#C4A7A7;
}

/* Section Heading */
.text {
  text-align: center;
  margin-bottom: 48px;
}

.text h2 {
  font-size: 32px;
  font-weight: 700;
  color: #100101;
  margin-bottom: 10px;
}

.text p {
  font-size: 15px;
  color: #555;
  max-width: 560px;
  margin: 0 auto;
  line-height: 1.7;
}

/* PRODUCT GRID */
.product-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  justify-items: center;
  
}

/* CARD */
.card {
  position: relative;
  border-radius: 10px;
  overflow: visible;
  cursor: pointer;
  aspect-ratio: 3 / 4;
}

.card img {
  width: 260px;
  height: 260px;
  object-fit: cover;
  display: block;
  transition: transform 0.4s ease;
}

.card:hover img {
  transform: scale(1.05);
}

/* ─────────────────────────────────────
   CARD LABEL  
   White rectangle — two diagonal
   corners rounded at 50px, 50% opacity
───────────────────────────────────── */
.card-label {
  position: absolute;
  bottom:50px;
  left: 60%;
  transform: translateX(-50%);
  /* top-left & bottom-right = 0  |  top-right & bottom-left = 50px */
  overflow: visible;
  border-radius: 0px 100px 0px 100px;
  width:120%;
  height: 50px;
 display: flex;
 align-items: center;
  justify-content: center;

  background: rgba(255, 255, 255, 0.25);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
}

.card-label span {
  font-size: 16px;
  font-weight: 600;
  color: #100101;
  letter-spacing: 0.5px;
}
</style>
