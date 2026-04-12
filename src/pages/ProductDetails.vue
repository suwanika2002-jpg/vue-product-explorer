<script setup>
import { useRoute } from 'vue-router'
const route = useRoute()
</script>

<template>
  <div>
    <h1>Product Details</h1>
    <p>ID: {{ route.params.id }}</p>

    <button>Add to Cart</button>
  </div>
</template>