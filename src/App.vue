<script setup>
import { ref } from 'vue'
import Login from './pages/Login.vue' // ✅ import
import Navbar from './components/Navbar.vue'

const showLogin = ref(false)
</script>

<template>
  
      <Navbar @openLogin="showLogin = true" />

      <router-view @openLogin="showLogin = true" />

      <Login v-if ="showLogin" @close="showLogin = false" />
 
 
  <footer class="footer">


      <div class="footer-middle">
        <div class="footer-logo">
          <h2>MyStyle</h2>
          <p>Elegant collections for your everyday style.</p>
        </div>

        <div class="footer-contact">
          <h3>Contact</h3>
          <p>Email: mystyle@email.com</p>
          <p>Phone: +94 123 456 789</p>
        </div>
      </div>

      <div class="footer-bottom">
        <p>© 2026 MyStyle. All rights reserved.</p>
      </div>
  
    </footer>


</template>

<style>
body {
  margin: 0;
}
</style>