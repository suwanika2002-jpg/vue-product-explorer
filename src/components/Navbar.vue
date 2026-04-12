<template>
  <nav class="navbar">
    <h2 class="logo">MyStyle</h2>

    <div class="links">
      <router-link to="/">Home</router-link>
      <router-link to="/products">Products</router-link>
      <router-link to="/cart">Cart</router-link>
    </div>
  </nav>
</template>

<style>
.navbar {
  display: flex;
  justify-content: space-between;
  padding: 20px 60px;
  align-items: center;
}

.logo {
  font-weight: bold;
  font-size: 20px;
}

.links a {
  margin-left: 25px;
  text-decoration: none;
  color: black;
}
</style>