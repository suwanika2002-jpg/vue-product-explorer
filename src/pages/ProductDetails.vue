<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import {customProducts } from '../data/products'
import{ addToCart } from '../store/cart' 
import { computed } from 'vue'
const route = useRoute()
const router = useRouter()
const product = ref(null)
const isCustom = ref(false)
const materials = ref([])
const selectedType = ref(null)
const showCustomize = ref(false)
const selectedColor = ref('')
const selectedMaterial = ref(null)
const selectColor = (c) => {
  selectedColor.value = c
  showColors.value = false
}

const selectMaterial = (m) => {
  if (selectedMaterial.value?.name === m.name) {
    selectedMaterial.value = null
  } else {
    selectedMaterial.value = m
  }
}

const toggleCustomize = () => {
  showCustomize.value = !showCustomize.value
  if (!showCustomize.value) {
    selectedType.value = null
  }
}
const selectType = (t) => {
  if (selectedType.value?.type === t.type) {
    selectedType.value = null
  } else {
    selectedType.value = t
  }
        
}

const showColors = ref(false)

const braceletColors = ["Pink", "Blue", "Purple", "White", "Black", "Gold"]
onMounted(async () => {
  const id = parseInt(route.params.id)

  const found = customProducts.find(p => p.id === id)

  if (found) {
    product.value = found
    isCustom.value = true
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
          : 'other'
    }
  }

  // 🔥 SET MATERIALS BASED ON CATEGORY

  if (product.value.category === 'watch') {
    materials.value = [
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
  ]
  }

  if (product.value.category === 'bracelet') {
    materials.value = [
      {
        name: "Beads",
        types: [
          {
            type: "Glass",
            image: "/images/glass bead.jpeg",
            price: 5
          },
          {
            type: "Pearl",
            image: "/images/pearl bead.jpeg",
            price: 30

          },
           {
            type: "Crystal",
            image: "/images/crystal beads.jpeg",
            price: 10
          },
          {
            type: "Plastic",
            image: "/images/plastic beads.jpeg",
            price: 1.5
          }
        ]
        }]}


})
//add to cart function
const handleAddToCart = () => {
  const item = {
    id: product.value.id,
    title: product.value.title,
    price: finalPrice.value,
    image: product.value.image,
    description: product.value.description,
    // options
    color: selectedColor.value,
    material: selectedMaterial.value?.name || null,
    beadType: selectedType.value?.type || null
  }

  addToCart(item)

 router.push('/cart')
}
const finalPrice = computed(() => {

  if (
    showCustomize.value &&
    selectedType.value &&
    selectedType.value.price
  ) {
    return Number(selectedType.value.price)
  }

  return Number(product.value.price)
})
</script>

<template>
  <div class="page" v-if="product">

    <div class="container">

      <!-- LEFT SIDE -->
      <div class="left">
        <img :src="product.image" />
      </div>

      <!-- RIGHT SIDE -->
      <div class="right">

        <h1 class="title">{{ product.title }}</h1>

        <p class="desc">
          {{ product.description }}
        </p>

        <p class="price">$ {{ product.price }}</p>

        <!-- ✅ ONLY CUSTOMIZE BUTTON -->
       <div class="action-buttons">

  <!-- Available Colours (ONLY for watch, bracelet, earring) -->
<div v-if="['bracelet','earring'].includes(product.category)">

  <div class="dropdown">

    <button
      class="dropdown-btn"
      :class="{ active: showColors }"
      @click="showColors = !showColors; showCustomize = false"
    >
      {{ selectedColor || 'Available Colours' }}
    </button>

    <!-- Dropdown list -->
    <div v-if="showColors" class="dropdown-menu">
      <div
        v-for="c in braceletColors"
        :key="c"
        class="dropdown-item"
        @click="selectColor(c)"
      >
        {{ c }}
      </div>
    </div>

  </div>

</div>
<div v-if="showCustomize" class="selected-options">

  <p v-if="selectedColor">
    <strong>Selected Colour:</strong>
    {{ selectedColor }}
  </p>

  <p v-if="selectedMaterial">
    <strong>Selected Material:</strong>
    {{ selectedMaterial }}
  </p>

  <p v-if="selectedType">
    <strong>Selected Bead:</strong>
    {{ selectedType.type }}
  </p>

</div>
  <!-- Customize -->
  <button
  v-if= "['watch','bracelet'].includes(product.category)"
    :class="{ active: showCustomize }"
    @click="showCustomize = !showCustomize; showColors = false"
  >
    Customize
  </button>

