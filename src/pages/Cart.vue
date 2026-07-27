<script setup>
import { ref,computed } from 'vue'
import { cart } from '../store/cart'
import { useRouter } from 'vue-router'




const quantity = ref(1)
const unitPrice = 50 // Change this to your product's actual price

const totalPrice = computed(() => {
  return unitPrice * quantity.value
})

const increaseQuantity = () => {
  quantity.value++
}

const decreaseQuantity = () => {
  if (quantity.value > 1) {
    quantity.value--
  }
}
const router = useRouter()
/* REMOVE ITEM */
const removeItem = (id) => {
  const index = cart.value.findIndex(
    item => item.id === id
  )

  if (index !== -1) {
    cart.value.splice(index, 1)
  }
}

/* TOTAL PRICE */
const total = computed(() => {
  return cart.value.reduce((sum, item) => {
    return sum + Number(item.price) * (item.quantity || 1)
  }, 0)
})
</script>

<template>
  <div class="cart-page">


    <!-- TITLE -->
    <h1 class="cart-heading">Shopping Cart</h1>

    <!-- TOP BAR -->
    <div class="selection-bar">
      Your Current Selection
    </div>

    <div class="cart-layout">

      <!-- LEFT SIDE -->
      <div class="cart-items">

        <div
          v-for="item in cart"
          :key="item.id"
          class="cart-card"
        >

          <!-- IMAGE -->
          <img
            :src="item.image"
            class="product-image"
          />

          <!-- DETAILS -->
          <div class="product-details">

            <div class="top-row">
              <h3>{{ item.title }}</h3>
              <span class="price">
                ${{ item.price }}
              </span>
            </div>

            <p class="description">
              {{ item.description }}
            </p>

            <div class="option-tags" v-if="item.beadType || item.material || item.color">

  <span v-if="item.beadType" class="option-tag">
    Bead: {{ item.beadType }}
  </span>

  <span v-if="item.material" class="option-tag">
    Material: {{ item.material }}
  </span>

  <span v-if="item.color" class="option-tag">
    Colour: {{ item.color }}
  </span>

</div>
            <div class="bottom-row">

              <!-- QUANTITY -->
          <div class="quantity-box">
  <button @click="item.quantity = Math.max(1, (item.quantity || 1) - 1)">
    -
  </button>

  <span>{{ String(item.quantity || 1).padStart(2, '0') }}</span>

  <button @click="item.quantity = (item.quantity || 1) + 1">
    +
  </button>
</div>

              <!-- REMOVE -->
              <button
                class="remove-btn"
                @click="removeItem(item.id)"
              >
                Remove
              </button>

            </div>

          </div>
        </div>
      </div>
      <!-- RIGHT SIDE SUMMARY -->
      <div class="summary-box">

  <h2>Summary</h2>

  <!-- Product List -->
  <div
    v-for="item in cart"
    :key="item.id"
    class="summary-product"
  >
    <span>
      {{ item.title }} × {{ item.quantity || 1 }}
    </span>

    <span>
      ${{ (Number(item.price) * (item.quantity || 1)).toFixed(2) }}
    </span>
  </div>

  <div class="summary-row">
    <span>Standard Shipping</span>
    <span>Complimentary</span>
  </div>

  <hr />

  <div class="summary-row total-row">
    <span>Total</span>
    <span>${{ total.toFixed(2) }}</span>
  </div>

  <button
    class="checkout-btn"
    @click="router.push('/checkout')"
  >
    Proceed to Checkout
  </button>

</div>
        
      </div>

    </div>
  
</template>


<style scoped>

/* CART PAGE */
.cart-page {
  padding: 40px;
  background: #f5f5f5; /* or your normal background */
  min-height: 100vh;
}

/* DARK MODE */
.dark-mode .cart-page {
  background: #1a1a1a;
  color: white;
}

/* TITLE */
.cart-heading {
  font-size: 40px;
  color: #5b001e;
  font-weight: 800;
  margin: 0 0 20px 0; /* bottom spacing only */
}

