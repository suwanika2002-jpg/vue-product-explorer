<template>
  <div class="checkout-page">

    <!-- TITLE -->
    <h1 class="title">Check Out</h1>

    <!-- DELIVERY OPTIONS -->
    <div class="option-row">

      <label class="option-card">
        <input type="radio"
               name="delivery"
               value="delivery"
               checked
         />
        <span>Delivery</span>
      </label>

      <label class="option-card">
        <input type="radio"
               name="delivery"
               value="pickup"
         />
        <span>Pick Up</span>
      </label>

    </div>

    <!-- CUSTOMER DETAILS -->
    <h2 class="section-title">Customer Details</h2>

    <div class="details-box">

      <div class="input-row">

        <div class="input-group">
          <label>Full Name</label>
          <input type="text" v-model="fullName" />
        </div>

        <div class="input-group">
          <label>Phone Number</label>
          <input type="number" v-model="phone" />
        </div>

      </div>

      <div class="input-group address-group">
        <label>Delivery Address</label>
        <input type="text" v-model="address" />
      </div>

    </div>

    <!-- PAYMENT -->
    <h2 class="section-title">Payment Method</h2>

    <div class="option-row">

      <label class="option-card">
        <input type="radio" 
        name="payment"
        value="card"
        v-model="payment" />
        <span>Credit / Debit Card</span>
      </label>

      <label class="option-card">
        <input type="radio"
               name="payment"
               value="cash"
               v-model="payment"
         />
        <span>Cash on Delivery</span>
      </label>

    </div>
    <!-- Cash on delivery -->
     <div v-if="payment === 'cash'"
     class="cash-message">
     <h3>Cash on Delivery Selected</h3>
       <p>
         Your order will be confirmed and  payment can be made upon delivery.
       </p>
     </div>
    <!-- CARD DETAILS -->
    <div v-if="payment === 'card'"
    class="card-box">

      <div class="input-group">
        <label>Name on Card</label>
        <input type="text" v-model="cardName" />
      </div>

      <div class="input-group">
  <label>Card Number</label>

  <input
    type="text"
    v-model="cardNumber"
    @input="formatCardNumber"
    placeholder="XXXX-XXXX-XXXX-XXXX"
  />
</div>
<div class="small-row">
<div class="input-group">
  <label>Expire Date</label>

  <input
    type="text"
    v-model="expireDate"
    @input="formatExpireDate"
    placeholder="MM/YY"
  />
</div>

<div class="input-group cvv">
  <label>CVV</label>

  <input
    type="text"
    v-model="cvv"
    @input="formatCVV"
    placeholder="XXX"
  />
</div>
</div>  
     

    

    <!-- BUTTON -->
    <button
      class="pay-btn"
      @click="handlePayment"
    >
      Pay Now
    </button>
     </div>
    </div>
<!-- THANK YOU SECTION -->
<div class="thank-you-section">

  <!-- LEFT SIDE -->
  <div class="thank-left">

    <h2>
      Thank you for choosing us.
    </h2>

    <p>
      We appreciate your support
    </p>

  </div>

  <!-- RIGHT SIDE -->
  <div class="thank-right">

    <img
      src="/images/thankyou.jpg"
      alt="shopping"
    />

  </div>

</div>

    <!-- SUCCESS POPUP -->
    <div
      v-if="showSuccess"
      class="popup-overlay"
    >

      <div class="success-popup">

        <div class="success-circle">
          ✓
        </div>

        <h1>Success</h1>

        <p>
          We are delight to inform you that
          <br />
          we receive your payment
        </p>

        <button
          class="continue-btn"
          @click="showSuccess = false"
        >
          Continue Shopping
        </button>

      </div>

    </div>

    <!-- FAILED POPUP -->
    <div
      v-if="showFailed"
      class="popup-overlay"
    >

      <div class="failed-popup">

        <div class="failed-circle">
          ✕
        </div>

        <h1>Payment Failed</h1>

        <p>
          Unfortunately we have
          <br />
          an issue with your payment
        </p>

        <button
          class="try-btn"
          @click="showFailed = false"
        >
          Try Again
        </button>

      </div>

    </div>

  
</template>

<script setup>
import { ref } from 'vue'

const fullName = ref('')
const phone = ref('')
const address = ref('')
const cardName = ref('')
const payment = ref('card')
const cardNumber = ref('')
const expireDate = ref('')
const cvv = ref('')

const formatCardNumber = () => {
  cardNumber.value = cardNumber.value
    .replace(/\D/g, '')
    .replace(/(.{4})/g, '$1-')
    .slice(0, 19)

  if (cardNumber.value.endsWith('-')) {
    cardNumber.value =
      cardNumber.value.slice(0, -1)
  }
}

const formatExpireDate = () => {
  expireDate.value = expireDate.value
    .replace(/\D/g, '')
    .replace(/(\d{2})(\d)/, '$1/$2')
    .slice(0, 5)
}

const formatCVV = () => {
  cvv.value = cvv.value
    .replace(/\D/g, '')
    .slice(0, 3)
}

const showSuccess = ref(false)
const showFailed = ref(false)

