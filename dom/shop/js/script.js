'use strict';
const buttons = document.querySelectorAll('.add');
const cartCount = document.getElementById('cart-count');
const cartTotalPrice = document.getElementById('cart-total-price');
function addToCart(event) {		
	cartCount.textContent++;
	cartTotalPrice.textContent = cartTotalPrice.textContent.replace(/\s+/g,'')
	cartTotalPrice.textContent = +cartTotalPrice.textContent + +event.currentTarget.dataset.price;
	cartTotalPrice.textContent = getPriceFormatted(cartTotalPrice.textContent);
}
for (let button of buttons) {
	button.addEventListener('click', addToCart);
}
