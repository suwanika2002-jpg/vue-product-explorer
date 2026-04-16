<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import {customProducts } from '../data/products'

const route = useRoute()
const product = ref(null)

onMounted(async () => {
  const id = parseInt(route.params.id)

  // 🔹 check custom first
  const found = customProducts.find(p => p.id === id)

  if (found) {
    product.value = found   // ✅ use custom data
  } else {
    // 🔹 fetch from API
    const res = await fetch(`https://dummyjson.com/products/${id}`)
    const data = await res.json()

    product.value = {
      id: data.id,
      title: data.title,
      price: data.price,
      description: data.description,
      image: data.thumbnail
    }
  }


  product.value = {
    title: data.title,
    price: data.price,
    description: data.description,
    image: data.thumbnail
  }

 
})
</script>

<template>
  <div class="page" v-if="product">

    <div class="container">

      <!-- LEFT IMAGE -->
      <div class="left">
        <img :src="product.image" />
      </div>

      <!-- RIGHT DETAILS -->
      <div class="right">

        <h1 class="title">{{ product.title }}</h1>

        <p class="desc">
          {{ product.description }}
        </p>

        <p class="price">$ {{ product.price }}</p>

        <!-- small buttons (like your figma) -->
        <div class="options">
          <button>Available Colours</button>
          <button>material</button>
        </div>

        <!-- ADD TO CART -->
        <button class="cart-btn">Add to Cart</button>

        <!-- extra small text -->
        <div class="extra">
          <span>✔ Customizable Design</span>
          <span>✔ Premium Materials</span>
        </div>

      </div>

    </div>

  </div>
</template>

<style scoped>

.page {
  padding: 60px 100px;
  background: #fdf6f6;
}

/* layout */
.container {
  display: flex;
  gap: 60px;
  align-items: center;
}

/* LEFT */
.left img {
  width: 450px;
  border-radius: 10px;
}

/* RIGHT */
.right {
  max-width: 400px;
}

/* title */
.title {
  font-size: 28px;
  margin-bottom: 10px;
}

/* description */
.desc {
  font-size: 14px;
  color: #555;
  margin-bottom: 15px;
}

/* price */
.price {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 15px;
}

/* options */
.options {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

.options button {
  padding: 6px 12px;
  border-radius: 20px;
  border: 1px solid #ccc;
  background: white;
  cursor: pointer;
}

/* add to cart */
.cart-btn {
  width: 100%;
  padding: 12px;
  background: #6d2f2f;
  color: white;
  border: none;
  border-radius: 25px;
  font-size: 14px;
  cursor: pointer;
}

.cart-btn:hover {
  background: #8b3d3d;
}

/* extra text */
.extra {
  margin-top: 15px;
  display: flex;
  gap: 20px;
  font-size: 12px;
  color: #555;
}

</style>