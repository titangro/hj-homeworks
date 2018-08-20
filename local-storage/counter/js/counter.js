'use strict';
const counter = document.getElementById('counter'),
	increment = document.getElementById('increment'),
	decrement = document.getElementById('decrement'),
	reset = document.getElementById('reset');

if(!document.cookie) {
	document.cookie = 0;
}
counter.textContent = document.cookie;

increment.addEventListener('click', increaseCounter);
decrement.addEventListener('click', decreaseCounter);
reset.addEventListener('click', resetCounter);

function increaseCounter(event) {
	document.cookie = +document.cookie + 1;
	counter.textContent = document.cookie;
}

function decreaseCounter(event) {
	if (document.cookie > 0) {
		document.cookie = +document.cookie - 1;
		counter.textContent = document.cookie;
	}	
}

function resetCounter(event) {
	document.cookie = 0;
	counter.textContent = document.cookie;
}