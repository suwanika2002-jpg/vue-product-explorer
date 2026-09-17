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
     price: "184.99",
     colors: ["Black", "Brown", "Dark Blue"]
  },
  {
    name: "Metal Strap",
    image: "/images/metal strap.jpeg",
    price: "229.99",
    colors: ["Silver", "Gold", "Rose Gold"]
  },
   {
     name: "Silicone Strap",
     image: "/images/silicon strap.jpeg",
     price: "149.99",
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

  // Bracelet customization
  if (
    showCustomize.value &&
    selectedType.value &&
    selectedType.value.price
  ) {
    return Number(selectedType.value.price)
  }

  // Watch customization
  if (
    showCustomize.value &&
    selectedMaterial.value &&
    selectedMaterial.value.price
  ) {
    return Number(selectedMaterial.value.price)
  }

  // Default product price
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

    <p class="material-name">
      {{ m.name }}
    </p>

    <p class="material-price">
      £{{ m.price }}
    </p>
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
<div v-if="showCustomize" class="selected-options">

    <!-- Watch -->
     <p v-if="selectedMaterial">
    <strong>Selected Material:</strong>
    {{ selectedMaterial.name }}
  </p>
  <p v-if="selectedColor">
    <strong>Selected Colour:</strong>
    {{ selectedColor }}
  </p>


  <p v-if="selectedType">
    <strong>Selected Bead:</strong>
    {{ selectedType.type }}
  </p>

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

@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&family=Poppins:wght@400;500;600&display=swap');
.product-details{

display:flex;
gap:40px;

}

@media(max-width:768px){

.product-details{

flex-direction:column;

}

.product-image{

width:100%;

}

.product-info{

width:100%;

}

}
.dark-mode .page {
  padding: 60px;
  background: #141010;
  color: #f3f3f3;
  align-items: flex-start;
  font-family: 'Poppins', sans-serif;
}

/* layout */
.container {
  display: flex;
  gap: 60px;
  margin-top: 40px;
  margin-bottom: 40px;
  font-family: 'Poppins', sans-serif;
}

/* LEFT */
.left img {
  width: 300px;
  height: 300px;
  object-fit: cover;
  border-radius: 20px;
  position: sticky;
  top: 40px;
  box-shadow: 0 20px 45px rgba(0,0,0,0.28), 0 0 0 6px #ffffff, 0 0 0 8px #c9a875;
  transition: transform 0.4s ease;
}

.left img:hover {
  transform: scale(1.03) rotate(-0.5deg);
}

/* RIGHT */
.right {
  width: 370px;
  background: linear-gradient(180deg, #faf3f0 0%, #f3eded 100%);
  padding: 34px 32px;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(109,47,47,0.15);
  border-top: 4px solid #c9a875;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

/* section heading, e.g. "Bead Types" / "Material" */
.right h2,
.section-title {
  font-family: 'Playfair Display', serif;
  font-size: 20px;
  font-weight: 700;
  color: #4a1f1f;
  margin: 10px 0 14px;
}

/* title */
.title {
  font-family: 'Playfair Display', serif;
  font-size: 32px;
  font-weight: 700;
  color: #4a1f1f;
  margin-bottom: 10px;
  letter-spacing: 0.3px;
}

/* description */
.desc {
  font-size: 14px;
  color: #6b5c5c;
  margin-bottom: 15px;
  line-height: 1.6;
}

/* price */
.price {
  font-family: 'Playfair Display', serif;
  font-size: 26px;
  font-weight: 700;
  color: #6d2f2f;
  margin-bottom: 5px;
  position: relative;
}

.price::after {
  content: "";
  display: block;
  width: 36px;
  height: 3px;
  background: #c9a875;
  margin-top: 8px;
  border-radius: 2px;
}

/* options */
.options {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  margin-bottom: 10px;
  font-size: 16px;
  font-weight: 600;
}

.options button {
  padding: 8px 18px;
  border-radius: 20px;
  border: 2px solid #d8c3c3;
  background: white;
  cursor: pointer;
  transition: all 0.25s ease;
}

.options button:hover {
  border-color: #6d2f2f;
  color: #6d2f2f;
}

/* small inline button pair, e.g. "Available Colours" + "Customize" */
.btn-row {
  display: flex;
  gap: 12px;
  margin: 16px 0;
}

.btn-outline {
  padding: 10px 20px;
  border-radius: 25px;
  border: 2px solid #6d2f2f;
  background: white;
  color: #6d2f2f;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.25s ease;
}

.btn-outline:hover {
  background: #f3eded;
  transform: translateY(-2px);
}

.btn-solid {
  padding: 10px 20px;
  border-radius: 25px;
  border: none;
  background: linear-gradient(135deg, #6d2f2f 0%, #8b3d3d 100%);
  color: white;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 6px 16px rgba(109,47,47,0.3);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.btn-solid:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 22px rgba(109,47,47,0.4);
}

/* add to cart */
.cart-btn {
  width: 100%;
  padding: 14px;
  background: linear-gradient(135deg, #6d2f2f 0%, #8b3d3d 100%);
  color: white;
  border: none;
  border-radius: 25px;
  font-size: 15px;
  font-weight: 600;
  letter-spacing: 0.4px;
  cursor: pointer;
  margin-top: 20px;
  box-shadow: 0 8px 20px rgba(109,47,47,0.35);
  position: relative;
  overflow: hidden;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.cart-btn::before {
  content: "";
  position: absolute;
  top: 0;
  left: -75%;
  width: 50%;
  height: 100%;
  background: linear-gradient(120deg, transparent, rgba(255,255,255,0.35), transparent);
  transform: skewX(-20deg);
  transition: left 0.6s ease;
}

.cart-btn:hover {
  background: linear-gradient(135deg, #7d3939 0%, #9c4747 100%);
  transform: translateY(-2px);
  box-shadow: 0 12px 26px rgba(109,47,47,0.45);
}

.cart-btn:hover::before {
  left: 130%;
}

/* extra text */
.extra {
  margin-top: 15px;
  display: flex;
  gap: 20px;
  font-size: 12px;
  color: #7a6a6a;
  font-weight: 500;
}

.material-images {
  display: flex;
  gap: 20px;
  margin-top: 5px;
  justify-content: flex-start;
  align-items: flex-start;
}

.material-card {
  width: 100px;
  text-align: center;
  cursor: pointer;
  border: 2px solid #e3d2d2;
  padding: 6px;
  border-radius: 10px;
  font-size: 13px;
  font-weight: 500;
  background: white;
  transition: all 0.25s ease;
}

.material-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 18px rgba(109,47,47,0.2);
  border-color: #c9a875;
}

.material-card img {
  width: 100%;
  height: 70px;
  object-fit: cover;
  border-radius: 6px;
}

.material-card.active {
  border: 2px solid #6d2f2f;
  box-shadow: 0 0 0 3px rgba(201,168,117,0.35), 0 8px 18px rgba(109,47,47,0.25);
  transform: translateY(-4px);
}
.color-options {
  display: flex;
  gap: 10px;
  margin-top: 10px;
}

.color-box {
  padding: 6px 10px;
  border: 2px solid #d8c3c3;
  cursor: pointer;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 600;
  transition: all 0.2s ease;
}

.color-box.active {
  background: #6d2f2f;
  color: white;
  border-color: #6d2f2f;
}
.related {
  margin: 20px 0;
}

.related h2 {
  font-family: 'Playfair Display', serif;
  color: #4a1f1f;
  margin-bottom: 20px;
}

.related-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
}

.related-card {
  display: flex;
  height: 100px;
  cursor: pointer;
  overflow: hidden;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0,0,0,0.08);
  transition: transform 0.25s ease, box-shadow 0.25s ease;
}

.related-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 20px rgba(109,47,47,0.2);
}

.related-card img {
  width: 40%;
  object-fit: cover;
}

.bead-card .overlay {
  width: 50%;
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
  padding: 8px 18px;
  border-radius: 20px;
  border: 1.5px solid #6d2f2f;
  background: white;
  color: #6d2f2f;
  cursor: pointer;
  font-weight: 500;
  transition: 0.2s;
}

.action-buttons button.active {
  background: #6d2f2f;
  color: white;
  box-shadow: 0 4px 10px rgba(109,47,47,0.3);
}
.bead-card {
  height: 90px;
  border-radius: 10px;
  overflow: hidden;
  position: relative;
  cursor: pointer;
  transition: 0.3s;
  box-shadow: 0 4px 10px rgba(0,0,0,0.08);
}
.bead-card img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.bead-card .overlay {
  position: absolute;
  inset: 0;
  background: rgba(80,30,30,0.72);
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-weight: 600;
}

.bead-card:hover {
  transform: scale(1.04);
  box-shadow: 0 10px 22px rgba(109,47,47,0.3);
}

.bead-card.active {
 outline: 3px solid #c9a875;
 transform: scale(1.04);
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
  border: 1.5px solid #d8c3c3;
  width: 200px;
  font-size: 14px;
  cursor: pointer;
  background: white;
}

.color-select:focus {
  outline: none;
  border-color: #6d2f2f;
  box-shadow: 0 0 0 3px rgba(109,47,47,0.15);
}
.dropdown {
  position: relative;
}

.dropdown-btn {
  padding: 8px 18px;
  border-radius: 20px;
  border: none;
  background: linear-gradient(135deg, #6d2f2f, #8b3d3d);
  color: white;
  cursor: pointer;
  font-weight: 500;
  box-shadow: 0 4px 10px rgba(109,47,47,0.3);
}

.dropdown-menu {
  position: absolute;
  top: 110%;
  left: 0;
  background: white;
  border: 1px solid #eee;
  border-radius: 10px;
  width: 180px;
  z-index: 10;
  box-shadow: 0 10px 25px rgba(0,0,0,0.15);
  overflow: hidden;
}

.dropdown-item {
  padding: 10px 12px;
  cursor: pointer;
  transition: background 0.2s ease;
}

.dropdown-item:hover {
  background: #f3eded;
  color: #6d2f2f;
}
.selected-options{
  margin: 20px 0;
}

.selected-options p{
  margin-bottom: 8px;
  font-size: 15px;
  color: #4a1f1f;
}
</style>