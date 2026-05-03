<script setup>
import { ref }  from 'vue'
const showLogin = ref(false)
</script>
<template>
 <div>
  <!-- navbar -->
  <div class="nav-links">
   <button @click="showLogin = true">Login</button>
  <h2 class="logo">MyStyle</h2>

  

    <span class="cart-icon">🛒</span>
  </div>

 
  <!-- page content -->
  <router-view />
<Login v-if="showLogin"
@close="showLogin = false" />
  <!-- footer -->
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

  </div>
</template>

<style>
body {
  margin: 0;
}
</style>