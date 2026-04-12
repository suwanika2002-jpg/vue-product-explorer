<script setup>
defineProps({
  product: Object
})
</script>

<template>
  <div class="card">
    <img :src="product.image" />
    <h3>{{ product.name }}</h3>
    <p>Rs. {{ product.price }}</p>

    <button @click="$router.push(`/product/${product.id}`)">
      View
    </button>
  </div>
</template>