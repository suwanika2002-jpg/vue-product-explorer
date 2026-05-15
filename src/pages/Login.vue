<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const username = ref('')
const password = ref('')
const errormessage = ref('')
const router = useRouter()
const emit = defineEmits(['close'])
// demo login
const correctUsername = 'user123'
const correctPassword = 'pass123'


const goToProducts = () => {
  if (username.value === correctUsername && password.value === correctPassword) {
    emit('close')
    router.push('/products')
  } else {
    errormessage.value = 'Invalid username or password'
  }
}
</script>
<template>
  <div class="login-overlay" @click.self="emit('close')">
    
    <div class="login-rectangle">

      <div class="login-content">

        <!-- LEFT IMAGE -->
        <div class="login-image"></div>

        <!-- RIGHT LOGIN BOX -->
        <div class="login-card">
          <h2>Login</h2>
          <p class="subtitle">Enter your username and password to access</p>
          <label>Username</label>
          <input type="text" 
                placeholder="User name"
                v-model="username"
                />
          <label>Password</label>
          <input type="password"
            placeholder="Password"
            v-model="password" />
            <!-- error message -->
            <p class="error" v-if="errormessage">{{ errormessage }}</p>
          <p class="signup-text">Don't have an account? <a href="#">Sign up</a></p>
          <button class="login-btn" @click ="goToProducts">Login Now</button>
        </div>

      </div>

    </div>

  </div>
</template>

<style scoped>
/* ===== OVERLAY ===== */
/* ===== OVERLAY (dark background) ===== */
.login-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  background: rgba(0, 0, 0, 0.5);

  display: flex;
  justify-content: center;
  align-items: center;

  z-index: 1000;
}

/* ===== MAIN RECTANGLE (BACKGROUND BOX) ===== */
.login-rectangle {
  width: 650px;
  height: 520px;

  background: #eddada; /* same pink tone */

  display: flex;
  justify-content: center;
  align-items: center;
}

/* ===== CONTENT (IMAGE + FORM) ===== */
.login-content {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;


  width: 100%;
  height: 100%;
}

/* ===== LEFT IMAGE ===== */
.login-image {
  position:absolute;
  left:50px;
  width: 260px;
  height: 440px;

  background: url('/images/login page 1.jpg') center/cover no-repeat;
  /* 🔴 change image path */
}

/* ===== LOGIN BOX ===== */
.login-card {
  width: 350px;
  height:400px;
  padding: 25px;
  position: absolute;
  right:50px;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter:blur(20px);
  box-shadow: 0 15px 35px rgba(0,0,0,0.2);
  display: flex;
  flex-direction: column;
}

/* ===== TEXT ===== */
.login-card h2 {
  text-align: center;
  margin-bottom: 10px;
  font-size: 22px;
  color: #570013;
}

.subtitle {
  text-align: center;
  font-size: 13px;
  color: black;
  margin-bottom: 15px;
}

/* ===== INPUTS ===== */
.login-card input {
  width: 100%;
  padding: 12px;
  margin-bottom: 12px;
  box-shadow:0 0 0 3px rgba(199,154,154,0.2);
  border: 1px solid #ddd;
  border-radius: 10px;
  outline: none;
}

.login-card input:focus {
  border-color: #6d4c41;
}
.login-card label {
  font-style: poppins;
  font-weight:600;
  font-size: 14px;
  color:black;
  margin-bottom: 5px;
  display:block;
}
.signup-text {
  text-align:center;
  font-size: 13px;
  color:black;
  margin-top:12px;
}

.signup-text a {
  color: #6d4c41;
  text-decoration: none;
  font-weight: 600;
  transition:0.3s;
}

.signup-text a:hover {
  color: #080301;
}

/* ===== BUTTON ===== */
.login-btn {
  margin-top: 10px;
  padding: 12px;
  width: 200px;
  align-self: center;
  background: #550611;
  color: white;
  border: none;
  border-radius: 25px;

  cursor: pointer;
  transition: 0.3s;
}

.login-btn:hover {
  background: #8f1616;
}
.error {
  color: #911515;
  font-size: 14px;
  margin-top: -8px;
  margin-bottom: 10px;
  text-align: center;
}
</style>