</div>
       <!-- ✅ BRACELET: BEAD TYPES -->
<div 
  v-if="showCustomize && product.category === 'bracelet'" 
  class="related"
>
  <h2>Bead Types</h2>

  <div class="related-grid">
    <div 
      v-for="t in materials?.[0]?.types || []"
      :key="t.type"
      class="bead-card"
      :class="{ active: selectedType?.type === t.type }"
      @click="selectType(t)"
    >
      <img :src="t.image" />

      <div class="overlay">
        <p>{{ t.type }} Beads</p>

        <!-- ✅ PRICE -->
        <span class="bead-price">
          ${{ t.price }}
        </span>
      </div>
    </div>
  </div>
</div>
        <!-- ✅ WATCHES: SHOW ONLY WHEN CUSTOMIZE CLICKED -->
        <div 
          v-if="showCustomize && product.category === 'watch'" 
          class="options"
        >

          <!-- MATERIAL -->
          <p>Material</p>

          <div class="material-images">
            <div 
              v-for="m in materials" 
              :key="m.name"
              class="material-card"
              :class="{ active: selectedMaterial?.name === m.name }"
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
                @click="selectedColor === c ? selectedColor = '' : selectedColor = c"
              >
                {{ c }}
              </span>
            </div>
          </div>

        </div>

        <!-- ADD TO CART -->
       <button class="cart-btn" @click="handleAddToCart">
  Add to Cart
</button>
        <!-- extra -->
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
  padding: 60px ;
  background: #fdf6f6;
  align-items: flex-start;

}

/* layout */
.container {
  display: flex;
  gap: 60px;
 
}

/* LEFT */
.left img {
  width: 300px;
  height: 300px;
  object-fit: cover;
  border-radius: 20px;
  position: sticky;
  top: 40px;
}

/* RIGHT */
.right {
  width: 400px;
  background: #f3eded;
  padding: 30px;
  border-radius: 20px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  align-self: flex-start;
  
  
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
  margin-top: 20px;
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
  margin-top: 20px;
  
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
.related {
  margin: 20px 0;
}

.related h2 {
  margin-bottom: 20px;
}

.related-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
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

.bead-card .overlay {
  width:50%;
  position: absolute;
  inset: 0;
  background: #6d2f2f;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
  font-size: 14px;
  font-weight: 600;
}

.bead-card .overlay p {
  font-weight: bold;
}

.action-buttons {
  display: flex;
  gap: 10px;
  margin: 15px 0;
}

.action-buttons button {
  padding: 8px 16px;
  border-radius: 20px;
  border: 1px solid #6d2f2f;
  background: white;
  color: #6d2f2f;
  cursor: pointer;
  transition: 0.2s;
}

.action-buttons button.active {
  background: #6d2f2f;
  color: white;
}
.bead-card {
  height: 90px;
  border-radius: 10px;
  overflow: hidden;
  position: relative;
  cursor: pointer;
  transition: 0.3s;
}
.bead-card img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.bead-card .overlay {
  position: absolute;
  inset: 0;
  background: rgba(80,30,30,0.7);
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-weight: 600;
}

.bead-card:hover {
  transform: scale(1.03)
}

.bead-card.active {
 outline: 2px solid #6d2f2f;
 transform: scale(1.03);
}
.bead-card-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
}
.bead-price{
  display: block;
  font-size: 13px;
  margin-top: 4px;
}

.color-select {
  margin-top: 8px;
  padding: 8px 12px;
  border-radius: 8px;
  border: 1px solid #ccc;
  width: 200px;
  font-size: 14px;
  cursor: pointer;
}

.color-select:focus {
  outline: none;
  border-color: #6d2f2f;
}
.dropdown {
  position: relative;
}

.dropdown-btn {
  padding: 8px 16px;
  border-radius: 20px;
  border: 1px solid #6d2f2f;
  background: #6d2f2f;
  color: white;
  cursor: pointer;
}

.dropdown-menu {
  position: absolute;
  top: 110%;
  left: 0;
  background: white;
  border: 1px solid #ccc;
  border-radius: 8px;
  width: 180px;
  z-index: 10;
}

.dropdown-item {
  padding: 8px;
  cursor: pointer;
}

.dropdown-item:hover {
  background: #f3f3f3;
}
.selected-options{
  margin: 20px 0;
}

.selected-options p{
  margin-bottom: 8px;
  font-size: 15px;
}
</style>