/* TOP BAR */
.selection-bar {
  background: #7a0027;
  color: white;
  padding: 18px;
  text-align: center;
  font-size: 30px;
  font-weight: 700;
  /* Creates the gap from left and right */
  margin: 0 0 50px 0;

  border-radius: 4px; /* optional */
}

/* LAYOUT */
.cart-layout {
  display: flex;
  gap: 40px;
  align-items: flex-start;
}
/* LEFT SIDE */
.cart-items{
  flex: 2;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

/* CARD */
.cart-card{
  display: flex;
  gap: 20px;
  background: #ebe3d2;
  padding: 18px;
  border-radius: 10px;
}

/* IMAGE */
.product-image{
  width: 120px;
  height: 120px;
  object-fit: cover;
  border-radius: 8px;
  flex-shrink: 0;
}

/* DETAILS */
.product-details{
  flex: 1;
  display: flex;
  flex-direction: column;
}

/* TOP ROW */
.top-row{
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 12px;
}

.top-row h3{
  font-size: 19px;
  font-weight: 700;
  color: #5b001e;
  margin: 0;
}

.price{
  font-size: 18px;
  font-weight: 700;
  color: #5b001e;
  white-space: nowrap;
}

/* DESCRIPTION */
.description{
  margin: 6px 0 0;
  color: #6b6b6b;
  font-size: 14px;
  line-height: 1.4;
}

/* OPTION TAGS */
.option-tags{
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 10px;
}

.option-tag{
  font-size: 12px;
  font-weight: 600;
  color: #5b001e;
  background: #ffffff;
  padding: 4px 10px;
  border-radius: 20px;
}

/* BOTTOM */
.bottom-row{
  margin-top: auto;
  padding-top: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

/* QUANTITY */
.quantity-box{
  display: flex;
  align-items: center;
  gap: 12px;
  border-radius: 6px;
}

.quantity-box button{
  width: 26px;
  height: 26px;
  border: none;
  background: white;
  cursor: pointer;
  border-radius: 4px;
  font-size: 16px;
  line-height: 1;
}

.quantity-box button:hover{
  background: #f3f3f3;
}

.quantity-box span{
  font-size: 15px;
  font-weight: 600;
  color: #333;
  min-width: 18px;
  text-align: center;
}

/* REMOVE */
.remove-btn{
  border: none;
  background: transparent;
  color: #888;
  cursor: pointer;
  font-size: 13px;
}

.remove-btn:hover{
  color: #5b001e;
  text-decoration: underline;
}

/* SUMMARY */
/* SUMMARY BOX */
.summary-box {
  width: 350px;
  background: #ebe3d2;
  padding: 30px;
  border-radius: 10px;
}

/* HEADING */
.summary-box h2 {
  font-size: 30px;
  font-weight: 700;
  color: #5b001e;
  margin-bottom: 25px;
}

/* PRODUCT LIST */
.summary-product {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 10px;
  margin-bottom: 12px;
  font-size: 15px;
  color: #444;
}

.summary-product span:first-child {
  flex: 1;
}

.summary-product span:last-child {
  font-weight: 600;
  color: #5b001e;
}

/* SUBTOTAL & SHIPPING ROWS */
.summary-row {
  display: flex;
  justify-content: space-between;
  margin-top: 15px;
  margin-bottom: 15px;
  font-size: 16px;
  color: #444;
}

/* DIVIDER */
.summary-box hr {
  border: none;
  border-top: 1px solid #d8cdb5;
  margin: 15px 0;
}

/* TOTAL */
.total-row {
  display: flex;
  justify-content: space-between;
  font-size: 28px;
  font-weight: 700;
  color: #5b001e;
}

/* BUTTON */
.checkout-btn {
  width: 100%;
  margin-top: 25px;
  padding: 18px;
  border: none;
  border-radius: 40px;
  background: #5b001e;
  color: white;
  font-size: 18px;
  cursor: pointer;
}

.checkout-btn:hover {
  opacity: 0.9;
}

/* PROMO */
.promo {
  text-align: center;
  margin-top: 20px;
  color: #777;
}

</style>