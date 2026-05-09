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

<p v-if="item.beadType" class="cart-option">
  Bead: {{ item.beadType }}
</p>

<p v-if="item.color" class="cart-option">
  Colour: {{ item.color }}
</p>

            <div class="bottom-row">

              <!-- QUANTITY -->
              <div class="quantity-box">
                <button>-</button>
                <span>01</span>
                <button>+</button>
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

        <div class="summary-row">
          <span>Subtotal</span>
          <span>${{ total }}</span>
        </div>

        <div class="summary-row">
          <span>Standard Shipping</span>
          <span>Complimentary</span>
        </div>

      <hr />

<div class="summary-row total-row">
  <span>Total</span>
  <span>${{ total }}</span>
</div>
<button
  class="checkout-btn"
  @click="router.push('/checkout')"
>
  Proceed to Checkout
</button>

        <p class="promo">
          Enter Promo Code
        </p>

      </div>

    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { cart } from '../store/cart'
import { useRouter } from 'vue-router'

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
    return sum + Number(item.price)
  }, 0)
})
</script>

<style scoped>

.cart-page{
  padding: 40px;
  background: #f4f4f4;
  min-height: 100vh;
}



/* TITLE */
.cart-heading{
  font-size: 40px;
  color: #5b001e;
  font-weight: 800;
  margin-bottom: 20px;
}

/* TOP BAR */
.selection-bar{
  background: #7a0027;
  color: white;
  padding: 18px;
  text-align: center;
  font-size: 30px;
  font-weight: 700;
  margin-bottom: 50px;
}

/* LAYOUT */
.cart-layout{
  display: flex;
  gap: 40px;
  align-items: flex-start;
}

/* LEFT SIDE */
.cart-items{
  flex: 2;
  display: flex;
  flex-direction: column;
  gap: 25px;
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
}

/* DETAILS */
.product-details{
  flex: 1;
}

/* TOP ROW */
.top-row{
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.top-row h3{
  font-size: 28px;
  color: #5b001e;
}

.price{
  font-size: 24px;
  font-weight: 700;
  color: #5b001e;
}

/* DESCRIPTION */
.description{
  margin-top: 10px;
  color: #555;
  font-size: 15px;
}

/* BOTTOM */
.bottom-row{
  margin-top: 25px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

/* QUANTITY */
.quantity-box{
  display: flex;
  align-items: center;
  gap: 12px;
}

.quantity-box button{
  width: 28px;
  height: 28px;
  border: none;
  background: white;
  cursor: pointer;
  border-radius: 4px;
  font-size: 18px;
}

.quantity-box span{
  font-size: 18px;
  font-weight: 600;
}

/* REMOVE */
.remove-btn{
  border: none;
  background: transparent;
  color: #777;
  cursor: pointer;
}

/* SUMMARY */
.summary-box{
  width: 350px;
  background: #ebe3d2;
  padding: 30px;
  border-radius: 10px;
}

.summary-box h2{
  font-size: 30px;
  color: #5b001e;
  margin-bottom: 30px;
}

/* ROWS */
.summary-row{
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  font-size: 18px;
}

.total-row{
  font-size: 28px;
  font-weight: 700;
  color: #5b001e;
}

/* BUTTON */
.checkout-btn{
  width: 100%;
  margin-top: 30px;
  padding: 18px;
  border: none;
  border-radius: 40px;
  background: #5b001e;
  color: white;
  font-size: 18px;
  cursor: pointer;
}

/* PROMO */
.promo{
  text-align: center;
  margin-top: 20px;
  color: #777;
}

</style>