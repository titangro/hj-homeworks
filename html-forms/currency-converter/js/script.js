'use strict';
const xhr = new XMLHttpRequest,
	loader = document.getElementById('loader'),
	content = document.getElementById('content'),
	toCurrency = document.getElementById('to'),
	fromCurrency = document.getElementById('from'),
	source = document.getElementById('source'),
	result = document.getElementById('result');

xhr.addEventListener('loadstart', onLoadStart);
xhr.open('GET', 'https://neto-api.herokuapp.com/currency', true);
xhr.send();

xhr.addEventListener('load', onLoad);
xhr.addEventListener('loadend', onLoadEnd);
toCurrency.addEventListener('change', onChangeCurrancy);
fromCurrency.addEventListener('change', onChangeCurrancy);
source.addEventListener('input', onChangeCurrancy)

function onLoad() {
	const currency = JSON.parse(xhr.responseText);		
	to.innerHTML = "";
	from.innerHTML = "";	
	for (let i = 0; i < currency.length; i++) {
		let option = `<option>${currency[i].code}</option>`;		
		to.innerHTML += option;
		from.innerHTML += option;

		let optionAll = to.querySelectorAll('option'),
			currentOption = optionAll[optionAll.length - 1];
		currentOption.value = currency[i].value;
		currentOption.title = currency[i].title;

		optionAll = from.querySelectorAll('option');
		currentOption = optionAll[optionAll.length - 1];
		currentOption.value = currency[i].value;
		currentOption.title = currency[i].title;

		onChangeCurrancy();
	}
}

function onLoadStart() {
	loader.classList.remove('hidden');
}

function onLoadEnd() {
	loader.classList.add('hidden');
	content.classList.remove('hidden');
}

function onChangeCurrancy() {
	let calculated = Math.round(source.value * fromCurrency.value / toCurrency.value * 100)/100;
	result.value = calculated.toFixed(2);
}
