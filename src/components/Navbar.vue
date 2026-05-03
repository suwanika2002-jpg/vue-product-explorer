<template>
  <nav class="navbar">
    <h2 class="logo">MyStyle</h2>

    

    <div class="nav-right">
      <router-link to="/login" class="login-link">Login</router-link>

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
.container {
  width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}
.navbar {
  width: 100%;
  height: 80px;
  padding: 10px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #EDDADA;
  position: sticky;
  top: 0;
  z-index: 1000;
  position: relative;
 

}

/* LOGO */
.logo {
  font-family: 'Sail', cursive;
  font-size: 30px;
  letter-spacing: 1px;
  color: #100101;
}

/* NAV LINKS */
.nav-links {
  display: flex;
  gap: 30px;
}

.nav-links a {
  text-decoration: none;
  color: #333;
  font-size: 16px;
  padding: 6px 12px;
  border-radius: 6px;
  transition: background-color 0.3s;
}

.nav-links a:hover,
.nav-links a.router-link-active {
  background-color: rgba(0, 0, 0, 0.08);
}

/* RIGHT SIDE */
.nav-right {
  display: flex;
  align-items: center;
  gap: 20px;
}

.login-link {
  text-decoration: none;
  color: #333;
  font-size: 16px;
  padding: 6px 12px;
  border-radius: 6px;
  transition: background-color 0.3s;
}

.login-link:hover {
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
