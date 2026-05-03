<template>
  <div class="cart-page">
    <h2>Your Cart</h2>

    <div v-if="cart.length === 0">
      Cart is empty
    </div>

    <div v-for="item in cart" :key="item.id" class="cart-item">
      <img :src="item.image" />

      <div>
        <h3>{{ item.title }}</h3>
        <p>$ {{ item.price }}</p>

        <p v-if="item.color">Color: {{ item.color }}</p>
        <p v-if="item.material">Material: {{ item.material }}</p>
        <p v-if="item.beadType">Bead: {{ item.beadType }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { cart } from '../store/cart'
</script>