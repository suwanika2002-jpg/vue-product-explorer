<template>
  <nav class="navbar">
    <h2 class="logo">MyStyle</h2>

    <div class="nav-right">
      <span class="nav-link" @click="$emit('openLogin')">Home</span>
      <span class="nav-link">Contact Us</span>
      <span class="nav-link">About Us</span>
      <span class="nav-link" @click="$emit('openLogin')">Login</span>

      <span class="cart-icon" @click="goCart">🛒</span>
    </div>
  </nav>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const goCart = () => {
  router.push('/cart')
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Sail&display=swap');

/* NAVBAR */
.navbar {
  width: 100%;
  height: 80px;
  padding: 10px 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #EDDADA;
  position: relative;
}

/* LOGO */
.logo {
  font-family: 'Sail', cursive;
  font-size: 30px;
  letter-spacing: 1px;
  color: #100101;
}

/* RIGHT SIDE */
.nav-right {
  display: flex;
  align-items: center;
  gap: 20px;
}

/* NAV LINKS (FIXED PART) */
.nav-link {
  cursor: pointer;
  user-select: none;
  color: #333;
  font-size: 16px;
  padding: 6px 12px;
  border-radius: 6px;
  transition: background-color 0.3s;
}

.nav-link:hover {
  background-color: rgba(0, 0, 0, 0.08);
}

/* CART ICON */
.cart-icon {
  font-size: 20px;
  cursor: pointer;
  transition: 0.3s;
}

.cart-icon:hover {
  color: #570013;
  transform: scale(1.2);
}
</style>