const handlePayment = () => {

  if (
    !fullName.value ||
    !phone.value ||
    !address.value ||
    !cardName.value ||
    !cardNumber.value ||
    !expireDate.value ||
    !cvv.value
  ) {

    showFailed.value = true
    return
  }

  showSuccess.value = true
}
</script>

<style scoped>

.checkout-page{
  padding: 40px;
  background: #f5f5f5;
  min-height: 100vh;
}

.title{
  color: #5a0015;
  font-size: 40px;
  margin-top: 10px;
  font-weight: 800;
}

.option-row{
  display: flex;
  gap: 30px;
  margin-top: 40px;
}

.option-card{
  width: 300px;
  background: #ece6d6;
  padding: 20px;
  display: flex;
  justify-content: center;
  gap: 10px;
  font-weight: bold;
}

.section-title{
  margin-top: 40px;
  font-size: 28px;
}

.details-box,
.card-box{
  background: #ece6d6;
  width: 700px;
  padding: 25px;
  margin-top: 20px;
}

.input-row{
  display: flex;
  gap: 30px;
}

.input-group{
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
  flex: 1;
}

.input-group label{
  font-weight: bold;
  margin-bottom: 8px;
}

.input-group input{
  padding: 12px;
  border: none;
  background: white;
}

.address-group input{
  width: 100%;
}

.small-row{
  display: flex;
  gap: 30px;
  align-items: flex-end;
}

.small-row .input-group{
  flex: 1;
}
.cvv{
  max-width: 180px;
}

.pay-btn{
  margin-top: 20px;
  width: 150px;
  padding: 10px;
  border: none;
  border-radius: 30px;
  background: #5a0015;
  color: white;
  font-size: 15px;
  cursor: pointer;
  margin-left:10px;
}

/* POPUP */

.popup-overlay{
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.3);
    
  display: flex;
  justify-content: center;
  align-items: center;
}

/* SUCCESS */

.success-popup{
  width: 320px;
  height: 300px;
  background: #e5e5e5;
  text-align: center;
  padding: 80px 30px 40px;
  position: relative;

  border-radius: 20px 20px 0px 20px;
}

.success-popup::before{
  content: "";
  position: absolute;
  top: 0;
  left: 0;

  width: 100%;
  height: 40px;

  background: #03470e;

  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
}
.success-circle{
  width: 70px;
  height: 70px;
  background: green;
  color: white;

  border-radius: 50%;

  display: flex;
  justify-content: center;
  align-items: center;

  font-size: 50px;
  font-weight: bold;

  position: absolute;
  top: -20px;
  left: 50%;
  transform: translateX(-50%);
}

.success-popup h1{
  font-size: 32px;
  margin-bottom: 20px;
}

.success-popup p{
  line-height: 1.6;
  margin-bottom: 20px;
}

.continue-btn{
  padding: 12px 35px;
  border-radius: 30px;
  border: 2px solid green;
  background: white;
  color: green;
  cursor: pointer;
  transition: 0.3s;
}

.continue-btn:hover{
  background: rgb(4, 82, 4);
  color: white;
  border-color:white;
}

/* FAILED */

.failed-popup{
  width: 320px;
  height:300px;
  background: #e5e5e5;
  text-align: center;
  padding: 80px 30px 40px;
  position: relative;
border-radius: 20px 20px 0px 0px;
 
}

.failed-popup::before{
  content: "";
  position: absolute;
  top: 0;
  left: 0;

  width: 100%;
  height: 40px;

  background: #5f0210;

  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
}

.failed-circle{
  width: 70px;
  height: 70px;
  background: rgb(180, 10, 10);
  color: white;
    border-radius: 50%;

  display: flex;
  justify-content: center;
  align-items: center;

  font-size: 50px;
  font-weight: bold;

  position: absolute;
  top: -20px;
  left: 50%;
  transform: translateX(-50%);
}

.failed-popup h1{
  font-size: 32px;
  margin-bottom: 20px;
}

.failed-popup p{
  line-height: 1.6;
  margin-bottom: 20px;
}

.try-btn{
  padding: 12px 35px;
  border-radius: 30px;
  border: 2px solid #8b0015;
  background: white;
  color: #8b0015;
  cursor: pointer;
  transition: 0.3s;
}

.try-btn:hover{
  background: #8b0015;
  color: white;
}
.thank-you-section{
  margin-top: 80px;
  width: 95%;
  height: 260px;
    margin-bottom: 20px;
  display: flex;
  border-radius: 10px;
  overflow: hidden;
  margin-left: 40px;
}

/* LEFT SIDE */

.thank-left{
  width: 35%;
  background: #8b0015;
  color: white;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  text-align: center;
  padding: 30px;
}

.thank-left h2{
  font-size: 30px;
  line-height: 1.5;
  margin-bottom: 20px;
  font-style: italic;
}

.thank-left p{
  font-size: 24px;
  line-height: 1.5;
  font-style: italic;
}

/* RIGHT SIDE */

.thank-right{
  width: 65%;
  background: #e9d9d5;
}

.thank-right img{
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.cash-message{
    width: 700px;
  background: #fff3cd;
  padding: 20px;
  border-radius: 10px;
  margin-top: 20px;
}
.cash-message h3{
  color: #856404;
  margin-bottom: 10px;
}
.cash-message p{
  color: #856404;
  font-size: 16px;
  line-height: 1.6;
}
</style>