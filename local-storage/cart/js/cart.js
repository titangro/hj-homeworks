'use strict';

const colorSwatch = document.querySelector('#colorSwatch');
const sizeSwatch = document.querySelector('#sizeSwatch');
const quickCart = document.querySelector('#quick-cart');
const formCart = document.querySelector('#AddToCartForm');

if (!localStorage.localCart) {
	localStorage.localCart = '';
}

//const buttonAddCart = document.querySelector('#AddToCart');

formCart.addEventListener('submit', addToCart);
formCart.addEventListener('change', changeLocalCart);

const urls = [
	{value: 'https://neto-api.herokuapp.com/cart/colors', type: 'colors'},
	{value: 'https://neto-api.herokuapp.com/cart/sizes', type: 'sizes'},
	{value: 'https://neto-api.herokuapp.com/cart', type: 'cart'}
];
urls.forEach(url => {
	getParam(url.value, url.type);
});

function getParam(url, type) {
	fetch(url)
	.then((res) => { 
		if (200 <= res.status && res.status < 300) {				
			return res;
		}		
		throw new Error(res.statusText);
	})
	.then((res) => { 
		return res.json(); 
	})
	.then((data) => {			
		if (data.error) {
			throw new Error(data.message);
		}
		updateCart(data, type)
	})
	.catch((error) => {
		console.log(error, error.error);
	})
}

function updateCart(data, type) {
	let params;	
	if (localStorage.localCart) {
		params = JSON.parse(localStorage.localCart);
	}	

	if (type === 'colors') {		
		let result = '';

		data.forEach(item => {			
			result += `<div data-value="${item.type}" class="swatch-element color ${item.type}`;
			if (item.isAvailable) {
				result += ' available';
			} else {
				result += ' soldout';
			}
			result += `"><div class="tooltip">${item.title}</div>`;
			result += `<input quickbeam="color" id="swatch-1-${item.type}" type="radio" name="color" value="${item.type}"`;
			if (!item.isAvailable) {
				result += ' disabled';
			} else {
				if (params && item.type === params.color) result += ' checked';
			}
			result += `><label for="swatch-1-${item.type}" style="border-color: ${item.type};">`;
			result += `<span style="background-color: ${item.code};"></span>`;
			result += `<img class="crossed-out" src="https://neto-api.herokuapp.com/hj/3.3/cart/soldout.png?10994296540668815886">`;
	  		result += `</label>`;
	  		result += `</div>`;
		});		

  		colorSwatch.innerHTML = result;
	}

	if (type === 'sizes') {
		let result = '';

		data.forEach(item => {
			result += `<div data-value="${item.type}" class="swatch-element plain ${item.type}`;
			if (item.isAvailable) {
				result += ' available';
			} else {
				result += ' soldout';
			}
			result += `"><input id="swatch-0-${item.type}" type="radio" name="size" value="${item.type}"`;
			if (!item.isAvailable) {
				result += ' disabled';
			} else {
				if (params && item.type === params.size) result += ' checked';
			}
			result += `><label for="swatch-0-${item.type}">`;
			result += `${item.title}`;
			result += `<img class="crossed-out" src="https://neto-api.herokuapp.com/hj/3.3/cart/soldout.png?10994296540668815886">`;
	  		result += `</label>`;
	  		result += `</div>`;
		});		

  		sizeSwatch.innerHTML = result;
	}

	if (type === 'cart') {
		let result = '', totalPrice = 0, totalQuantity = 0;

		data.forEach(item => {
			result += `<div class="quick-cart-product quick-cart-product-static" id="quick-cart-product-${item.id}" style="opacity: 1;">`;
			result += `<div class="quick-cart-product-wrap">`;
			result += `<img src="${item.pic}" title="${item.title}">`;
			result += `<span class="s1" style="background-color: #000; opacity: .5">$${item.price.toFixed(2)}</span>`;
			result += `<span class="s2"></span>`;
			result += `</div>`;
			result += `<span class="count hide fadeUp" id="quick-cart-product-count-${item.id}">${item.quantity}</span>`;
			result += `<span class="quick-cart-product-remove remove" data-id="${item.id}"></span>`;
			result += `</div>`;
			totalQuantity += +item.quantity;
			totalPrice += +item.price * +item.quantity;
		});

		let snippetCart = '';
		snippetCart += '<a id="quick-cart-pay" quickbeam="cart-pay" class="cart-ico'
		if (totalQuantity) {
			snippetCart += ` open`;
		}
  		snippetCart += `"><span><strong class="quick-cart-text">Оформить заказ<br></strong><span id="quick-cart-price">`;
  		snippetCart += totalPrice.toFixed(2);
  		snippetCart += `</span></span></a>`;

  		quickCart.innerHTML = result;
  		quickCart.innerHTML += snippetCart;

  		if (quickCart.querySelector('.remove')) {
  			quickCart.querySelector('.remove').addEventListener('click', deleteFromCart);
  		}
	}
}

function addToCart(event) {
	event.preventDefault();		

	let obj = {}
	let form = new FormData();
	let formData = new FormData(formCart);
	let productId = event.currentTarget.dataset.productId;

	for (const [key, value] of formData) {
		form.append(key, value);		
	}
	form.append('productId', productId);

	for (const [key, value] of form) {
		if (key === 'quantity') {
			obj[key] = +value;
		} else {
			obj[key] = value;
		}
	}
	console.log(obj);

	fetch('https://neto-api.herokuapp.com/cart', {
		body: form,		
		credentials: 'same-origin',
		method: 'POST',
		//headers: { 'Content-Type': 'multipart/form-data' }
	})
	.then((res) => {
		if (200 <= res.status && res.status < 300) {
			return res;
		}
		throw new Error(res.statusText);		
	})
	.then((res) => {		
		return res.json(); 
	})
	.then((data) => {
		if (data.error) {
			throw new Error(data.message);
		}
		console.log(data)
	})
	.catch((error) => {
		console.log(error, error.message);
	})

	urls.forEach(url => {
		getParam(url.value, url.type);
	});
}

function deleteFromCart(event) {
	event.preventDefault();
	console.log(1)
	const formData = new FormData();
	const productId = event.target.dataset.id;

	formData.append('productId', productId);
	
	fetch('https://neto-api.herokuapp.com/cart/remove', {
		body: formData,
		credentials: 'same-origin',
		method: 'POST'
		//headers: { 'Content-Type': 'application/json' }
	})
	.then((res) => {
		if (200 <= res.status && res.status < 300) {
			return res;
		}
		throw new Error(res.statusText);
		console.log(data)
	})
	.then((res) => { return res.json(); })
	.then((data) => {
		if (data.error) {
			throw new Error(data.message);
		}
		console.log(data);
	})
	.catch((error) => {
		console.log(error, error.message);
	})

	urls.forEach(url => {
		getParam(url.value, url.type);
	});
}

function changeLocalCart(event) {
	const form = {}
	const formData = new FormData(event.currentTarget);	

	for (const [key, value] of formData) {
		form[key] = value;
	}

	localStorage.localCart = JSON.stringify(form);	
}