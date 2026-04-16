<script setup>
const products = [
  "public/images/bracelet.jpg",
  "public/images/earing.jpg",
  "public/images/ladies-watch.jpg",
  "public/images/watch .jpg"
]
</script>

<template>
  <div class="page">
    <!-- HERO -->
    <section class="hero">
      <div class="hero-content">
        <h1 class="hero-title">
          Shine Every Day With Our <br />
          Finest Collection.
        </h1>
       <button class ="btn"
        @click="$router.push('/products')">Shop Now
</button>
      </div>
    </section>

    <!-- PRODUCTS -->
    <section class="products">
      <div class="product-container">
        <div class="card" v-for="(image, index) in products" :key="index">
          <img :src="image" :alt="`product ${index + 1}`" />
        </div>
      </div>

      <div class="text">
        <h2>Our Featured Collection</h2>
        <p>
          Discover a curated selection of timeless jewelry and elegant watches
          designed to elevate your everyday style.
        </p>
      </div>
    </section>

  </div>
</template>