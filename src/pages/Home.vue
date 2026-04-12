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

    <!-- NAVBAR -->


  <div class="nav-links">
    <nav class="navbar">
  <h2 class="logo">MyStyle</h2>

  <div class="nav-links">
    <a href="#">Home</a>
    <a href="#">About Us</a>
    <a href="#">Contact Us</a>
    <a href="#">Login </a>
  </div>
</nav>
  </div>
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

<footer class="footer">
<!-- 🔥 MIDDLE: BRAND + CONTACT -->
  <div class="footer-middle">

    <div class="footer-logo">
      <h1>MyStyle</h1>
      <p>Elegant collections for your everyday style.</p>
    </div>

    <div class="footer-contact">
      <h2>Contact</h2>
      <p>Email: mystyle@email.com</p>
      <p>Phone: +94 123 456 789</p>
    </div>

  </div>

  <!-- 🔥 BOTTOM -->
  <div class="footer-bottom">
    <p>© 2026 MyStyle. All rights reserved.</p>
  </div>

</footer>
</template>