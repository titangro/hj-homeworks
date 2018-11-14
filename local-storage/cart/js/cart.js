'use strict';

const colorSwatch = document.querySelector('#colorSwatch');
const sizeSwatch = document.querySelector('#sizeSwatch');
const quickCart = document.querySelector('#quick-cart');

function getColors() {
	fetch('https://neto-api.herokuapp.com/cart/colors')
	.then((res) => { 
		if (200 <= res.status && res.status < 300) {
			console.log(res)
			return res;
		}		
		throw new Error(res.statusText);
	})
	.then((res) => { return res.json(); })
	.then((data) => {
		console.log(data)
		if (data.error) {
			throw new Error(data.message);
		}
	})
	.catch((error) => {
		console.log(error, error.error);
	})
}