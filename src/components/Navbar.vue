<template>
  <nav class="navbar">
    <div class = "top-bar">

  <!-- MENU BUTTON -->
  <button class="menu-btn" @click="showMenu = !showMenu">
    ☰
  </button>

  <!-- SIDEBAR -->
  <div v-if="showMenu" class="sidebar">

    <div class="sidebar-title">
      Options
    </div>

    <ul>

      <li @click="goToProducts">
        Categories
      </li>

      <li @click="goToCart">
        Cart
      </li>

      <li>Contact Us</li>

      <li @click="logout">
        Log Out
      </li>

    </ul>

  </div>


    <h2 class="logo">MyStyle</h2>
    </div>
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
import { ref } from 'vue'

const showMenu = ref(false)
import { useRouter } from 'vue-router'

const router = useRouter()

const goCart = () => {
  showMenu.value = false
  router.push('/cart')
}

const goToProducts = () => {
  showMenu.value = false
  router.push('/products')
}


const logout = () => {
  showMenu.value = false
  router.push('/')
  // Add logout logic here
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
.top-bar{
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 15px 20px;
}

.menu-btn{
  border: none;
  background: transparent;
  font-size: 25px;
  cursor: pointer;
  margin-right: 10px;
}

.sidebar{
  position: absolute;
  top: 40px;
  left: 0;

  width: 200px;
  background: white;

  box-shadow: 0 4px 10px rgba(0,0,0,0.15);

  z-index: 999;
}

.sidebar-title{
  background: rgb(53, 3, 3);
  color: white;

  text-align: center;
  padding: 10px;
  font-size: 18px;
  font-weight: bold;
}

.sidebar ul{
  list-style: none;
  padding: 0;
  margin: 0;
}

.sidebar li{
  padding: 15px;
  border-bottom: 1px solid #ddd;

  font-size: 18px;
  cursor: pointer;
}

.sidebar li:hover{
  background: #f5f5f5;
}
/* LOGO */
.logo {
  font-family: 'Sail', cursive;
  font-size: 25px;
  letter-spacing: 1px;
  color: #100101;
  text-shadow: 1px 1px 2px rgba(0,0,0,0.2);
  text-align: left;
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