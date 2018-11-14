'use strict';

const colorSwatch = document.querySelector('#colorSwatch');
const sizeSwatch = document.querySelector('#sizeSwatch');
const quickCart = document.querySelector('#quick-cart');
const formCart = document.querySelector('#AddToCartForm');

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
	.then((res) => { return res.json(); })
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
				if (item.checked) result += ' checked';
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
				if (item.checked) result += ' checked';
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
		let result = '';

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
		});

		quickCart.innerHTML = result;
	}
	console.log(data, type)
}