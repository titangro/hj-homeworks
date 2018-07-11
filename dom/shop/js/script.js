'use strict';
const buttons = document.querySelectorAll('.add');
const cartCount = document.getElementById('cart-count');
const cartTotalPrice = document.getElementById('cart-total-price');
function addToCart(event) {		
	cartCount.innerHTML++;
	cartTotalPrice.innerHTML = +cartTotalPrice.innerHTML + +event.currentTarget.dataset.price
}
for (let button of buttons) {
	button.addEventListener('click', addToCart);
}
