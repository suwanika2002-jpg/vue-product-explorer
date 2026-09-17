<template>
<div class="bottom-nav">

<div @click="$router.push('/')">
🏠
<p>Home</p>
</div>

<div @click="$router.push('/products')">
🛍️
<p>Shop</p>
</div>

<div @click="$router.push('/cart')">
🛒
<p>Cart</p>
</div>

<div @click="$emit('openLogin')">
👤
<p>Profile</p>
</div>

</div>
</template>
.bottom-nav{

display:none;

}

@media(max-width:768px){

.bottom-nav{

display:flex;
position:fixed;
bottom:0;
left:0;
width:100%;
height:65px;
background:white;
justify-content:space-around;
align-items:center;
box-shadow:0 -2px 10px rgba(0,0,0,.15);

}

.bottom-nav div{

display:flex;
flex-direction:column;
align-items:center;
cursor:pointer;

}

.bottom-nav p{

margin-top:5px;
font-size:12px;

}

}