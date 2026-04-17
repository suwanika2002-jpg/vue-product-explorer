<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import {customProducts } from '../data/products'

const route = useRoute()
const product = ref(null)
const isCustom = ref(false)
const materials = [
  {
    name: "Leather Strap",
    image: "/images/leather strap.jpeg",
    colors: ["Black", "Brown", "Dark Blue"]
  },
  {
    name: "Metal Strap",
    image: "/images/metal strap.jpeg",
    colors: ["Silver", "Gold", "Rose Gold"]
  },
  {
    name: "Silicone Strap",
    image: "/images/silicon strap.jpeg",
    colors: ["Black", "White", "Blue", "Pink"]
  },

  {
    name: "Beads",
    types: [
      {
        type: "Crystal Beads",
        image: "/images/crystal beads.jpeg",   // ✅ IMAGE 1
        colors: ["Pink", "White"]
      },
      {
        type: "Pearl Beads",
        image: "/images/pearl bead.jpeg",     
        colors: ["White", "Cream"]
      },
      {
        type: "Glass Beads",
        image: "/images/glass bead.jpeg.jpg",     
        colors: ["Black", "Gray"]
      },
      {
        type: "Plastic Beads",
        image: "/images/plastic beads.jpeg",     
        colors: ["Black", "Gray"]
    }

    ]
  }
]
  

const selectedMaterial = ref(null)
const selectedColor = ref('')
const customColor = ref('')
const selectMaterial = (m) => {
  if (selectedMaterial.value?.name === m.name) {
    selectedMaterial.value = null
  } else {
    selectedMaterial.value = m
  }
}

onMounted(async () => {
  const id = parseInt(route.params.id)

const found = customProducts.find(p => p.id === id)

if (found) {
  product.value = found
  isCustom.value = true   // ✅ mark as custom
} else {
  const res = await fetch(`https://dummyjson.com/products/${id}`)
  const data = await res.json()

  product.value = {
    id: data.id,
    title: data.title,
    price: data.price,
    description: data.description,
    image: data.thumbnail,
    category:
      data.category === 'mens-watches' || data.category === 'womens-watches'
        ? 'watch'
        : data.category === 'beauty' || data.category === 'fragrances'
        ? 'cosmetic'
        : 'other'
  }
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

        <!-- CUSTOM PRODUCTS -->
<div v-if="isCustom && product.category === 'bracelet'" class="options">


  <div v-if="selectedMaterial?.name === 'Beads'" class="related">

  <h2>Bead Types</h2>

  <div class="related-grid">

    <div 
      v-for="t in selectedMaterial.types"
      :key="t.type"
      class="related-card"
      @click="selectedType = t"
    >
      <img :src="t.image" />

      <div class="overlay">
        <p>{{ t.type }}</p>
      </div>
    </div>

  </div>
<<div v-if="selectedMaterial?.name === 'Beads'" class="color-request">

  <p>Request a Colour (Optional)</p>

  <input 
    type="text" 
    v-model="customColor"
    placeholder="Enter preferred colour (e.g. Light Pink, Sky Blue)"
  />

</div>
</div>
  

</div>


<!-- WATCHES -->
<div v-else-if="product.category === 'watch'" class="options">

  
<!-- MATERIAL -->
<p>Material</p>

<div class="material-images">
  <div 
    v-for="m in materials" 
    :key="m.name"
    class="material-card"
    :class="{ active: selectedMaterial && selectedMaterial.name === m.name }"
    @click="selectMaterial(m)"
  >
    <img :src="m.image" />
    <p>{{ m.name }}</p>
  </div>
</div>
<!-- COLOURS -->
<div v-if="selectedMaterial">

  <p>Available Colours</p>

  <div class="color-options">
    <span 
      v-for="c in selectedMaterial.colors"
      :key="c"
      class="color-box"
      :class="{ active: selectedColor === c }"
      @click="selectedColor = c"
    >
      {{ c }}
    </span>
  </div>

</div>

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
.material-images {
  display: flex;
  gap: 15px;
  margin-top: 10px;
}

.material-card {
  width: 100px;
  text-align: center;
  cursor: pointer;
  border: 1px solid #ddd;
  padding: 8px;
  border-radius: 8px;
}

.material-card img {
  width: 100%;
  height: 70px;
  object-fit: cover;
  border-radius: 5px;
}

.material-card.active {
  border: 2px solid #8b5d5d;
}
.color-options {
  display: flex;
  gap: 10px;
  margin-top: 10px;
}

.color-box {
  padding: 6px 10px;
  border: 1px solid #ccc;
  cursor: pointer;
  border-radius: 5px;
}

.color-box.active {
  background: #8b5d5d;
  color: white;
}
related {
  margin-top: 60px;
}

.related h2 {
  margin-bottom: 20px;
}

.related-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
}

.related-card {
  display: flex;
  height: 100px;
  cursor: pointer;
  overflow: hidden;
  border-radius: 10px;
}

.related-card img {
  width: 40%;
  object-fit: cover;
}

.overlay {
  width: 60%;
  background: #6d2f2f;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
}

.overlay p {
  font-weight: bold;
}
.color-request {
  margin-top: 20px;
}

.color-request input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 8px;
}
</style>