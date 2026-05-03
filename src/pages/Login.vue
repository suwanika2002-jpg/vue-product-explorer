<template>
  <div class="login-page">

    <!-- LEFT IMAGE -->
    <div class="login-image">
      <img src="/images/login page 1.jpg" alt="login" />
    </div>

    <!-- RIGHT FORM -->
    <div class="login-form">
      <h2>Login</h2>
      <p class="subtitle">Enter Your Username and Password To Access</p>

      <label>Username</label>
      <input type="text" placeholder="" />

      <label>Password</label>
      <input type="password" placeholder="" />

      <button>Login Now</button>
    </div>

  </div>
</template>

<style scoped>

/* PAGE */
.login-page {
  display: flex;
  align-items: center;
  justify-content: center;

  height: 100vh;
  background: #f5e6ea; /* same theme */
}

/* IMAGE SIDE */
.login-image img {
  width: 400px;
  height: 500px;
  object-fit: cover;
  border-radius: 20px;
}

/* FORM CARD */
.login-form {
  background: rgba(255,255,255,0.6);
  backdrop-filter: blur(10px);

  padding: 40px;
  width: 350px;

  border-radius: 20px;

  /* 🔥 OVERLAP EFFECT */
  margin-left: -80px;
}

/* TITLE */
.login-form h2 {
  margin-bottom: 10px;
}

/* SUBTEXT */
.subtitle {
  font-size: 14px;
  margin-bottom: 20px;
}

/* LABELS */
.login-form label {
  display: block;
  margin-top: 10px;
  margin-bottom: 5px;
}

/* INPUTS */
.login-form input {
  width: 100%;
  padding: 10px;

  border: none;
  border-radius: 8px;
  margin-bottom: 10px;

  background: #eee;
}

/* BUTTON */
.login-form button {
  width: 100%;
  padding: 12px;

  margin-top: 15px;

  border: none;
  border-radius: 20px;

  background: #7a4b5a;
  color: white;

  cursor: pointer;
}

</style>