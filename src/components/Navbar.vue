<template>
  <nav class="navbar">

    <div class="top-bar">

      <!-- MENU BUTTON -->
      <button class="menu-btn" @click="showMenu = !showMenu">
        ☰
      </button>

      <!-- OVERLAY -->
      <div
        v-if="showMenu"
        class="overlay"
        @click="showMenu = false"
      ></div>

      <!-- SIDEBAR -->
      <div
        class="sidebar"
        :class="{ active: showMenu }"
      >
        <div class="sidebar-title">
          Options
        </div>

        <ul>
          <li @click="goToProducts">Categories</li>
          <li @click="goToCart">Cart</li>
          <li @click="goToContact">Contact Us</li>
          <li @click="logout">Log Out</li>
        </ul>
      </div>

      <!-- LOGO -->
      <h2 class="logo">MyStyle</h2>

    </div>

    <div class="nav-right">
    
<span class="nav-link" @click="router.push('/')">
    Home
  </span>
      <span class="nav-link">Contact Us</span>
      <span class="nav-link">About Us</span>
       <span class="nav-link" @click="handleLoginLogout">
  {{ isLoggedIn ? 'Log Out' : 'Login' }}
</span>

      <span class="cart-icon" @click="goToCart">🛒</span>

      <label class="toggle-switch">
        <input
          type="checkbox"
          :checked="isDarkMode"
          @change="toggleDarkMode"
        >
        <span class="toggle-slider"></span>
      </label>
    </div>

  </nav>
</template>
<script setup>
import { ref, onMounted } from 'vue'

const showMenu = ref(false)
const isDarkMode = ref(false)

import { useRouter } from 'vue-router'

const router = useRouter()


const toggleDarkMode = () => {
  isDarkMode.value = !isDarkMode.value

  if (isDarkMode.value) {
    document.body.classList.add('dark-mode')
  } else {
    document.body.classList.remove('dark-mode')
  }

  localStorage.setItem('darkMode', isDarkMode.value)
}

const isLoggedIn = ref(false)

 onMounted(() => {
  // Dark mode
  const savedMode = localStorage.getItem('darkMode')
  if (savedMode === 'true') {
    isDarkMode.value = true
    document.body.classList.add('dark-mode')
  }

  // Login status
  isLoggedIn.value = localStorage.getItem('isLoggedIn') === 'true'
})
const emit = defineEmits(['openLogin'])
const handleLoginLogout = () => {
  if (isLoggedIn.value) {
    localStorage.removeItem('isLoggedIn')
    isLoggedIn.value = false

    router.push('/')
  } else {
    emit('openLogin')
  }
}
const goToCart = () => {
  showMenu.value = false
  router.push('/cart')
}

const goToProducts = () => {
  showMenu.value = false
  router.push('/products')
}


const logout = () => {
  showMenu.value = false

  localStorage.removeItem('isLoggedIn')
  isLoggedIn.value = false

  router.push('/')
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

@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&family=Poppins:wght@400;500;600&display=swap');

.menu-btn{
  display: block;
  border: none;
  background: transparent;
  font-size: 25px;
  cursor: pointer;
  margin-right: 10px;
  color: #4a1f1f;
  transition: transform 0.2s ease;
}

.menu-btn:hover{
  transform: scale(1.1);
}

.sidebar{
  position: fixed;
  top: 80px;
  left: 0;

  width: 230px;
  height: calc(100vh - 80px);

  background: white;
  box-shadow: 6px 0 24px rgba(0,0,0,0.2);
  font-family: 'Poppins', sans-serif;

  transform: translateX(-100%);
  transition: transform 0.35s ease-in-out;

  z-index: 1001;
  overflow: hidden;
}

.sidebar.active{
  transform: translateX(0);
}
.overlay{
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.25);
  z-index: 1000;
}
.sidebar-title{
  background: linear-gradient(135deg, #4a1414 0%, #6d2f2f 100%);
  color: white;

  text-align: center;
  padding: 16px 10px;
  font-family: 'Playfair Display', serif;
  font-size: 20px;
  font-weight: 700;
  letter-spacing: 0.4px;
  position: relative;
}

.sidebar-title::after{
  content: "";
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 36px;
  height: 3px;
  background: #c9a875;
  border-radius: 2px;
}

.sidebar ul{
  list-style: none;
  padding: 0;
  margin: 0;
}

.sidebar li{
  padding: 16px 20px;
  border-bottom: 1px solid #f0e6e6;
  font-size: 16px;
  font-weight: 500;
  color: #3a2a2a;
  cursor: pointer;
  transition: all 0.25s ease;
  position: relative;
}

.sidebar li::before{
  content: "";
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 4px;
  background: #c9a875;
  transform: scaleY(0);
  transition: transform 0.25s ease;
}

.sidebar li:hover{
  background: #faf3f0;
  padding-left: 28px;
  color: #6d2f2f;
}

.sidebar li:hover::before{
  transform: scaleY(1);
}

.sidebar li:last-child{
  border-bottom: none;
  color: #a33;
}

.sidebar li:last-child:hover{
  background: #fdf0f0;
  color: #c0392b;
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

/* Toggle container */
.toggle-switch {
  position: relative;
  display: inline-block;
  width: 40px;
  height: 20px;
}

.toggle-switch input {
  display: none; /* Hide the default checkbox */
}

.toggle-slider {
  position: absolute;
  inset: 0;
  background:  #7a0027;
  border-radius: 20px;
  cursor: pointer;
  transition: 0.3s;
}

.toggle-slider::before {
  content: "";
  position: absolute;
  width: 16px;
  height: 16px;
  left: 2px;
  top: 2px;
  background: white;
  border-radius: 50%;
  transition: 0.3s;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
}

.toggle-switch input:checked + .toggle-slider::before {
  transform: translateX(20px);
}


</style>